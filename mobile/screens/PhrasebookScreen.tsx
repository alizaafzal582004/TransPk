import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { PHRASEBOOK } from '../config/phrasebook';
import { theme } from '../config/theme';

const CATEGORY_ICONS: Record<string, any> = {
  Emergency: 'alert-circle',
  Transport: 'car',
  Hotel: 'bed',
  Shopping: 'bag-handle',
  Food: 'restaurant',
  Directions: 'compass',
};

export default function PhrasebookScreen() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');
  const speakUrdu = (text: string) => Speech.speak(text, { language: 'ur' });

  const current = PHRASEBOOK[activeCategory];

  const filteredPhrases = search.trim()
    ? current.phrases.filter(p =>
        p.en.toLowerCase().includes(search.toLowerCase()) ||
        p.ur.includes(search)
      )
    : current.phrases;

  return (
    <View style={styles.container}>
      {/* Header strip with full-width image background */}
      <ImageBackground
        source={require('../assets/phrasebook-header.png')}
        style={styles.headerBg}
        imageStyle={styles.headerImg}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay} />
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="book" size={26} color={theme.colors.accent} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Phrasebook</Text>
            <Text style={styles.headerSub}>SAFARZUBAN · TRAVEL · SPEAK · CONNECT</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Offline badge */}
      <View style={styles.offlineBadge}>
        <Ionicons name="cloud-offline-outline" size={16} color={theme.colors.success} />
        <Text style={styles.offlineText}>Works Offline — No Internet Needed</Text>
      </View>

      {/* Search bar */}
      <View style={[styles.searchBar, theme.shadow.soft]}>
        <Ionicons name="search" size={20} color={theme.colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search useful phrases"
          placeholderTextColor={theme.colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color={theme.colors.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Category pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow} contentContainerStyle={styles.tabContent}>
        {PHRASEBOOK.map((cat, index) => (
          <TouchableOpacity
            key={cat.category}
            style={[styles.tab, activeCategory === index && styles.tabActive, activeCategory === index && theme.shadow.glow]}
            onPress={() => { setActiveCategory(index); setSearch(''); }}
            activeOpacity={0.85}
          >
            <Ionicons
              name={CATEGORY_ICONS[cat.category] || 'chatbox'}
              size={16}
              color={activeCategory === index ? '#fff' : theme.colors.accent}
            />
            <Text style={[styles.tabText, activeCategory === index && styles.tabTextActive]}>{cat.category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Phrases */}
      <ScrollView style={styles.phraseList} contentContainerStyle={{ padding: 16 }}>
        {filteredPhrases.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="search" size={40} color={theme.colors.textLight} />
            <Text style={styles.emptyText}>No phrases found</Text>
          </View>
        ) : (
          filteredPhrases.map((phrase, i) => (
            <View key={i} style={[styles.phraseCard, theme.shadow.card]}>
              <Text style={styles.enText}>{phrase.en}</Text>
              <Text style={styles.urText}>{phrase.ur}</Text>
              <TouchableOpacity style={styles.playBtn} onPress={() => speakUrdu(phrase.ur)} activeOpacity={0.85}>
                <Ionicons name="volume-high" size={16} color={theme.colors.accent} />
                <Text style={styles.playBtnText}>Play Urdu</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  headerBg: {
    height: 110,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerImg: { opacity: 0.9 },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(238, 240, 251, 0.3)' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20 },
  headerIcon: {
    width: 46, height: 46, borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(255,255,255,0.9)', borderWidth: 1, borderColor: theme.colors.glassBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: theme.colors.primary },
  headerSub: { fontSize: 9, color: theme.colors.textMed, letterSpacing: 1.2, marginTop: 2, fontWeight: '600' },
  offlineBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: theme.colors.successBg, paddingVertical: 10, marginHorizontal: 16, marginTop: 12, borderRadius: theme.radius.sm },
  offlineText: { color: theme.colors.success, fontSize: 13, fontWeight: '600' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: theme.radius.md, paddingHorizontal: 16, paddingVertical: 12,
    marginHorizontal: 16, marginTop: 12, borderWidth: 1, borderColor: theme.colors.glassBorder,
  },
  searchInput: { flex: 1, fontSize: 15, color: theme.colors.primary },
  tabRow: { maxHeight: 60, marginTop: 12 },
  tabContent: { paddingHorizontal: 16, alignItems: 'center', gap: 8 },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.glass, borderWidth: 1, borderColor: theme.colors.glassBorder,
  },
  tabActive: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
  tabText: { fontSize: 14, color: theme.colors.textMed, fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  phraseList: { flex: 1 },
  phraseCard: { backgroundColor: '#fff', borderRadius: theme.radius.md, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: theme.colors.glassBorder },
  enText: { fontSize: 16, color: theme.colors.primary, fontWeight: '600', marginBottom: 8 },
  urText: { fontSize: 24, color: theme.colors.primary, textAlign: 'right', marginBottom: 12, lineHeight: 36 },
  playBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: theme.colors.accentSoft, borderRadius: theme.radius.sm, paddingVertical: 12 },
  playBtnText: { color: theme.colors.accent, fontSize: 14, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { color: theme.colors.textLight, fontSize: 15 },
});