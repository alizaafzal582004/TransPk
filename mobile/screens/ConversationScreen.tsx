import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioRecorder, AudioModule, RecordingPresets } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import * as Speech from 'expo-speech';
import { LANGUAGES, Language } from '../config/languages';
import { translateText, transcribeAudioBase64 } from '../services/api';
import { theme } from '../config/theme';

const TOURIST_CODES = ['en', 'zh', 'ar', 'fr', 'de'];
const LOCAL_CODES = ['ur', 'pa', 'ps', 'sd', 'skr'];

export default function ConversationScreen() {
  const [touristLang, setTouristLang] = useState<Language>(LANGUAGES.find(l => l.code === 'en')!);
  const [localLang, setLocalLang] = useState<Language>(LANGUAGES.find(l => l.code === 'ur')!);
  const [touristText, setTouristText] = useState('');
  const [localText, setLocalText] = useState('');
  const [recordingSide, setRecordingSide] = useState<'tourist' | 'local' | null>(null);
  const [loadingSide, setLoadingSide] = useState<'tourist' | 'local' | null>(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const touristLangs = TOURIST_CODES.map(c => LANGUAGES.find(l => l.code === c)!).filter(Boolean);
  const localLangs = LOCAL_CODES.map(c => LANGUAGES.find(l => l.code === c)!).filter(Boolean);

  const speak = (text: string, lang: Language) => {
    if (!lang.tts_supported) return;
    Speech.speak(text, { language: lang.code });
  };

  const swapSides = () => {
    const t = touristLang;
    setTouristLang(localLang);
    setLocalLang(t);
    setTouristText('');
    setLocalText('');
  };

  const startRecording = async (side: 'tourist' | 'local') => {
    const srcLang = side === 'tourist' ? touristLang : localLang;
    if (!srcLang.stt_supported) { Alert.alert('Not Supported', `Voice input not available for ${srcLang.name}.`); return; }
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) { Alert.alert('Permission Denied', 'Microphone permission required.'); return; }
      await AudioModule.setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setRecordingSide(side);
    } catch (error: any) { Alert.alert('Recording Error', error.message || 'Could not start recording.'); setRecordingSide(null); }
  };

  const stopRecording = async (side: 'tourist' | 'local') => {
    setRecordingSide(null); setLoadingSide(side);
    const srcLang = side === 'tourist' ? touristLang : localLang;
    const tgtLang = side === 'tourist' ? localLang : touristLang;
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      if (!uri) throw new Error('No audio recorded.');
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const sttResult = await transcribeAudioBase64(base64, srcLang.code);
      const transcribed = sttResult.transcribed_text;
      if (!transcribed || !transcribed.trim()) { Alert.alert('No Speech', 'Could not detect speech. Try again.'); setLoadingSide(null); return; }
      const trResult = await translateText(transcribed, srcLang.code, tgtLang.code);
      const translated = trResult.translated_text;
      if (side === 'tourist') setLocalText(translated); else setTouristText(translated);
      speak(translated, tgtLang);
    } catch (error: any) { Alert.alert('Error', error.message || 'Processing failed.'); }
    finally { setLoadingSide(null); }
  };

  const FlagRow = ({ langs, activeLang, onSelect }: { langs: Language[]; activeLang: Language; onSelect: (l: Language) => void }) => (
    <View style={styles.flagRow}>
      {langs.map(l => (
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

  const SideMic = ({ side, color }: { side: 'tourist' | 'local'; color: string }) => {
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
      {/* TOURIST (top, flipped) */}
      <ImageBackground source={require('../assets/tourist-bg.png')} style={[styles.side, styles.touristSide]} imageStyle={styles.sideBgImg} resizeMode="cover">
        <View style={styles.flipped}>
          <View style={styles.sideHeader}>
            <View style={styles.flagCircle}><Text style={styles.flagBig}>{touristLang.flag}</Text></View>
            <View>
              <Text style={styles.sideLabel}>Tourist</Text>
              <Text style={styles.sideLang}>{touristLang.name}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <SideMic side="tourist" color={theme.colors.accent} />
          </View>
          <View style={[styles.resultBox, theme.shadow.soft]}>
            {loadingSide === 'local'
              ? <ActivityIndicator color={theme.colors.accent} />
              : <Text style={[styles.resultText, touristLang.rtl && styles.rtl]}>{touristText || 'Local replies appear here...'}</Text>}
          </View>
          <FlagRow langs={touristLangs} activeLang={touristLang} onSelect={(l) => { setTouristLang(l); setTouristText(''); }} />
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

      {/* LOCAL (bottom) */}
      <ImageBackground source={require('../assets/local-bg.png')} style={[styles.side, styles.localSide]} imageStyle={styles.sideBgImg} resizeMode="cover">
        <View style={styles.sideHeader}>
          <View style={styles.flagCircle}><Text style={styles.flagBig}>{localLang.flag}</Text></View>
          <View>
            <Text style={styles.sideLabel}>Local</Text>
            <Text style={styles.sideLang}>{localLang.name}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <SideMic side="local" color={theme.colors.success} />
        </View>
        <View style={[styles.resultBox, theme.shadow.soft]}>
          {loadingSide === 'tourist'
            ? <ActivityIndicator color={theme.colors.success} />
            : <Text style={[styles.resultText, localLang.rtl && styles.rtl]}>{localText || 'Tourist speech appears here...'}</Text>}
        </View>
        <FlagRow langs={localLangs} activeLang={localLang} onSelect={(l) => { setLocalLang(l); setLocalText(''); }} />
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