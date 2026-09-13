import {
  Modal, View, Text, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView
} from 'react-native';
import { LANGUAGES, Language } from '../config/languages';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (lang: Language) => void;
  title: string;
  currentCode: string;
}

export default function LanguagePicker({ visible, onClose, onSelect, title, currentCode }: Props) {
  const pakistaniLangs = LANGUAGES.filter(l => l.group === 'pakistani');
  const foreignLangs = LANGUAGES.filter(l => l.group === 'foreign');

  // Support status ka color
  const statusColor = (status: string) => {
    switch (status) {
      case 'full': return '#2e7d32';
      case 'partial': return '#f57c00';
      case 'limited': return '#e65100';
      case 'beta': return '#c62828';
      default: return '#888';
    }
  };

  const renderLang = (lang: Language) => (
    <TouchableOpacity
      key={lang.code}
      style={[styles.langItem, lang.code === currentCode && styles.langItemActive]}
      onPress={() => {
        onSelect(lang);
        onClose();
      }}
    >
      <View style={styles.langLeft}>
        <Text style={styles.langNative}>{lang.native_name}</Text>
        <Text style={styles.langEnglish}>{lang.name}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusColor(lang.support_status) }]}>
        <Text style={styles.statusText}>{lang.support_status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Pakistani Languages */}
          <Text style={styles.sectionTitle}>🇵🇰 Pakistani Languages</Text>
          {pakistaniLangs.map(renderLang)}

          {/* Foreign Languages */}
          <Text style={styles.sectionTitle}>🌍 Foreign Languages</Text>
          {foreignLangs.map(renderLang)}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f8ff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1, borderBottomColor: '#dde',
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a3a5c' },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  closeText: { fontSize: 18, color: '#555' },
  scroll: { padding: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#4a6a8a', marginTop: 16, marginBottom: 8 },
  langItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1,
  },
  langItemActive: { borderWidth: 2, borderColor: '#1a3a5c' },
  langLeft: { flex: 1 },
  langNative: { fontSize: 18, color: '#1a3a5c', fontWeight: '600' },
  langEnglish: { fontSize: 13, color: '#888', marginTop: 2 },
  statusBadge: { borderRadius: 8, paddingVertical: 4, paddingHorizontal: 10 },
  statusText: { color: '#fff', fontSize: 11, fontWeight: 'bold', textTransform: 'capitalize' },
});