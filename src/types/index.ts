/**
 * Type definitions for the Portable Content Unistyles Adapter
 */

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

/**
 * Base theme structure following Portable Content design token standards
 */
export interface PortableContentTheme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  [key: string]: any; // Allow for custom theme extensions
}

/**
 * Color palette structure
 */
export interface ThemeColors {
  // Primary colors
  primary: string;
  secondary: string;

  // Background colors
  background: string;
  surface: string;

  // Text colors
  text: string;
  textSecondary: string;

  // State colors
  success?: string;
  warning?: string;
  error?: string;
  info?: string;

  // Additional colors
  [key: string]: string | undefined;
}

/**
 * Spacing scale structure
 */
export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  [key: string]: number;
}

/**
 * Typography structure
 */
export interface ThemeTypography {
  fontSize: {
    xs?: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    [key: string]: number | undefined;
  };
  fontWeight?: {
    light?: string;
    normal?: string;
    medium?: string;
    semibold?: string;
    bold?: string;
    [key: string]: string | undefined;
  };
  lineHeight?: {
    tight?: number;
    normal?: number;
    relaxed?: number;
    [key: string]: number | undefined;
  };
  fontFamily?: {
    regular?: string;
    medium?: string;
    bold?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Breakpoint definitions for responsive design
 */
export interface PortableContentBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  [key: string]: number;
}

/**
 * Configuration object for creating the adapter
 */
export interface PortableContentAdapterConfig {
  themes: Record<string, PortableContentTheme>;
  breakpoints: PortableContentBreakpoints;
  settings?: {
    adaptiveThemes?: boolean;
    initialTheme?: string | (() => string);
    cssVars?: boolean;
    nativeBreakpointsMode?: 'points' | 'pixels';
  };
}

/**
 * The adapter instance returned by createPortableContentAdapter
 */
export interface AdapterInstance {
  themes: Record<string, PortableContentTheme>;
  breakpoints: PortableContentBreakpoints;
  settings?: {
    adaptiveThemes?: boolean;
    initialTheme?: string | (() => string);
    cssVars?: boolean;
    nativeBreakpointsMode?: 'points' | 'pixels';
  };
  utils: {
    getThemeValue: <T>(path: string, fallback?: T) => T;
    createResponsiveValue: <T>(
      values: Partial<Record<keyof PortableContentBreakpoints, T>>
    ) => ResponsiveValue<T>;
    mergeThemes: (
      baseTheme: PortableContentTheme,
      overrides: Partial<PortableContentTheme>
    ) => PortableContentTheme;
    validateTheme: (theme: any) => theme is PortableContentTheme;
  };
}

/**
 * Responsive value type that can be used with breakpoints
 */
export type ResponsiveValue<T> =
  | T
  | Partial<Record<keyof PortableContentBreakpoints, T>>;

/**
 * Style types that support responsive values
 */
export type ResponsiveStyle = {
  [K in keyof (ViewStyle & TextStyle & ImageStyle)]: ResponsiveValue<
    (ViewStyle & TextStyle & ImageStyle)[K]
  >;
};

/**
 * Theme context type for React context
 */
export interface ThemeContextType {
  theme: PortableContentTheme;
  themeName: string;
  setTheme: (themeName: string) => void;
  breakpoint: keyof PortableContentBreakpoints;
  isBreakpoint: (breakpoint: keyof PortableContentBreakpoints) => boolean;
}

/**
 * Hook return types
 */
export interface UseThemeReturn extends ThemeContextType {}

export interface UseBreakpointsReturn {
  breakpoint: keyof PortableContentBreakpoints;
  isBreakpoint: (breakpoint: keyof PortableContentBreakpoints) => boolean;
  width: number;
  height: number;
}

/**
 * Component prop types
 */
export interface WithThemeProps {
  theme: PortableContentTheme;
  themeName: string;
}

/**
 * Utility function types
 */
export type ThemeValueGetter = <T>(path: string, fallback?: T) => T;
export type ResponsiveValueCreator = <T>(
  values: Partial<Record<keyof PortableContentBreakpoints, T>>
) => ResponsiveValue<T>;
export type ThemeMerger = (
  baseTheme: PortableContentTheme,
  overrides: Partial<PortableContentTheme>
) => PortableContentTheme;
export type ThemeValidator = (theme: any) => theme is PortableContentTheme;
