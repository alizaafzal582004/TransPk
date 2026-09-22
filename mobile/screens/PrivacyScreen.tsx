import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../config/theme';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.heading}>{title}</Text>
    <Text style={styles.body}>{children}</Text>
  </View>
);

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.updated}>Effective: September 21, 2026</Text>

      <Section title="What TransPk processes">
        TransPk processes text that you submit for translation. If you choose a voice feature, it also processes the audio recording and your selected language. The app does not require an account and does not collect contacts, precise location, payment information, or advertising identifiers.
      </Section>
      <Section title="How the information is used">
        Submitted text and audio are sent over an encrypted connection to the TransPk backend and to Groq, our AI processing provider, only to transcribe speech and return a translation. Groq processes this information under its own service and privacy terms.
      </Section>
      <Section title="Storage and deletion">
        TransPk does not create a translation history or user profile. The backend writes voice audio to a temporary file only while processing the request and deletes that file immediately afterward. The mobile app also deletes its temporary recording after processing. Infrastructure and service providers may retain limited security or operational logs under their applicable policies.
      </Section>
      <Section title="Permissions">
        Microphone access is requested only when you start a voice feature. You can deny or revoke this permission in Android settings and continue using typed translation and the offline phrasebook.
      </Section>
      <Section title="Security and choices">
        Data is transmitted using HTTPS. Do not submit information that you do not want processed by the translation service. You can use the offline phrasebook without sending text or audio to the server.
      </Section>
      <Section title="Contact">
        For privacy questions or deletion requests concerning operational logs, contact the developer using the support email displayed on the TransPk Google Play listing.
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: theme.spacing.lg, paddingBottom: 48 },
  title: { fontSize: 30, fontWeight: '800', color: theme.colors.primary },
  updated: { marginTop: 6, marginBottom: 24, color: theme.colors.textLight, fontSize: 13 },
  section: { marginBottom: 22 },
  heading: { fontSize: 17, fontWeight: '700', color: theme.colors.primary, marginBottom: 7 },
  body: { fontSize: 15, lineHeight: 23, color: theme.colors.textMed },
});
