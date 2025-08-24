/**
 * React hooks for accessing Portable Content theme data
 */

import { useCallback } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';
import type {
  PortableContentBreakpoints,
  PortableContentTheme,
  UseThemeReturn,
} from '../types';

/**
 * Hook to access the current Portable Content theme and theme utilities
 *
 * This hook provides access to the current theme, theme name, and utilities
 * for working with themes in a Portable Content + Unistyles setup.
 *
 * Note: This hook will cause re-renders when the theme changes. If you want
 * to avoid re-renders, use Unistyles' StyleSheet directly in your components.
 *
 * @returns Object containing theme data and utilities
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const { theme, themeName, setTheme, breakpoint } = usePortableContentTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background }}>
 *       <Text style={{ color: theme.colors.text }}>
 *         Current theme: {themeName}
 *       </Text>
 *       <Button
 *         title="Switch to dark"
 *         onPress={() => setTheme('dark')}
 *       />
 *     </View>
 *   );
 * };
 * ```
 */
export function usePortableContentTheme(): UseThemeReturn {
  // Get current theme from Unistyles runtime
  const currentTheme = (UnistylesRuntime as any).theme as PortableContentTheme;
  const currentThemeName = (UnistylesRuntime as any).themeName as string;
  const currentBreakpoint = (UnistylesRuntime as any)
    .breakpoint as keyof PortableContentBreakpoints;
  // const screenWidth = (UnistylesRuntime as any).screen.width;

  // Theme setter function
  const setTheme = useCallback((themeName: string) => {
    (UnistylesRuntime as any).setTheme(themeName);
  }, []);

  // Breakpoint checker function
  const isBreakpoint = useCallback(
    (breakpoint: keyof PortableContentBreakpoints) => {
      return currentBreakpoint === breakpoint;
    },
    [currentBreakpoint]
  );

  return {
    theme: currentTheme,
    themeName: currentThemeName,
    setTheme,
    breakpoint: currentBreakpoint,
    isBreakpoint,
  };
}

/**
 * Hook to access only the current theme without causing re-renders
 *
 * This is a lightweight version that only returns the theme object.
 * It's useful when you only need theme values and don't want to cause
 * re-renders when the theme changes.
 *
 * @returns Current theme object
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const theme = usePortableContentThemeStatic();
 *
 *   // This component won't re-render when theme changes
 *   // The styles will be updated by Unistyles directly
 *   return (
 *     <View style={styles.container}>
 *       <Text style={styles.text}>Static theme access</Text>
 *     </View>
 *   );
 * };
 *
 * const styles = StyleSheet.create(theme => ({
 *   container: {
 *     backgroundColor: theme.colors.background
 *   },
 *   text: {
 *     color: theme.colors.text
 *   }
 * }));
 * ```
 */
export function usePortableContentThemeStatic(): PortableContentTheme {
  return (UnistylesRuntime as any).theme as PortableContentTheme;
}
