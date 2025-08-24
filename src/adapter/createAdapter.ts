/**
 * Core adapter factory that creates the bridge between Portable Content and Unistyles
 */

import type {
  AdapterInstance,
  PortableContentAdapterConfig,
  PortableContentBreakpoints,
  PortableContentTheme,
  ResponsiveValue,
} from '../types';
import {
  createResponsiveValue,
  getThemeValue,
  mergeThemes,
  validateTheme,
} from '../utils';

/**
 * Creates a Portable Content adapter for Unistyles 3.0
 *
 * This function processes Portable Content design tokens and creates
 * a configuration object that can be used with Unistyles StyleSheet.configure()
 *
 * @param config - Configuration object containing themes, breakpoints, and settings
 * @returns Adapter instance with processed themes, breakpoints, and utility functions
 *
 * @example
 * ```typescript
 * const adapter = createPortableContentAdapter({
 *   themes: {
 *     light: lightTheme,
 *     dark: darkTheme
 *   },
 *   breakpoints: {
 *     xs: 0,
 *     sm: 576,
 *     md: 768,
 *     lg: 992,
 *     xl: 1200
 *   }
 * });
 *
 * StyleSheet.configure({
 *   themes: adapter.themes,
 *   breakpoints: adapter.breakpoints
 * });
 * ```
 */
export function createPortableContentAdapter(
  config: PortableContentAdapterConfig
): AdapterInstance {
  const { themes, breakpoints } = config;

  // Validate input
  if (!themes || Object.keys(themes).length === 0) {
    throw new Error('At least one theme must be provided');
  }

  if (!breakpoints) {
    throw new Error('Breakpoints configuration is required');
  }

  // Validate that breakpoints include a 0 value (required by Unistyles)
  const hasZeroBreakpoint = Object.values(breakpoints).includes(0);
  if (!hasZeroBreakpoint) {
    throw new Error(
      'At least one breakpoint must have a value of 0 (required by Unistyles)'
    );
  }

  // Validate all themes
  Object.entries(themes).forEach(([name, theme]) => {
    if (!validateTheme(theme)) {
      throw new Error(`Invalid theme structure for theme "${name}"`);
    }
  });

  // Process themes to ensure they're compatible with Unistyles
  const processedThemes = Object.entries(themes).reduce(
    (acc, [name, theme]) => {
      acc[name] = processThemeForUnistyles(theme);
      return acc;
    },
    {} as Record<string, PortableContentTheme>
  );

  // Process breakpoints to ensure they're sorted correctly
  const processedBreakpoints = processBreakpointsForUnistyles(breakpoints);

  // Create utility functions bound to this adapter instance
  const utils = {
    getThemeValue: <T>(path: string, fallback?: T): T => {
      // This will be enhanced to work with the current theme context
      return getThemeValue(Object.values(processedThemes)[0], path, fallback);
    },

    createResponsiveValue: <T>(
      values: Partial<Record<keyof PortableContentBreakpoints, T>>
    ): ResponsiveValue<T> => {
      return createResponsiveValue(values);
    },

    mergeThemes: (
      baseTheme: PortableContentTheme,
      overrides: Partial<PortableContentTheme>
    ): PortableContentTheme => {
      return mergeThemes(baseTheme, overrides);
    },

    validateTheme: (theme: any): theme is PortableContentTheme => {
      return validateTheme(theme);
    },
  };

  return {
    themes: processedThemes,
    breakpoints: processedBreakpoints,
    utils,
  };
}

/**
 * Processes a theme to ensure compatibility with Unistyles
 * This includes normalizing values and adding any required transformations
 */
function processThemeForUnistyles(
  theme: PortableContentTheme
): PortableContentTheme {
  // Clone the theme to avoid mutations
  const processedTheme = JSON.parse(JSON.stringify(theme));

  // Add any Unistyles-specific processing here
  // For example, converting certain values or adding computed properties

  // Ensure all required properties exist
  if (!processedTheme.colors) {
    throw new Error('Theme must include a colors object');
  }

  if (!processedTheme.spacing) {
    throw new Error('Theme must include a spacing object');
  }

  if (!processedTheme.typography) {
    throw new Error('Theme must include a typography object');
  }

  // Add utility functions to the theme if needed
  if (!processedTheme.utils) {
    processedTheme.utils = {
      // Add theme-specific utility functions
      spacing: (multiplier: number) => processedTheme.spacing.md * multiplier,
      fontSize: (scale: number) =>
        processedTheme.typography.fontSize.md * scale,
    };
  }

  return processedTheme;
}

/**
 * Processes breakpoints to ensure they're compatible with Unistyles
 * This includes sorting them and validating the structure
 */
function processBreakpointsForUnistyles(
  breakpoints: PortableContentBreakpoints
): PortableContentBreakpoints {
  // Sort breakpoints by value to ensure correct cascade behavior
  const sortedEntries = Object.entries(breakpoints).sort(
    ([, a], [, b]) => a - b
  );

  const processedBreakpoints = sortedEntries.reduce((acc, [name, value]) => {
    acc[name] = value;
    return acc;
  }, {} as PortableContentBreakpoints);

  return processedBreakpoints;
}
