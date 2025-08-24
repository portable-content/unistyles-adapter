import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View, Text } from 'react-native';

// Mock the adapter for now - we'll replace this with the real implementation
const mockTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
    },
  },
};

interface ThemeShowcaseProps {
  theme?: 'light' | 'dark';
}

const ThemeShowcase: React.FC<ThemeShowcaseProps> = ({ theme = 'light' }) => {
  const currentTheme = theme === 'dark' ? {
    ...mockTheme,
    colors: {
      ...mockTheme.colors,
      primary: '#0A84FF',
      background: '#000000',
      surface: '#1C1C1E',
      text: '#FFFFFF',
    }
  } : mockTheme;

  return (
    <View style={{
      padding: currentTheme.spacing.lg,
      backgroundColor: currentTheme.colors.background,
      minHeight: 400,
    }}>
      <Text style={{
        fontSize: currentTheme.typography.fontSize.xl,
        color: currentTheme.colors.text,
        marginBottom: currentTheme.spacing.lg,
        fontWeight: 'bold',
      }}>
        Theme Showcase - {theme}
      </Text>

      {/* Color Palette */}
      <Text style={{
        fontSize: currentTheme.typography.fontSize.lg,
        color: currentTheme.colors.text,
        marginBottom: currentTheme.spacing.md,
        fontWeight: '600',
      }}>
        Color Palette
      </Text>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: currentTheme.spacing.sm,
        marginBottom: currentTheme.spacing.lg,
      }}>
        {Object.entries(currentTheme.colors).map(([name, color]) => (
          <View key={name} style={{
            alignItems: 'center',
            minWidth: 80,
          }}>
            <View style={{
              width: 40,
              height: 40,
              backgroundColor: color,
              borderRadius: 8,
              marginBottom: currentTheme.spacing.xs,
              borderWidth: 1,
              borderColor: currentTheme.colors.text + '20',
            }} />
            <Text style={{
              fontSize: currentTheme.typography.fontSize.sm,
              color: currentTheme.colors.textSecondary,
              textAlign: 'center',
            }}>
              {name}
            </Text>
          </View>
        ))}
      </View>

      {/* Typography Scale */}
      <Text style={{
        fontSize: currentTheme.typography.fontSize.lg,
        color: currentTheme.colors.text,
        marginBottom: currentTheme.spacing.md,
        fontWeight: '600',
      }}>
        Typography Scale
      </Text>

      <View style={{ marginBottom: currentTheme.spacing.lg }}>
        {Object.entries(currentTheme.typography.fontSize).map(([name, size]) => (
          <Text key={name} style={{
            fontSize: size,
            color: currentTheme.colors.text,
            marginBottom: currentTheme.spacing.xs,
          }}>
            {name.toUpperCase()} - {size}px
          </Text>
        ))}
      </View>

      {/* Spacing Scale */}
      <Text style={{
        fontSize: currentTheme.typography.fontSize.lg,
        color: currentTheme.colors.text,
        marginBottom: currentTheme.spacing.md,
        fontWeight: '600',
      }}>
        Spacing Scale
      </Text>

      <View>
        {Object.entries(currentTheme.spacing).map(([name, size]) => (
          <View key={name} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: currentTheme.spacing.sm,
          }}>
            <Text style={{
              fontSize: currentTheme.typography.fontSize.sm,
              color: currentTheme.colors.text,
              width: 60,
            }}>
              {name}: {size}px
            </Text>
            <View style={{
              width: size * 2,
              height: size,
              backgroundColor: currentTheme.colors.primary,
              borderRadius: 4,
            }} />
          </View>
        ))}
      </View>
    </View>
  );
};

const meta: Meta<typeof ThemeShowcase> = {
  title: 'Design System/Theme Showcase',
  component: ThemeShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive showcase of the Portable Content design tokens integrated with Unistyles.',
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme variant to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const Comparison: Story = {
  render: () => (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <ThemeShowcase theme="light" />
      </View>
      <View style={{ flex: 1 }}>
        <ThemeShowcase theme="dark" />
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark themes.',
      },
    },
  },
};
