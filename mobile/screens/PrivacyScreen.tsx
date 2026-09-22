import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { theme } from '../config/theme';

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.date}>Last updated: September 2026</Text>

      <Text style={styles.heading}>1. Information We Collect</Text>
      <Text style={styles.body}>
        TransPk collects the following information to provide translation services:{'\n\n'}
        • Text you enter for translation{'\n'}
        • Voice audio recordings when you use voice features{'\n'}
        • Language preferences you select
      </Text>

      <Text style={styles.heading}>2. How We Use Your Information</Text>
      <Text style={styles.body}>
        Your text and audio are transmitted to our backend server and to Groq AI to provide translation and speech recognition services. We do not store your translations or audio recordings after processing.
      </Text>

      <Text style={styles.heading}>3. Data Storage</Text>
      <Text style={styles.body}>
        TransPk does not maintain user accounts. No personal data is stored on our servers beyond what is necessary to process your current translation request. The offline phrasebook is stored locally on your device only.
      </Text>

      <Text style={styles.heading}>4. Third-Party Services</Text>
      <Text style={styles.body}>
        We use Groq AI (groq.com) for translation and speech recognition. Your text and audio are processed by Groq according to their privacy policy. We do not share your data with any other third parties.
      </Text>

      <Text style={styles.heading}>5. No Ads or Analytics</Text>
      <Text style={styles.body}>
        TransPk contains no advertisements and no analytics tracking. We do not track your usage or behavior within the app.
      </Text>

      <Text style={styles.heading}>6. Permissions</Text>
      <Text style={styles.body}>
        TransPk requests microphone permission only when you use voice translation features. This permission is used solely to record audio for translation purposes.
      </Text>

      <Text style={styles.heading}>7. Children's Privacy</Text>
      <Text style={styles.body}>
        TransPk is not directed at children under 13. We do not knowingly collect personal information from children.
      </Text>

      <Text style={styles.heading}>8. Changes to This Policy</Text>
      <Text style={styles.body}>
        We may update this privacy policy from time to time. We will notify users of any significant changes by updating the date at the top of this policy.
      </Text>

      <Text style={styles.heading}>9. Contact Us</Text>
      <Text style={styles.body}>
        If you have questions about this privacy policy, please contact us at:{'\n'}
        support@transpk.app
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>TransPk — Multilingual Pakistan Translator</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: theme.colors.primary, marginBottom: 6 },
  date: { fontSize: 13, color: theme.colors.textLight, marginBottom: 24 },
  heading: { fontSize: 17, fontWeight: '700', color: theme.colors.primary, marginTop: 20, marginBottom: 8 },
  body: { fontSize: 15, color: theme.colors.textMed, lineHeight: 24 },
  footer: { marginTop: 40, paddingTop: 20, borderTopWidth: 1, borderTopColor: theme.colors.glassBorder },
  footerText: { fontSize: 12, color: theme.colors.textLight, textAlign: 'center' },
});