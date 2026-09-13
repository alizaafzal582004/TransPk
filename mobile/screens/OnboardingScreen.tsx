import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';

const STEPS = [
  { icon: 'language' as const, title: 'Choose Your Languages', desc: 'Select the language you speak and the language you want to translate to.' },
  { icon: 'mic' as const, title: 'Type or Tap the Mic', desc: 'Type text or press the microphone and speak. TransPk translates instantly.' },
  { icon: 'people' as const, title: 'Pass the Phone', desc: 'Use Conversation Mode — one side for you, one for the local. Pass and talk.' },
];

export default function OnboardingScreen({ navigation }: any) {
  const [step, setStep] = useState(0);
  const next = () => step < STEPS.length - 1 ? setStep(step + 1) : navigation.replace('Home');
  const skip = () => navigation.replace('Home');
  const current = STEPS[step];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={skip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name={current.icon} size={64} color={theme.colors.accent} />
        </View>
        <Text style={styles.stepTitle}>{current.title}</Text>
        <Text style={styles.stepDesc}>{current.desc}</Text>
      </View>

      <View style={styles.dots}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, step === i && styles.dotActive]} />
        ))}
      </View>

      <TouchableOpacity style={[styles.nextBtn, theme.shadow.glow]} onPress={next} activeOpacity={0.85}>
        <Text style={styles.nextText}>{step === STEPS.length - 1 ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: theme.spacing.lg, justifyContent: 'center' },
  skipBtn: { position: 'absolute', top: 54, right: 24 },
  skipText: { fontSize: 16, color: theme.colors.textMed, fontWeight: '600' },
  content: { alignItems: 'center', marginBottom: 40 },
  iconCircle: {
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: theme.colors.accentSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 36,
    borderWidth: 1, borderColor: theme.colors.glassBorder,
  },
  stepTitle: { fontSize: 26, fontWeight: '800', color: theme.colors.primary, marginBottom: 16, textAlign: 'center' },
  stepDesc: { fontSize: 16, color: theme.colors.textMed, textAlign: 'center', lineHeight: 24, paddingHorizontal: 10 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: theme.colors.accentLight, marginHorizontal: 5, opacity: 0.4 },
  dotActive: { backgroundColor: theme.colors.accent, width: 26, opacity: 1 },
  nextBtn: { backgroundColor: theme.colors.accent, borderRadius: theme.radius.md, paddingVertical: 18, alignItems: 'center' },
  nextText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});