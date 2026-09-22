import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioRecorder, AudioModule, RecordingPresets } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import * as Speech from 'expo-speech';
import { LANGUAGES, Language } from '../config/languages';
import { translateText, transcribeAudioBase64 } from '../services/api';
import { confirmVoiceDataProcessing } from '../services/privacy';
import { useConnectivity } from '../services/useConnectivity';
import { theme } from '../config/theme';

const TOURIST_CODES = ['en', 'zh', 'ar', 'fr', 'de'];
const LOCAL_CODES = ['ur', 'pa', 'ps', 'sd', 'skr'];

export default function ConversationScreen() {
<<<<<<< HEAD
=======
  const isOnline = useConnectivity();
>>>>>>> a63c00d87d0b2202b8469e2efd846526db1e5863
  // side A = top (flipped), side B = bottom
  const [topLang, setTopLang] = useState<Language>(LANGUAGES.find(l => l.code === 'en')!);
  const [bottomLang, setBottomLang] = useState<Language>(LANGUAGES.find(l => l.code === 'ur')!);
  const [topLabel, setTopLabel] = useState('Tourist');
  const [bottomLabel, setBottomLabel] = useState('Local');
  const [topLangs, setTopLangs] = useState<string[]>(TOURIST_CODES);
  const [bottomLangs, setBottomLangs] = useState<string[]>(LOCAL_CODES);

  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [recordingSide, setRecordingSide] = useState<'top' | 'bottom' | null>(null);
  const [loadingSide, setLoadingSide] = useState<'top' | 'bottom' | null>(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const resolveLangs = (codes: string[]) => codes.map(c => LANGUAGES.find(l => l.code === c)!).filter(Boolean);

  const speak = (text: string, lang: Language) => {
    if (!lang.tts_supported) return;
    Speech.speak(text, { language: lang.code });
  };

  const swapSides = () => {
    // swap languages, labels, quick lists, and texts
    setTopLang(bottomLang); setBottomLang(topLang);
    setTopLabel(bottomLabel); setBottomLabel(topLabel);
    setTopLangs(bottomLangs); setBottomLangs(topLangs);
    setTopText(''); setBottomText('');
  };

  const startRecording = async (side: 'top' | 'bottom') => {
    const srcLang = side === 'top' ? topLang : bottomLang;
<<<<<<< HEAD
=======
    if (!isOnline) { Alert.alert('No Internet', 'Conversation translation needs an internet connection.'); return; }
>>>>>>> a63c00d87d0b2202b8469e2efd846526db1e5863
    if (!srcLang.stt_supported) { Alert.alert('Not Supported', `Voice input not available for ${srcLang.name}.`); return; }
    try {
      if (!(await confirmVoiceDataProcessing())) return;
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) { Alert.alert('Permission Denied', 'Microphone permission required.'); return; }
      await AudioModule.setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setRecordingSide(side);
    } catch (error: any) { Alert.alert('Recording Error', error.message || 'Could not start recording.'); setRecordingSide(null); }
  };

  const stopRecording = async (side: 'top' | 'bottom') => {
    setRecordingSide(null); setLoadingSide(side);
    const srcLang = side === 'top' ? topLang : bottomLang;
    const tgtLang = side === 'top' ? bottomLang : topLang;
<<<<<<< HEAD
=======
    let audioUri: string | null = null;
>>>>>>> a63c00d87d0b2202b8469e2efd846526db1e5863
    try {
      await audioRecorder.stop();
      audioUri = audioRecorder.uri;
      if (!audioUri) throw new Error('No audio recorded.');
      const base64 = await FileSystem.readAsStringAsync(audioUri, { encoding: FileSystem.EncodingType.Base64 });
      const sttResult = await transcribeAudioBase64(base64, srcLang.code);
      const transcribed = sttResult.transcribed_text;
      if (!transcribed || !transcribed.trim()) { Alert.alert('No Speech', 'Could not detect speech. Try again.'); setLoadingSide(null); return; }
      const trResult = await translateText(transcribed, srcLang.code, tgtLang.code);
      const translated = trResult.translated_text;
      // top bola -> bottom ko dikhao; bottom bola -> top ko dikhao
      if (side === 'top') setBottomText(translated); else setTopText(translated);
      speak(translated, tgtLang);
    } catch (error: any) { Alert.alert('Error', error.message || 'Processing failed.'); }
    finally {
      if (audioUri) await FileSystem.deleteAsync(audioUri, { idempotent: true }).catch(() => undefined);
      setLoadingSide(null);
    }
  };

  const FlagRow = ({ codes, activeLang, onSelect }: { codes: string[]; activeLang: Language; onSelect: (l: Language) => void }) => (
    <View style={styles.flagRow}>
      {resolveLangs(codes).map(l => (
        <TouchableOpacity
          key={l.code}
          style={[styles.flagTile, activeLang.code === l.code && styles.flagTileActive]}
          onPress={() => onSelect(l)}
        >
          <Text style={styles.flagTileText}>{l.flag}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const SideMic = ({ side, color }: { side: 'top' | 'bottom'; color: string }) => {
    const isRec = recordingSide === side;
    return (
      <View style={styles.micWrap}>
        <TouchableOpacity
          style={[styles.mic, { backgroundColor: isRec ? theme.colors.danger : color }, theme.shadow.glow]}
          onPress={isRec ? () => stopRecording(side) : () => startRecording(side)}
          disabled={loadingSide !== null || (recordingSide !== null && !isRec)}
          activeOpacity={0.85}
        >
          {loadingSide === side
            ? <ActivityIndicator color="#fff" />
            : <Ionicons name={isRec ? 'stop' : 'mic'} size={26} color="#fff" />}
        </TouchableOpacity>
        {!isRec && loadingSide !== side && (
          <View style={styles.tapHint}>
            <Ionicons name="arrow-back" size={14} color={color} />
            <Text style={[styles.tapHintText, { color }]}>Tap to{'\n'}Speak</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* TOP (flipped) */}
<<<<<<< HEAD
      <ImageBackground source={require('../assets/tourist-bg.png')} style={[styles.side, styles.touristSide]} imageStyle={styles.sideBgImg} resizeMode="cover">
=======
      <ImageBackground source={require('../assets/tourist-bg.jpg')} style={[styles.side, styles.touristSide]} imageStyle={styles.sideBgImg} resizeMode="cover">
>>>>>>> a63c00d87d0b2202b8469e2efd846526db1e5863
        <View style={styles.flipped}>
          <View style={styles.sideHeader}>
            <View style={styles.flagCircle}><Text style={styles.flagBig}>{topLang.flag}</Text></View>
            <View>
              <Text style={styles.sideLabel}>{topLabel}</Text>
              <Text style={styles.sideLang}>{topLang.name}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <SideMic side="top" color={theme.colors.accent} />
          </View>
          <View style={[styles.resultBox, theme.shadow.soft]}>
            {loadingSide === 'bottom'
              ? <ActivityIndicator color={theme.colors.accent} />
              : <Text style={[styles.resultText, topLang.rtl && styles.rtl]}>{topText || 'Replies appear here...'}</Text>}
          </View>
          <FlagRow codes={topLangs} activeLang={topLang} onSelect={(l) => { setTopLang(l); setTopText(''); }} />
        </View>
      </ImageBackground>

      {/* DIVIDER (swap) */}
      <View style={styles.dividerWrap}>
        <View style={styles.dividerLine} />
        <TouchableOpacity style={[styles.dividerCircle, theme.shadow.card]} onPress={swapSides} activeOpacity={0.8}>
          <Ionicons name="swap-vertical" size={20} color={theme.colors.accent} />
        </TouchableOpacity>
        <View style={styles.dividerLine} />
      </View>

      {/* BOTTOM */}
<<<<<<< HEAD
      <ImageBackground source={require('../assets/local-bg.png')} style={[styles.side, styles.localSide]} imageStyle={styles.sideBgImg} resizeMode="cover">
=======
      <ImageBackground source={require('../assets/local-bg.jpg')} style={[styles.side, styles.localSide]} imageStyle={styles.sideBgImg} resizeMode="cover">
>>>>>>> a63c00d87d0b2202b8469e2efd846526db1e5863
        <View style={styles.sideHeader}>
          <View style={styles.flagCircle}><Text style={styles.flagBig}>{bottomLang.flag}</Text></View>
          <View>
            <Text style={styles.sideLabel}>{bottomLabel}</Text>
            <Text style={styles.sideLang}>{bottomLang.name}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <SideMic side="bottom" color={theme.colors.success} />
        </View>
        <View style={[styles.resultBox, theme.shadow.soft]}>
          {loadingSide === 'top'
            ? <ActivityIndicator color={theme.colors.success} />
            : <Text style={[styles.resultText, bottomLang.rtl && styles.rtl]}>{bottomText || 'Speech appears here...'}</Text>}
        </View>
        <FlagRow codes={bottomLangs} activeLang={bottomLang} onSelect={(l) => { setBottomLang(l); setBottomText(''); }} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  side: { flex: 1, padding: 18, justifyContent: 'center', overflow: 'hidden' },
  touristSide: { backgroundColor: theme.colors.accentSoft },
  localSide: { backgroundColor: 'rgba(46, 158, 107, 0.10)' },
  flipped: { transform: [{ rotate: '180deg' }] },
  sideBgImg: { opacity: 0.4 },
  sideHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  flagCircle: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    borderWidth: 2, borderColor: theme.colors.glassBorder,
  },
  flagBig: { fontSize: 26, textAlign: 'center' },
  sideLabel: { fontSize: 20, fontWeight: '800', color: theme.colors.primary },
  sideLang: { fontSize: 14, color: theme.colors.textMed },
  micWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  mic: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  tapHint: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  tapHintText: { fontSize: 11, fontWeight: '700', lineHeight: 13 },
  resultBox: {
    backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: theme.radius.md, padding: 16, minHeight: 74,
    justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: theme.colors.glassBorder,
  },
  resultText: { fontSize: 18, color: theme.colors.primary, lineHeight: 26 },
  rtl: { textAlign: 'right', writingDirection: 'rtl' },
  flagRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  flagTile: {
    width: 42, height: 38, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.glassBorder,
  },
  flagTileActive: { borderColor: theme.colors.accent, borderWidth: 2 },
  flagTileText: { fontSize: 19 },
  dividerWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.bg, paddingVertical: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: theme.colors.silver },
  dividerCircle: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginHorizontal: 10,
    borderWidth: 1, borderColor: theme.colors.glassBorder,
  },
});
