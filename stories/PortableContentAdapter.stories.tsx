import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, TouchableOpacity } from 'react-native';

// Mock theme data for demonstration
const mockTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
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

// Theme Demo Component
const ThemeDemo: React.FC = () => {
  const theme = mockTheme;
  const themeName = 'light';
  const setTheme = (name: string) => console.log('Setting theme to:', name);
  const breakpoint = 'md';

  return (
    <View style={{
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      margin: theme.spacing.md,
      minHeight: 200,
    }}>
      <Text style={{
        fontSize: theme.typography.fontSize.xl,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        fontWeight: 'bold',
      }}>
        Portable Content Theme Demo
      </Text>
      
      <Text style={{
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
      }}>
        Current Theme: {themeName}
      </Text>
      
      <Text style={{
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
      }}>
        Current Breakpoint: {breakpoint}
      </Text>

      <View style={{
        flexDirection: 'row',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.lg,
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.md,
            borderRadius: 8,
          }}
          onPress={() => setTheme('light')}
        >
          <Text style={{
            color: 'white',
            fontSize: theme.typography.fontSize.md,
            fontWeight: '600',
          }}>
            Light Theme
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.secondary,
            padding: theme.spacing.md,
            borderRadius: 8,
          }}
          onPress={() => setTheme('dark')}
        >
          <Text style={{
            color: 'white',
            fontSize: theme.typography.fontSize.md,
            fontWeight: '600',
          }}>
            Dark Theme
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: 8,
      }}>
        <Text style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.xs,
        }}>
          Theme Colors:
        </Text>
        <Text style={{ color: theme.colors.primary, fontSize: theme.typography.fontSize.sm }}>
          Primary: {theme.colors.primary}
        </Text>
        <Text style={{ color: theme.colors.secondary, fontSize: theme.typography.fontSize.sm }}>
          Secondary: {theme.colors.secondary}
        </Text>
      </View>
    </View>
  );
};

// Breakpoints Demo Component
const BreakpointsDemo: React.FC = () => {
  const breakpoint = 'md';
  const width = 768;
  const height = 1024;
  const isBreakpoint = (bp: string) => bp === 'md';
  const isAbove = (bp: string) => ['xs', 'sm'].includes(bp);
  const isBelow = (bp: string) => ['lg', 'xl'].includes(bp);
  const theme = mockTheme;

  return (
    <View style={{
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      margin: theme.spacing.md,
    }}>
      <Text style={{
        fontSize: theme.typography.fontSize.xl,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        fontWeight: 'bold',
      }}>
        Responsive Breakpoints Demo
      </Text>
      
      <Text style={{
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
      }}>
        Screen: {width} × {height}
      </Text>
      
      <Text style={{
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
      }}>
        Current Breakpoint: {breakpoint}
      </Text>

      <View style={{
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: 8,
      }}>
        <Text style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.sm,
        }}>
          Breakpoint Checks:
        </Text>
        
        {['xs', 'sm', 'md', 'lg', 'xl'].map((bp) => (
          <View key={bp} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.xs,
          }}>
            <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.sm }}>
              {bp}:
            </Text>
            <Text style={{
              color: isBreakpoint(bp as any) ? theme.colors.primary : theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: isBreakpoint(bp as any) ? 'bold' : 'normal',
            }}>
              {isBreakpoint(bp as any) ? '✓ Current' : 
               isAbove(bp as any) ? '↑ Above' : 
               isBelow(bp as any) ? '↓ Below' : '—'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const meta: Meta<typeof ThemeDemo> = {
  title: 'Portable Content/Adapter Demo',
  component: ThemeDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Demonstrates the Portable Content Unistyles Adapter with theme and breakpoint functionality.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeShowcase: Story = {
  render: () => <ThemeDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Shows theme colors, spacing, typography, and theme switching functionality.',
      },
    },
  },
};

export const BreakpointsShowcase: Story = {
  render: () => <BreakpointsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates responsive breakpoint detection and screen size information.',
      },
    },
  },
};

export const CombinedDemo: Story = {
  render: () => (
    <View>
      <ThemeDemo />
      <BreakpointsDemo />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combined demonstration of both theme and breakpoint functionality.',
      },
    },
  },
};
