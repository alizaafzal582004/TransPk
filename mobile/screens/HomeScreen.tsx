import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';

const MENU = [
  { label: 'Conversation Mode', sub: 'Two people, pass the phone', route: 'Conversation', icon: 'people' as const },
  { label: 'Text Translation', sub: 'Type or speak to translate', route: 'TextTranslation', icon: 'chatbubble-ellipses' as const },
  { label: 'Offline Phrasebook', sub: 'Common phrases, offline', route: 'Phrasebook', icon: 'book' as const },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require('../assets/bg-pakistan.png')}
      style={styles.bg}
      imageStyle={styles.bgImage}
      resizeMode="cover"
    >
      {/* Halka white overlay — text readable rahe */}
      <View style={styles.overlay} />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>
            Safar<Text style={styles.brandAccent}>Zuban</Text>
          </Text>
          <View style={styles.brandLine} />
          <Text style={styles.tagline}>Multilingual Pakistan Translator</Text>
          <Text style={styles.subtag}>MADE FOR TRAVELLERS IN PAKISTAN</Text>
        </View>

        <View style={styles.menu}>
          {MENU.map((item) => (
            <TouchableOpacity
              key={item.route}
              activeOpacity={0.85}
              style={[styles.card, theme.shadow.card]}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={24} color={theme.colors.accent} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardLabel} numberOfLines={1}>{item.label}</Text>
                <Text style={styles.cardSub} numberOfLines={1}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={theme.colors.accent} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>TRAVEL   SPEAK   CONNECT</Text>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: theme.colors.bg },
  bgImage: { opacity: 0.5 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(238, 240, 251, 0.55)',
  },
  container: { flex: 1 },
  content: { padding: theme.spacing.lg, paddingTop: theme.spacing.xl, flexGrow: 1, justifyContent: 'center' },
  header: { marginBottom: theme.spacing.xl + 6 },
  brand: { fontSize: 44, fontWeight: '800', color: theme.colors.primary, letterSpacing: 0.5 },
  brandAccent: { color: theme.colors.accent },
  brandLine: { width: 64, height: 5, borderRadius: 3, backgroundColor: theme.colors.accent, marginTop: 12, marginBottom: 14 },
  tagline: { fontSize: 18, color: theme.colors.textMed, fontWeight: '500' },
  subtag: { fontSize: 11, color: theme.colors.textLight, letterSpacing: 2, marginTop: 8 },
  menu: { gap: theme.spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  iconBox: {
    width: 52, height: 52, borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accentSoft,
    alignItems: 'center', justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  cardBody: { flex: 1, marginRight: 8 },
  cardLabel: { fontSize: 17, fontWeight: '700', color: theme.colors.primary, marginBottom: 3 },
  cardSub: { fontSize: 13, color: theme.colors.textLight },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing.xl + 10 },
  footerLine: { width: 24, height: 1, backgroundColor: theme.colors.accentLight },
  footerText: { fontSize: 11, color: theme.colors.accent, letterSpacing: 2, marginHorizontal: 12, fontWeight: '600' },
});