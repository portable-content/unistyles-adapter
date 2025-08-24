/**
 * Tests for utility functions
 */

import {
  createResponsiveValue,
  getThemeValue,
  hexToRgba,
  mergeThemes,
  validateTheme,
} from '../utils';
import type { PortableContentTheme } from '../types';

const mockTheme: PortableContentTheme = {
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

describe('createResponsiveValue', () => {
  it('should create responsive value object', () => {
    const responsiveValue = createResponsiveValue({
      xs: 8,
      md: 16,
      lg: 24,
    });

    expect(responsiveValue).toEqual({
      xs: 8,
      md: 16,
      lg: 24,
    });
  });
});

describe('mergeThemes', () => {
  it('should merge themes correctly', () => {
    const overrides = {
      colors: {
        primary: '#FF0000',
        custom: '#00FF00',
      },
      spacing: {
        xxl: 48,
      },
    };

    const merged = mergeThemes(mockTheme, overrides as any);

    expect(merged.colors.primary).toBe('#FF0000');
    expect(merged.colors.secondary).toBe('#5856D6'); // Should keep original
    expect(merged.colors.custom).toBe('#00FF00'); // Should add new
    expect(merged.spacing.xs).toBe(4); // Should keep original
    expect(merged.spacing.xxl).toBe(48); // Should add new
  });

  it('should handle nested typography merging', () => {
    const overrides = {
      typography: {
        fontSize: {
          xs: 12,
          xxl: 32,
        },
        fontWeight: {
          bold: '700',
        },
      },
    };

    const merged = mergeThemes(mockTheme, overrides as any);

    expect(merged.typography.fontSize.xs).toBe(12); // Should add new
    expect(merged.typography.fontSize.md).toBe(16); // Should keep original
    expect(merged.typography.fontSize.xxl).toBe(32); // Should add new
    expect(merged.typography.fontWeight?.bold).toBe('700'); // Should add new
  });
});

describe('validateTheme', () => {
  it('should validate correct theme', () => {
    expect(validateTheme(mockTheme)).toBe(true);
  });

  it('should reject null or undefined', () => {
    expect(validateTheme(null)).toBe(false);
    expect(validateTheme(undefined)).toBe(false);
  });

  it('should reject non-object', () => {
    expect(validateTheme('string')).toBe(false);
    expect(validateTheme(123)).toBe(false);
  });

  it('should reject theme without required properties', () => {
    expect(validateTheme({})).toBe(false);
    expect(validateTheme({ colors: {} })).toBe(false);
    expect(validateTheme({ colors: mockTheme.colors })).toBe(false);
  });

  it('should reject theme with invalid colors', () => {
    const invalidTheme = {
      ...mockTheme,
      colors: {
        primary: '#007AFF',
        // Missing required colors
      },
    };
    expect(validateTheme(invalidTheme)).toBe(false);
  });

  it('should reject theme with invalid spacing', () => {
    const invalidTheme = {
      ...mockTheme,
      spacing: {
        xs: 4,
        // Missing required spacing values
      },
    };
    expect(validateTheme(invalidTheme)).toBe(false);
  });

  it('should reject theme with invalid typography', () => {
    const invalidTheme = {
      ...mockTheme,
      typography: {
        fontSize: {
          sm: 14,
          // Missing required font sizes
        },
      },
    };
    expect(validateTheme(invalidTheme)).toBe(false);
  });
});

describe('getThemeValue', () => {
  it('should get nested values correctly', () => {
    expect(getThemeValue(mockTheme, 'colors.primary')).toBe('#007AFF');
    expect(getThemeValue(mockTheme, 'spacing.md')).toBe(16);
    expect(getThemeValue(mockTheme, 'typography.fontSize.lg')).toBe(18);
  });

  it('should return fallback for non-existent paths', () => {
    expect(getThemeValue(mockTheme, 'colors.nonexistent', '#000000')).toBe(
      '#000000'
    );
    expect(getThemeValue(mockTheme, 'invalid.path', 'fallback')).toBe(
      'fallback'
    );
  });

  it('should handle deep nested paths', () => {
    const themeWithDeepNesting = {
      ...mockTheme,
      custom: {
        deep: {
          nested: {
            value: 'found',
          },
        },
      },
    };

    expect(
      getThemeValue(themeWithDeepNesting, 'custom.deep.nested.value')
    ).toBe('found');
  });
});

describe('hexToRgba', () => {
  it('should convert hex to rgba correctly', () => {
    expect(hexToRgba('#FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    expect(hexToRgba('#00FF00', 1)).toBe('rgba(0, 255, 0, 1)');
    expect(hexToRgba('#0000FF', 0)).toBe('rgba(0, 0, 255, 0)');
  });

  it('should handle hex without hash', () => {
    expect(hexToRgba('FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('should handle lowercase hex', () => {
    expect(hexToRgba('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });
});
