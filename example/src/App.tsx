/**
 * Example app demonstrating the Portable Content Unistyles Adapter
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import {
  usePortableContentBreakpoints,
  usePortableContentTheme,
} from '@portable-content/unistyles-adapter';

// Import the configuration
import './styles/unistyles';

const App = () => {
  const { theme, themeName, setTheme } = usePortableContentTheme();
  const { breakpoint, width } = usePortableContentBreakpoints();

  const isDarkMode = themeName === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Unistyles Adapter</Text>
          <Text style={styles.subtitle}>Portable Content + Unistyles 3.0</Text>
        </View>

        {/* Theme Toggle */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Theme</Text>
            <View style={styles.themeToggle}>
              <Text style={styles.themeLabel}>Light</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.surface}
              />
              <Text style={styles.themeLabel}>Dark</Text>
            </View>
          </View>
        </View>

        {/* Current State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current State</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Theme</Text>
              <Text style={styles.infoValue}>{themeName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Breakpoint</Text>
              <Text style={styles.infoValue}>{breakpoint}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Width</Text>
              <Text style={styles.infoValue}>{width}px</Text>
            </View>
          </View>
        </View>

        {/* Color Palette */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Palette</Text>
          <View style={styles.colorGrid}>
            {Object.entries(theme.colors).map(([name, color]) => (
              <View key={name} style={styles.colorItem}>
                <View
                  style={[styles.colorSwatch, { backgroundColor: color }]}
                />
                <Text style={styles.colorName}>{name}</Text>
                <Text style={styles.colorValue}>{color}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Typography Scale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Typography Scale</Text>
          <View style={styles.typographyList}>
            {Object.entries(theme.typography.fontSize).map(([name, size]) => (
              <View key={name} style={styles.typographyItem}>
                <Text style={[styles.typographyText, { fontSize: size }]}>
                  {name.toUpperCase()} - {size}px
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Spacing Scale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spacing Scale</Text>
          <View style={styles.spacingList}>
            {Object.entries(theme.spacing).map(([name, size]) => (
              <View key={name} style={styles.spacingItem}>
                <Text style={styles.spacingLabel}>
                  {name}: {size}px
                </Text>
                <View
                  style={[styles.spacingBar, { width: size * 2, height: size }]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Responsive Demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsive Demo</Text>
          <View style={styles.responsiveDemo}>
            <Text style={styles.responsiveText}>
              This text changes size based on breakpoint
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Elements</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Primary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Secondary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>Outline Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  themeLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  infoItem: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  colorItem: {
    alignItems: 'center',
    minWidth: 80,
    marginBottom: theme.spacing.md,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  colorName: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    textAlign: 'center',
  },
  colorValue: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  typographyList: {
    gap: theme.spacing.sm,
  },
  typographyItem: {
    paddingVertical: theme.spacing.xs,
  },
  typographyText: {
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
  spacingList: {
    gap: theme.spacing.sm,
  },
  spacingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacingLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    flex: 1,
  },
  spacingBar: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  responsiveDemo: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  responsiveText: {
    fontSize: {
      xs: theme.typography.fontSize.sm,
      md: theme.typography.fontSize.md,
      lg: theme.typography.fontSize.lg,
    },
    color: theme.colors.text,
    textAlign: 'center',
  },
  buttonGrid: {
    gap: theme.spacing.md,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
}));

export default App;
