/**
 * @portable-content/unistyles-adapter
 *
 * A React Native adapter that integrates Unistyles 3.0 with the Portable Content SDK
 * for seamless cross-platform styling with zero re-renders and type-safe theming.
 */

export { createPortableContentAdapter } from './adapter/createAdapter';
export { withPortableContentTheme } from './adapter/withTheme';
export { usePortableContentTheme } from './hooks/useTheme';
export { usePortableContentBreakpoints } from './hooks/useBreakpoints';

// Type exports
export type {
  PortableContentAdapterConfig,
  PortableContentTheme,
  PortableContentBreakpoints,
  AdapterInstance,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ResponsiveValue,
} from './types';

// Utility exports
export {
  createResponsiveValue,
  mergeThemes,
  validateTheme,
  getThemeValue,
} from './utils';

// Re-export commonly used Unistyles types and utilities
export type {
  UnistylesThemes,
  UnistylesBreakpoints,
  UnistylesRuntime as PortableContentRuntime,
} from 'react-native-unistyles';

export { StyleSheet as PortableContentStyleSheet } from 'react-native-unistyles';
