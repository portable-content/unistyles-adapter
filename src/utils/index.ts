/**
 * Utility functions for the Portable Content Unistyles Adapter
 */

import type {
  PortableContentBreakpoints,
  PortableContentTheme,
  ResponsiveValue,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
} from '../types';

/**
 * Creates a responsive value object that can be used with Unistyles breakpoints
 *
 * @param values - Object mapping breakpoint names to values
 * @returns Responsive value object
 *
 * @example
 * ```typescript
 * const responsivePadding = createResponsiveValue({
 *   xs: 8,
 *   md: 16,
 *   lg: 24
 * });
 * ```
 */
export function createResponsiveValue<T>(
  values: Partial<Record<keyof PortableContentBreakpoints, T>>
): ResponsiveValue<T> {
  return values as ResponsiveValue<T>;
}

/**
 * Merges two themes, with the override theme taking precedence
 *
 * @param baseTheme - The base theme to merge from
 * @param overrides - The theme properties to override
 * @returns Merged theme object
 *
 * @example
 * ```typescript
 * const customTheme = mergeThemes(lightTheme, {
 *   colors: {
 *     primary: '#custom-color'
 *   }
 * });
 * ```
 */
export function mergeThemes(
  baseTheme: PortableContentTheme,
  overrides: Partial<PortableContentTheme>
): PortableContentTheme {
  return {
    ...baseTheme,
    ...overrides,
    colors: {
      ...baseTheme.colors,
      ...overrides.colors,
    },
    spacing: {
      ...baseTheme.spacing,
      ...overrides.spacing,
    },
    typography: {
      ...baseTheme.typography,
      ...overrides.typography,
      fontSize: {
        ...baseTheme.typography.fontSize,
        ...overrides.typography?.fontSize,
      },
      fontWeight: {
        ...baseTheme.typography.fontWeight,
        ...overrides.typography?.fontWeight,
      },
      lineHeight: {
        ...baseTheme.typography.lineHeight,
        ...overrides.typography?.lineHeight,
      },
      fontFamily: {
        ...baseTheme.typography.fontFamily,
        ...overrides.typography?.fontFamily,
      },
    },
  };
}

/**
 * Validates that a theme object conforms to the PortableContentTheme interface
 *
 * @param theme - The theme object to validate
 * @returns True if the theme is valid, false otherwise
 */
export function validateTheme(theme: any): theme is PortableContentTheme {
  if (!theme || typeof theme !== 'object') {
    return false;
  }

  // Check required top-level properties
  if (!theme.colors || !theme.spacing || !theme.typography) {
    return false;
  }

  // Validate colors
  if (!validateColors(theme.colors)) {
    return false;
  }

  // Validate spacing
  if (!validateSpacing(theme.spacing)) {
    return false;
  }

  // Validate typography
  if (!validateTypography(theme.typography)) {
    return false;
  }

  return true;
}

/**
 * Gets a nested value from a theme object using a dot-notation path
 *
 * @param theme - The theme object to search in
 * @param path - Dot-notation path to the value (e.g., 'colors.primary')
 * @param fallback - Fallback value if the path is not found
 * @returns The value at the path or the fallback
 *
 * @example
 * ```typescript
 * const primaryColor = getThemeValue(theme, 'colors.primary', '#000000');
 * const largeFontSize = getThemeValue(theme, 'typography.fontSize.lg', 18);
 * ```
 */
export function getThemeValue<T>(
  theme: PortableContentTheme,
  path: string,
  fallback?: T
): T {
  const keys = path.split('.');
  let current: any = theme;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback as T;
    }
  }

  return current as T;
}

/**
 * Creates a spacing utility function that multiplies the base spacing unit
 *
 * @param baseSpacing - The base spacing value (usually theme.spacing.md)
 * @returns Function that multiplies the base spacing
 *
 * @example
 * ```typescript
 * const space = createSpacingUtility(16);
 * const padding = space(2); // Returns 32
 * ```
 */
export function createSpacingUtility(baseSpacing: number) {
  return (multiplier: number): number => baseSpacing * multiplier;
}

/**
 * Creates a font size utility function that scales the base font size
 *
 * @param baseFontSize - The base font size (usually theme.typography.fontSize.md)
 * @returns Function that scales the base font size
 *
 * @example
 * ```typescript
 * const fontSize = createFontSizeUtility(16);
 * const largeText = fontSize(1.5); // Returns 24
 * ```
 */
export function createFontSizeUtility(baseFontSize: number) {
  return (scale: number): number => baseFontSize * scale;
}

/**
 * Converts a hex color to rgba with the specified opacity
 *
 * @param hex - Hex color string (with or without #)
 * @param opacity - Opacity value between 0 and 1
 * @returns RGBA color string
 *
 * @example
 * ```typescript
 * const semiTransparent = hexToRgba('#FF0000', 0.5); // Returns 'rgba(255, 0, 0, 0.5)'
 * ```
 */
export function hexToRgba(hex: string, opacity: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Private validation functions

function validateColors(colors: any): colors is ThemeColors {
  if (!colors || typeof colors !== 'object') {
    return false;
  }

  // Check required color properties
  const requiredColors = [
    'primary',
    'secondary',
    'background',
    'surface',
    'text',
    'textSecondary',
  ];

  for (const colorName of requiredColors) {
    if (!(colorName in colors) || typeof colors[colorName] !== 'string') {
      return false;
    }
  }

  return true;
}

function validateSpacing(spacing: any): spacing is ThemeSpacing {
  if (!spacing || typeof spacing !== 'object') {
    return false;
  }

  // Check required spacing properties
  const requiredSpacing = ['xs', 'sm', 'md', 'lg', 'xl'];

  for (const spacingName of requiredSpacing) {
    if (!(spacingName in spacing) || typeof spacing[spacingName] !== 'number') {
      return false;
    }
  }

  return true;
}

function validateTypography(typography: any): typography is ThemeTypography {
  if (!typography || typeof typography !== 'object') {
    return false;
  }

  // Check required typography properties
  if (!typography.fontSize || typeof typography.fontSize !== 'object') {
    return false;
  }

  const requiredFontSizes = ['sm', 'md', 'lg', 'xl'];

  for (const fontSize of requiredFontSizes) {
    if (
      !(fontSize in typography.fontSize) ||
      typeof typography.fontSize[fontSize] !== 'number'
    ) {
      return false;
    }
  }

  return true;
}
