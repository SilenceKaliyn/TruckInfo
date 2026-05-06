import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const COLORS = {
  azul: '#454546',
  verde: '#ff9800',
  fondo: '#8c8c8c',
  blanco: '#FFFFFF',
  texto: '#454546',
  placeholder: '#666666',
  shadow: 'rgba(0,0,0,0.15)',
};

export default function AjustesScreen() {
  const [language, setLanguage] = useState<'ES' | 'EN'>('EN');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* User Data Section */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderBlue}>
          <Text style={styles.sectionHeaderText}>USER DATA</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>SALVADOR SOTELO</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Password</Text>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.verde} />
        </View>
        <View style={[styles.row, styles.rowLast]}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.valueMuted}>Not available</Text>
        </View>
      </View>

      {/* Privacy and Legal Section */}
      <View style={styles.sectionCard}>
        <View style={styles.privacyHeader}>
          <Text style={styles.privacyTitle}>Privacy and Legal</Text>
        </View>
        <TouchableOpacity style={styles.privacyRow}>
          <Text style={styles.privacyText}>Privacy information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.privacyRow, styles.rowLast]}>
          <Text style={styles.privacyText}>Legal information</Text>
        </TouchableOpacity>
      </View>

      {/* Language Selector */}
      <View style={styles.languageContainer}>
        <Text style={styles.languageLabel}>Language</Text>
        <View style={styles.languageToggle}>
          <TouchableOpacity
            style={[styles.langButton, language === 'ES' && styles.langButtonActive]}
            onPress={() => setLanguage('ES')}
          >
            <Text style={[styles.langText, language === 'ES' && styles.langTextActive]}>ES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langButton, language === 'EN' && styles.langButtonActive]}
            onPress={() => setLanguage('EN')}
          >
            <Text style={[styles.langText, language === 'EN' && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
  },
  contentContainer: {
    padding: 16,
    gap: 20,
  },
  sectionCard: {
    backgroundColor: COLORS.azul,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.placeholder,
    width: '85%',
    alignSelf: 'center',
  },
  sectionHeaderBlue: {
    backgroundColor: COLORS.verde,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sectionHeaderText: {
    color: COLORS.blanco,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.placeholder,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    color: COLORS.blanco,
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: COLORS.placeholder,
    fontSize: 13,
    fontWeight: '500',
  },
  valueMuted: {
    color: COLORS.placeholder,
    fontSize: 13,
    fontWeight: '500',
  },
  privacyHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  privacyTitle: {
    color: COLORS.placeholder,
    fontSize: 13,
    fontWeight: '600',
  },
  privacyRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.placeholder,
  },
  privacyText: {
    color: COLORS.placeholder,
    fontSize: 14,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  languageLabel: {
    color: COLORS.placeholder,
    fontSize: 14,
    fontWeight: '500',
  },
  languageToggle: {
    flexDirection: 'row',
    gap: 8,
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  langButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.verde,
  },
  langText: {
    color: COLORS.placeholder,
    fontSize: 14,
    fontWeight: '500',
  },
  langTextActive: {
    color: COLORS.verde,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    width: '85%',
    alignSelf: 'center',
  },
  logoutText: {
    color: COLORS.blanco,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});