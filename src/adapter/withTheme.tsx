/**
 * Higher-order component for injecting theme props into components
 */

import * as React from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';
import type { PortableContentTheme, WithThemeProps } from '../types';

/**
 * Higher-order component that injects theme props into a component
 *
 * This HOC provides theme data as props to components that need access to
 * theme values but don't want to use hooks or cause re-renders.
 *
 * Note: Components wrapped with this HOC will re-render when the theme changes.
 * If you want to avoid re-renders, use StyleSheet with theme functions directly.
 *
 * @param Component - The component to wrap with theme props
 * @returns Enhanced component with theme props
 *
 * @example
 * ```typescript
 * interface MyComponentProps extends WithThemeProps {
 *   title: string;
 * }
 *
 * const MyComponent = ({ theme, themeName, title }: MyComponentProps) => (
 *   <View style={{ backgroundColor: theme.colors.background }}>
 *     <Text style={{ color: theme.colors.text }}>
 *       {title} (Theme: {themeName})
 *     </Text>
 *   </View>
 * );
 *
 * const ThemedMyComponent = withPortableContentTheme(MyComponent);
 *
 * // Usage
 * <ThemedMyComponent title="Hello World" />
 * ```
 */
export function withPortableContentTheme<P extends WithThemeProps>(
  Component: React.ComponentType<P>
): React.ComponentType<Omit<P, keyof WithThemeProps>> {
  const WrappedComponent = (props: Omit<P, keyof WithThemeProps>) => {
    const theme = (UnistylesRuntime as any).theme as PortableContentTheme;
    const themeName = (UnistylesRuntime as any).themeName as string;

    const enhancedProps = {
      ...props,
      theme,
      themeName,
    } as unknown as P;

    return <Component {...enhancedProps} />;
  };

  // Set display name for debugging
  WrappedComponent.displayName = `withPortableContentTheme(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
}

/**
 * Higher-order component that injects only the theme object (no theme name)
 *
 * This is a lighter version that only provides the theme object as a prop.
 * Useful when you only need theme values and don't need the theme name.
 *
 * @param Component - The component to wrap with theme prop
 * @returns Enhanced component with theme prop
 *
 * @example
 * ```typescript
 * interface MyComponentProps {
 *   theme: PortableContentTheme;
 *   title: string;
 * }
 *
 * const MyComponent = ({ theme, title }: MyComponentProps) => (
 *   <View style={{ backgroundColor: theme.colors.background }}>
 *     <Text style={{ color: theme.colors.text }}>{title}</Text>
 *   </View>
 * );
 *
 * const ThemedMyComponent = withThemeOnly(MyComponent);
 * ```
 */
export function withThemeOnly<P extends { theme: PortableContentTheme }>(
  Component: React.ComponentType<P>
): React.ComponentType<Omit<P, 'theme'>> {
  const WrappedComponent = (props: Omit<P, 'theme'>) => {
    const theme = (UnistylesRuntime as any).theme as PortableContentTheme;

    const enhancedProps = {
      ...props,
      theme,
    } as P;

    return <Component {...enhancedProps} />;
  };

  WrappedComponent.displayName = `withThemeOnly(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
}

/**
 * Higher-order component that provides theme utilities as props
 *
 * This HOC provides utility functions for working with themes,
 * such as getting theme values by path and creating responsive values.
 *
 * @param Component - The component to wrap with theme utilities
 * @returns Enhanced component with theme utility props
 *
 * @example
 * ```typescript
 * interface MyComponentProps {
 *   getThemeValue: <T>(path: string, fallback?: T) => T;
 *   title: string;
 * }
 *
 * const MyComponent = ({ getThemeValue, title }: MyComponentProps) => {
 *   const primaryColor = getThemeValue('colors.primary', '#000000');
 *   const largeFontSize = getThemeValue('typography.fontSize.lg', 18);
 *
 *   return (
 *     <View>
 *       <Text style={{ color: primaryColor, fontSize: largeFontSize }}>
 *         {title}
 *       </Text>
 *     </View>
 *   );
 * };
 *
 * const EnhancedMyComponent = withThemeUtils(MyComponent);
 * ```
 */
export function withThemeUtils<
  P extends { getThemeValue: <T>(path: string, fallback?: T) => T },
>(
  Component: React.ComponentType<P>
): React.ComponentType<Omit<P, 'getThemeValue'>> {
  const WrappedComponent = (props: Omit<P, 'getThemeValue'>) => {
    const theme = (UnistylesRuntime as any).theme as PortableContentTheme;

    const getThemeValue = function <T>(path: string, fallback?: T): T {
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
    };

    const enhancedProps = {
      ...props,
      getThemeValue,
    } as P;

    return <Component {...enhancedProps} />;
  };

  WrappedComponent.displayName = `withThemeUtils(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
}
