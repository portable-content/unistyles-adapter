/**
 * Tests for the Portable Content Unistyles Adapter
 */

import { createPortableContentAdapter } from '../adapter/createAdapter';
import type {
  PortableContentBreakpoints,
  PortableContentTheme,
} from '../types';

// Mock themes for testing
const mockLightTheme: PortableContentTheme = {
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

const mockDarkTheme: PortableContentTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
  },
  spacing: mockLightTheme.spacing,
  typography: mockLightTheme.typography,
};

const mockBreakpoints: PortableContentBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

describe('createPortableContentAdapter', () => {
  it('should create an adapter with valid configuration', () => {
    const adapter = createPortableContentAdapter({
      themes: {
        light: mockLightTheme,
        dark: mockDarkTheme,
      },
      breakpoints: mockBreakpoints,
    });

    expect(adapter).toBeDefined();
    expect(adapter.themes).toBeDefined();
    expect(adapter.breakpoints).toBeDefined();
    expect(adapter.utils).toBeDefined();
  });

  it('should process themes correctly', () => {
    const adapter = createPortableContentAdapter({
      themes: {
        light: mockLightTheme,
        dark: mockDarkTheme,
      },
      breakpoints: mockBreakpoints,
    });

    expect(adapter.themes.light).toBeDefined();
    expect(adapter.themes.dark).toBeDefined();
    expect(adapter.themes.light.colors.primary).toBe('#007AFF');
    expect(adapter.themes.dark.colors.primary).toBe('#0A84FF');
  });

  it('should process breakpoints correctly', () => {
    const adapter = createPortableContentAdapter({
      themes: {
        light: mockLightTheme,
      },
      breakpoints: mockBreakpoints,
    });

    expect(adapter.breakpoints).toEqual(mockBreakpoints);
    expect(adapter.breakpoints.xs).toBe(0);
    expect(adapter.breakpoints.xl).toBe(1200);
  });

  it('should provide utility functions', () => {
    const adapter = createPortableContentAdapter({
      themes: {
        light: mockLightTheme,
      },
      breakpoints: mockBreakpoints,
    });

    expect(typeof adapter.utils.getThemeValue).toBe('function');
    expect(typeof adapter.utils.createResponsiveValue).toBe('function');
    expect(typeof adapter.utils.mergeThemes).toBe('function');
    expect(typeof adapter.utils.validateTheme).toBe('function');
  });

  it('should throw error when no themes provided', () => {
    expect(() => {
      createPortableContentAdapter({
        themes: {},
        breakpoints: mockBreakpoints,
      });
    }).toThrow('At least one theme must be provided');
  });

  it('should throw error when no breakpoints provided', () => {
    expect(() => {
      createPortableContentAdapter({
        themes: { light: mockLightTheme },
        breakpoints: undefined as any,
      });
    }).toThrow('Breakpoints configuration is required');
  });

  it('should throw error when no zero breakpoint exists', () => {
    expect(() => {
      createPortableContentAdapter({
        themes: { light: mockLightTheme },
        breakpoints: {
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200,
        } as any,
      });
    }).toThrow('At least one breakpoint must have a value of 0');
  });

  it('should throw error for invalid theme structure', () => {
    const invalidTheme = {
      colors: {
        primary: '#007AFF',
        // Missing required colors
      },
      // Missing spacing and typography
    };

    expect(() => {
      createPortableContentAdapter({
        themes: { invalid: invalidTheme as any },
        breakpoints: mockBreakpoints,
      });
    }).toThrow('Invalid theme structure');
  });
});
