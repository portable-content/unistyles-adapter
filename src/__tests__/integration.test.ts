/**
 * Integration tests for the Portable Content Unistyles Adapter
 * These tests verify that the adapter works correctly with Unistyles 3.0
 */

import { createPortableContentAdapter } from '../adapter/createAdapter';
import type {
  PortableContentBreakpoints,
  PortableContentTheme,
} from '../types';

// Mock Unistyles for testing
jest.mock('react-native-unistyles', () => ({
  UnistylesRuntime: {
    getTheme: jest.fn(),
    setTheme: jest.fn(),
    themeName: 'light',
    breakpoint: 'md',
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
    screen: {
      width: 768,
      height: 1024,
    },
  },
  useUnistyles: jest.fn(() => ({
    theme: {
      colors: { primary: '#007AFF', background: '#FFFFFF' },
      spacing: { md: 16 },
      typography: { fontSize: { md: 16 } },
    },
    rt: {
      themeName: 'light',
      breakpoint: 'md',
      screen: { width: 768, height: 1024 },
    },
  })),
  StyleSheet: {
    configure: jest.fn(),
  },
}));

// Test themes
const lightTheme: PortableContentTheme = {
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

const darkTheme: PortableContentTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
  },
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
};

const breakpoints: PortableContentBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

describe('Portable Content Adapter Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Theme Configuration', () => {
    it('should create adapter with proper theme structure', () => {
      const adapter = createPortableContentAdapter({
        themes: {
          light: lightTheme,
          dark: darkTheme,
        },
        breakpoints,
        settings: {
          adaptiveThemes: true,
          initialTheme: 'light',
        },
      });

      expect(adapter.themes.light).toBeDefined();
      expect(adapter.themes.dark).toBeDefined();
      expect(adapter.settings?.adaptiveThemes).toBe(true);
      expect(adapter.settings?.initialTheme).toBe('light');
    });

    it('should process themes with utility functions', () => {
      const adapter = createPortableContentAdapter({
        themes: { light: lightTheme },
        breakpoints,
      });

      const processedTheme = adapter.themes.light;
      
      // Verify theme structure is preserved
      expect(processedTheme.colors.primary).toBe('#007AFF');
      expect(processedTheme.spacing.md).toBe(16);
      expect(processedTheme.typography.fontSize.md).toBe(16);
      
      // Verify utility functions are added
      expect(processedTheme.utils).toBeDefined();
      expect(typeof processedTheme.utils.spacing).toBe('function');
      expect(typeof processedTheme.utils.fontSize).toBe('function');
    });

    it('should sort breakpoints correctly', () => {
      const unsortedBreakpoints = {
        xl: 1200,
        xs: 0,
        lg: 992,
        sm: 576,
        md: 768,
      };

      const adapter = createPortableContentAdapter({
        themes: { light: lightTheme },
        breakpoints: unsortedBreakpoints,
      });

      const sortedKeys = Object.keys(adapter.breakpoints);
      const sortedValues = Object.values(adapter.breakpoints);
      
      // Should be sorted by value
      expect(sortedValues).toEqual([0, 576, 768, 992, 1200]);
      expect(sortedKeys).toEqual(['xs', 'sm', 'md', 'lg', 'xl']);
    });
  });

  describe('Utility Functions', () => {
    let adapter: ReturnType<typeof createPortableContentAdapter>;

    beforeEach(() => {
      adapter = createPortableContentAdapter({
        themes: { light: lightTheme, dark: darkTheme },
        breakpoints,
      });
    });

    it('should provide working getThemeValue utility', () => {
      const primaryColor = adapter.utils.getThemeValue('colors.primary');
      expect(primaryColor).toBeDefined();
    });

    it('should provide working createResponsiveValue utility', () => {
      const responsiveValue = adapter.utils.createResponsiveValue({
        xs: 12,
        md: 16,
        lg: 20,
      });
      
      expect(responsiveValue).toBeDefined();
      expect(responsiveValue.xs).toBe(12);
      expect(responsiveValue.md).toBe(16);
      expect(responsiveValue.lg).toBe(20);
    });

    it('should provide working mergeThemes utility', () => {
      const customTheme = adapter.utils.mergeThemes(lightTheme, {
        colors: {
          primary: '#FF0000',
        },
      });

      expect(customTheme.colors.primary).toBe('#FF0000');
      expect(customTheme.colors.background).toBe('#FFFFFF'); // Should preserve other values
      expect(customTheme.spacing).toEqual(lightTheme.spacing); // Should preserve other sections
    });

    it('should provide working validateTheme utility', () => {
      expect(adapter.utils.validateTheme(lightTheme)).toBe(true);
      expect(adapter.utils.validateTheme({})).toBe(false);
      expect(adapter.utils.validateTheme(null)).toBe(false);
    });
  });
});
