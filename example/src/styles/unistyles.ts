/**
 * Unistyles configuration for the example app
 * This demonstrates how to set up the Portable Content Unistyles Adapter
 */

import { StyleSheet } from 'react-native-unistyles';
import { createPortableContentAdapter } from '@portable-content/unistyles-adapter';

// Define your design tokens following Portable Content standards
const lightTheme = {
  colors: {
    // Primary brand colors
    primary: '#007AFF',
    secondary: '#5856D6',

    // Background colors
    background: '#FFFFFF',
    surface: '#F2F2F7',

    // Text colors
    text: '#000000',
    textSecondary: '#8E8E93',

    // State colors
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',

    // Additional colors
    border: '#C6C6C8',
    disabled: '#D1D1D6',
    placeholder: '#C7C7CC',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
  },
  // Custom design tokens
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

const darkTheme = {
  colors: {
    // Primary brand colors (adjusted for dark mode)
    primary: '#0A84FF',
    secondary: '#5E5CE6',

    // Background colors
    background: '#000000',
    surface: '#1C1C1E',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#8E8E93',

    // State colors
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#64D2FF',

    // Additional colors
    border: '#38383A',
    disabled: '#48484A',
    placeholder: '#48484A',
  },
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
  borderRadius: lightTheme.borderRadius,
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Define responsive breakpoints
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Create the adapter
const adapter = createPortableContentAdapter({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
  settings: {
    adaptiveThemes: true,
    initialTheme: 'light',
    cssVars: true,
  },
});

// Configure Unistyles
StyleSheet.configure({
  themes: adapter.themes,
  breakpoints: adapter.breakpoints,
  settings: adapter.settings,
});

// Export types for TypeScript
type AppThemes = typeof adapter.themes;
type AppBreakpoints = typeof adapter.breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

export { adapter };
