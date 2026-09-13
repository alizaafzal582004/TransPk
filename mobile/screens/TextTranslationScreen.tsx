import { useConnectivity } from '../services/useConnectivity';
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAudioRecorder, AudioModule, RecordingPresets } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import * as Speech from 'expo-speech';
import { LANGUAGES, Language } from '../config/languages';
import { translateText, transcribeAudioBase64 } from '../services/api';
import LanguagePicker from '../components/LanguagePicker';
import { theme } from '../config/theme';

const MAX_CHARS = 5000;

export default function TextTranslationScreen() {
  const isOnline = useConnectivity();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState<Language>(LANGUAGES.find(l => l.code === 'en')!);
  const [targetLang, setTargetLang] = useState<Language>(LANGUAGES.find(l => l.code === 'ur')!);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [warning, setWarning] = useState('');
  const [voiceToVoiceMode, setVoiceToVoiceMode] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'source' | 'target'>('source');
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const openPicker = (which: 'source' | 'target') => { setPickerTarget(which); setPickerVisible(true); };
  const handleLanguageSelect = (lang: Language) => {
    if (pickerTarget === 'source') setSourceLang(lang); else setTargetLang(lang);
    setTranslatedText(''); setWarning('');
  };
  const swapLanguages = () => {
    setSourceLang(targetLang); setTargetLang(sourceLang);
    setInputText(translatedText); setTranslatedText(''); setWarning('');
  };
  const speak = (text: string) => {
    if (!targetLang.tts_supported) { Alert.alert('Voice Not Available', `Voice output not available for ${targetLang.name}.`); return; }
    setIsSpeaking(true);
    Speech.speak(text, { language: targetLang.code, onDone: () => setIsSpeaking(false), onStopped: () => setIsSpeaking(false), onError: () => setIsSpeaking(false) });
  };
  const translate = async (textToTranslate?: string, autoSpeak: boolean = false) => {
    const text = textToTranslate || inputText;
    if (!text.trim()) { Alert.alert('Empty Text', 'Please enter text to translate.'); return; }
    if (!isOnline) { Alert.alert('No Internet', 'Live translation needs internet. Use the Offline Phrasebook.'); return; }
    if (sourceLang.code === targetLang.code) { Alert.alert('Same Language', 'Please select two different languages.'); return; }
    setLoading(true); setWarning(''); setTranslatedText('');
    try {
      const data = await translateText(text, sourceLang.code, targetLang.code);
      setTranslatedText(data.translated_text);
      if (data.warning) setWarning(data.warning);
      if (autoSpeak && data.translated_text && targetLang.tts_supported) speak(data.translated_text);
    } catch (error: any) { Alert.alert('Error', error.message || 'Translation failed.'); }
    finally { setLoading(false); }
  };
  const startRecording = async (v2v: boolean = false) => {
    if (!isOnline) { Alert.alert('No Internet', 'Voice translation needs internet. Try the Offline Phrasebook.'); return; }
    if (!sourceLang.stt_supported) { Alert.alert('Not Supported', `Voice input not available for ${sourceLang.name}. ${sourceLang.warning || ''}`); return; }
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) { Alert.alert('Permission Denied', 'Microphone permission required.'); return; }
      await AudioModule.setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setVoiceToVoiceMode(v2v); setIsRecording(true);
    } catch (error: any) { Alert.alert('Recording Error', error.message || 'Could not start recording.'); setIsRecording(false); }
  };
  const stopRecording = async () => {
    setIsRecording(false); setLoading(true);
    const isV2V = voiceToVoiceMode;
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      if (!uri) throw new Error('No audio recorded. Try again.');
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const result = await transcribeAudioBase64(base64, sourceLang.code);
      const transcribed = result.transcribed_text;
      if (!transcribed || !transcribed.trim()) { Alert.alert('No Speech', 'Could not detect speech. Please try again.'); setLoading(false); return; }
      setInputText(transcribed);
      await translate(transcribed, isV2V);
    } catch (error: any) { Alert.alert('Error', error.message || 'Voice processing failed.'); }
    finally { setLoading(false); setVoiceToVoiceMode(false); }
  };
  const speakTranslation = () => {
    if (!translatedText) return;
    if (!targetLang.tts_supported) { Alert.alert('Voice Not Available', `Voice output not available for ${targetLang.name}.`); return; }
    if (isSpeaking) { Speech.stop(); setIsSpeaking(false); return; }
    speak(translatedText);
  };

  return (
    <View style={styles.root}>
      {/* Bottom skyline background (fixed at bottom, behind content) */}
      <Image
        source={require('../assets/bottom-skyline.png')}
        style={styles.skyline}
        resizeMode="cover"
        pointerEvents="none"
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Status */}
        <View style={[styles.statusBar, isOnline ? styles.online : styles.offline]}>
          <Ionicons name={isOnline ? 'ellipse' : 'cloud-offline-outline'} size={12} color={isOnline ? theme.colors.success : theme.colors.danger} />
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline — Phrasebook Available'}</Text>
          <Ionicons name={isOnline ? 'wifi' : 'wifi-outline'} size={16} color={isOnline ? theme.colors.success : theme.colors.danger} />
        </View>

        {/* Language cards */}
        <View style={styles.langRow}>
          <TouchableOpacity style={[styles.langBox, theme.shadow.soft]} onPress={() => openPicker('source')}>
            <View style={styles.langTop}>
              <Text style={styles.langLabel}>FROM</Text>
              <Ionicons name="chevron-down" size={16} color={theme.colors.textLight} />
            </View>
            <View style={styles.flagCircle}><Text style={styles.flagEmoji}>{sourceLang.flag}</Text></View>
            <Text style={styles.langName}>{sourceLang.native_name}</Text>
            <Text style={styles.langSub}>{sourceLang.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.swapBtn, theme.shadow.glow]} onPress={swapLanguages}>
            <Ionicons name="swap-horizontal" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.langBox, theme.shadow.soft]} onPress={() => openPicker('target')}>
            <View style={styles.langTop}>
              <Text style={styles.langLabel}>TO</Text>
              <Ionicons name="chevron-down" size={16} color={theme.colors.textLight} />
            </View>
            <View style={styles.flagCircle}><Text style={styles.flagEmoji}>{targetLang.flag}</Text></View>
            <Text style={styles.langName}>{targetLang.native_name}</Text>
            <Text style={styles.langSub}>{targetLang.name}</Text>
          </TouchableOpacity>
        </View>

        {warning ? (
          <View style={styles.warningBox}>
            <Ionicons name="warning-outline" size={16} color={theme.colors.warning} />
            <Text style={styles.warningText}>{warning}</Text>
          </View>
        ) : null}

        {/* Input with counter */}
        <View style={[styles.inputBox, theme.shadow.soft]}>
          <Text style={styles.boxLabel}>ENTER TEXT</Text>
          <TextInput
            style={[styles.textInput, sourceLang.rtl && styles.rtlText]}
            multiline
            placeholder="Type here or use mic..."
            placeholderTextColor={theme.colors.textLight}
            value={inputText}
            onChangeText={(t) => t.length <= MAX_CHARS && setInputText(t)}
            textAlign={sourceLang.rtl ? 'right' : 'left'}
          />
          <Text style={styles.counter}>{inputText.length} / {MAX_CHARS}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.micBtn, isRecording && !voiceToVoiceMode && styles.btnActive]}
            onPress={isRecording ? stopRecording : () => startRecording(false)}
            disabled={loading} activeOpacity={0.85}
          >
            <Ionicons name={isRecording && !voiceToVoiceMode ? 'stop' : 'mic'} size={20} color="#fff" />
            <Text style={styles.micBtnText}>{isRecording && !voiceToVoiceMode ? 'Stop' : 'Mic'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.translateBtnWrap, theme.shadow.glow]} onPress={() => translate()} disabled={loading} activeOpacity={0.85}>
            <LinearGradient colors={['#8B7CF0', '#6C5CE7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.translateBtn}>
              {loading ? <ActivityIndicator color="#fff" /> : (
                <>
                  <Ionicons name="sparkles" size={18} color="#fff" />
                  <Text style={styles.translateBtnText}>Translate</Text>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.v2vBtn, isRecording && voiceToVoiceMode && styles.btnActive]}
          onPress={isRecording ? stopRecording : () => startRecording(true)}
          disabled={loading} activeOpacity={0.85}
        >
          <Ionicons name={isRecording && voiceToVoiceMode ? 'stop-circle' : 'chatbubbles'} size={20} color="#fff" />
          <Text style={styles.v2vBtnText}>{isRecording && voiceToVoiceMode ? 'Stop & Translate' : 'Voice to Voice'}</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        {isRecording && (
          <View style={styles.recordingStatus}>
            <Ionicons name="radio-button-on" size={14} color={theme.colors.danger} />
            <Text style={styles.recordingText}>Recording{voiceToVoiceMode ? ' (auto-speak)' : ''}... Tap Stop when done</Text>
          </View>
        )}

        {translatedText ? (
          <View style={[styles.outputBox, theme.shadow.card]}>
            <View style={styles.outputHeader}>
              <Text style={styles.boxLabel}>TRANSLATION</Text>
              <TouchableOpacity style={[styles.speakBtn, isSpeaking && styles.btnActive]} onPress={speakTranslation} activeOpacity={0.85}>
                <Ionicons name={isSpeaking ? 'stop' : 'volume-high'} size={15} color="#fff" />
                <Text style={styles.speakBtnText}>{isSpeaking ? 'Stop' : 'Play'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.outputText, targetLang.rtl && styles.rtlText]}>{translatedText}</Text>
          </View>
        ) : null}
      </ScrollView>

      <LanguagePicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={handleLanguageSelect}
        title={pickerTarget === 'source' ? 'Select Source Language' : 'Select Target Language'}
        currentCode={pickerTarget === 'source' ? sourceLang.code : targetLang.code}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  container: { flex: 1 },
  content: { padding: theme.spacing.lg, paddingBottom: 180 },
  // Skyline fixed at bottom, behind the scroll content
  skyline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 170,
    opacity: 0.55,
  },
  statusBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: theme.radius.pill, padding: 11, marginBottom: 16 },
  online: { backgroundColor: theme.colors.successBg },
  offline: { backgroundColor: theme.colors.dangerBg },
  statusText: { fontSize: 14, fontWeight: '700', color: theme.colors.textDark },
  langRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  langBox: { flex: 1, backgroundColor: '#fff', borderRadius: theme.radius.md, padding: 16, borderWidth: 1, borderColor: theme.colors.glassBorder },
  langTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  langLabel: { fontSize: 10, color: theme.colors.textLight, letterSpacing: 1, fontWeight: '700' },
  flagCircle: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 6, overflow: 'hidden',
    borderWidth: 2, borderColor: theme.colors.glassBorder,
  },
  flagEmoji: { fontSize: 26, textAlign: 'center' },
  langName: { fontSize: 20, color: theme.colors.primary, fontWeight: '800' },
  langSub: { fontSize: 13, color: theme.colors.textMed },
  swapBtn: { backgroundColor: theme.colors.accent, borderRadius: 26, width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  warningBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.colors.warningBg, borderRadius: theme.radius.sm, padding: 12, marginBottom: 14 },
  warningText: { color: theme.colors.warning, fontSize: 13, flex: 1 },
  inputBox: { backgroundColor: '#fff', borderRadius: theme.radius.md, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: theme.colors.glassBorder },
  boxLabel: { fontSize: 10, color: theme.colors.textLight, marginBottom: 8, letterSpacing: 1, fontWeight: '700' },
  textInput: { fontSize: 16, color: theme.colors.primary, minHeight: 90, textAlignVertical: 'top' },
  counter: { fontSize: 12, color: theme.colors.textLight, textAlign: 'right', marginTop: 6 },
  rtlText: { textAlign: 'right' },
  btnRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  micBtn: { flexDirection: 'row', gap: 8, backgroundColor: '#5a6a9a', borderRadius: theme.radius.md, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flex: 1 },
  micBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  translateBtnWrap: { flex: 2, borderRadius: theme.radius.md, overflow: 'hidden' },
  translateBtn: { flexDirection: 'row', gap: 8, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  translateBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  v2vBtn: { flexDirection: 'row', gap: 10, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  v2vBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnActive: { backgroundColor: theme.colors.danger },
  recordingStatus: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: theme.colors.dangerBg, borderRadius: theme.radius.sm, padding: 10, marginBottom: 12 },
  recordingText: { color: theme.colors.danger, fontSize: 13, fontWeight: '600' },
  outputBox: { backgroundColor: '#fff', borderRadius: theme.radius.md, padding: 16, borderWidth: 1, borderColor: theme.colors.glassBorder },
  outputHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  speakBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: theme.colors.success, borderRadius: theme.radius.sm, paddingVertical: 7, paddingHorizontal: 14 },
  speakBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  outputText: { fontSize: 20, color: theme.colors.primary, lineHeight: 30 },
});
