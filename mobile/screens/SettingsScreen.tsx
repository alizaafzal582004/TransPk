import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import { LANGUAGES } from '../config/languages';

export default function SettingsScreen({ navigation }: any) {
  const pakistaniCount = LANGUAGES.filter(l => l.group === 'pakistani').length;
  const foreignCount = LANGUAGES.filter(l => l.group === 'foreign').length;

  const InfoRow = ({ icon, label, value }: any) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.rowIcon}>
          <Ionicons name={icon} size={20} color={theme.colors.accent} />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* App identity */}
      <View style={styles.brandCard}>
        <View style={styles.brandIcon}>
          <Ionicons name="language" size={32} color={theme.colors.accent} />
        </View>
        <Text style={styles.brandName}>TransPk</Text>
        <Text style={styles.brandVersion}>Version 1.0.0</Text>
      </View>

      {/* About */}
      <Text style={styles.sectionTitle}>ABOUT</Text>
      <View style={[styles.card, theme.shadow.soft]}>
        <InfoRow icon="chatbubbles" label="Translation Modes" value="4 modes" />
        <View style={styles.divider} />
        <InfoRow icon="globe" label="Pakistani Languages" value={`${pakistaniCount}`} />
        <View style={styles.divider} />
        <InfoRow icon="earth" label="Foreign Languages" value={`${foreignCount}`} />
        <View style={styles.divider} />
        <InfoRow icon="cloud-offline" label="Offline Phrasebook" value="Available" />
      </View>

      {/* Features */}
      <Text style={styles.sectionTitle}>FEATURES</Text>
      <View style={[styles.card, theme.shadow.soft]}>
        <InfoRow icon="mic" label="Voice Input" value="Groq Whisper" />
        <View style={styles.divider} />
        <InfoRow icon="volume-high" label="Voice Output" value="Device TTS" />
        <View style={styles.divider} />
        <InfoRow icon="people" label="Conversation Mode" value="Enabled" />
      </View>

      {/* How to use */}
      <Text style={styles.sectionTitle}>HOW TO USE</Text>
      <View style={[styles.card, theme.shadow.soft]}>
        <Text style={styles.tipText}>1. Choose your languages (From and To).</Text>
        <Text style={styles.tipText}>2. Type text or tap the mic and speak.</Text>
        <Text style={styles.tipText}>3. Use Conversation Mode and pass the phone.</Text>
        <Text style={styles.tipText}>4. No internet? Open the Offline Phrasebook.</Text>
      </View>

      {/* Legal */}
      <Text style={styles.sectionTitle}>LEGAL</Text>
      <View style={[styles.card, theme.shadow.soft]}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Privacy')}>
          <View style={styles.rowLeft}>
            <View style={styles.rowIcon}>
              <Ionicons name="document-text" size={20} color={theme.colors.accent} />
            </View>
            <Text style={styles.rowLabel}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>

      {/* Note */}
      <View style={styles.noteCard}>
        <Ionicons name="information-circle" size={18} color={theme.colors.warning} />
        <Text style={styles.noteText}>
          Some languages have limited voice support. Warnings appear when quality may vary.
        </Text>
      </View>

      <Text style={styles.footer}>Made for travellers in Pakistan</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: theme.spacing.lg },
  brandCard: { alignItems: 'center', marginBottom: theme.spacing.lg },
  brandIcon: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: theme.colors.accentSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: theme.colors.glassBorder,
  },
  brandName: { fontSize: 24, fontWeight: '800', color: theme.colors.primary },
  brandVersion: { fontSize: 13, color: theme.colors.textLight, marginTop: 2 },
  sectionTitle: { fontSize: 11, color: theme.colors.textLight, letterSpacing: 1.5, fontWeight: '700', marginBottom: 8, marginTop: 8, marginLeft: 4 },
  card: { backgroundColor: '#fff', borderRadius: theme.radius.md, paddingHorizontal: 16, marginBottom: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.glassBorder },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowIcon: { width: 36, height: 36, borderRadius: theme.radius.sm, backgroundColor: theme.colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontSize: 15, color: theme.colors.primary, fontWeight: '500' },
  rowValue: { fontSize: 14, color: theme.colors.textMed, fontWeight: '600' },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)' },
  tipText: { fontSize: 14, color: theme.colors.textMed, paddingVertical: 8, lineHeight: 20 },
  noteCard: { flexDirection: 'row', gap: 10, backgroundColor: theme.colors.warningBg, borderRadius: theme.radius.md, padding: 14, marginBottom: theme.spacing.lg },
  noteText: { flex: 1, fontSize: 13, color: theme.colors.warning, lineHeight: 19 },
  footer: { textAlign: 'center', color: theme.colors.textLight, fontSize: 12, letterSpacing: 0.3 },
});