/**
 * React hooks for accessing breakpoint information
 */

import { useCallback } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';
import type {
  PortableContentBreakpoints,
  UseBreakpointsReturn,
} from '../types';

/**
 * Hook to access current breakpoint information and screen dimensions
 *
 * This hook provides utilities for responsive design by giving access to
 * the current breakpoint, screen dimensions, and breakpoint checking utilities.
 *
 * Note: This hook will cause re-renders when the breakpoint changes due to
 * screen size changes. If you want to avoid re-renders, use responsive values
 * directly in your StyleSheet definitions.
 *
 * @returns Object containing breakpoint data and utilities
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const { breakpoint, isBreakpoint, width, height } = usePortableContentBreakpoints();
 *
 *   return (
 *     <View>
 *       <Text>Current breakpoint: {breakpoint}</Text>
 *       <Text>Screen: {width}x{height}</Text>
 *       {isBreakpoint('lg') && (
 *         <Text>This only shows on large screens</Text>
 *       )}
 *     </View>
 *   );
 * };
 * ```
 */
export function usePortableContentBreakpoints(): UseBreakpointsReturn {
  // Get current breakpoint and screen info from Unistyles runtime
  const currentBreakpoint = (UnistylesRuntime as any)
    .breakpoint as keyof PortableContentBreakpoints;
  const screenWidth = (UnistylesRuntime as any).screen.width;
  const screenHeight = (UnistylesRuntime as any).screen.height;

  // Breakpoint checker function
  const isBreakpoint = useCallback(
    (breakpoint: keyof PortableContentBreakpoints) => {
      return currentBreakpoint === breakpoint;
    },
    [currentBreakpoint]
  );

  return {
    breakpoint: currentBreakpoint,
    isBreakpoint,
    width: screenWidth,
    height: screenHeight,
  };
}

/**
 * Hook to check if the current screen matches a specific breakpoint
 *
 * @param targetBreakpoint - The breakpoint to check against
 * @returns Boolean indicating if the current breakpoint matches
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const isLargeScreen = useIsBreakpoint('lg');
 *   const isMobile = useIsBreakpoint('xs');
 *
 *   return (
 *     <View>
 *       {isLargeScreen && <LargeScreenContent />}
 *       {isMobile && <MobileContent />}
 *     </View>
 *   );
 * };
 * ```
 */
export function useIsBreakpoint(
  targetBreakpoint: keyof PortableContentBreakpoints
): boolean {
  const currentBreakpoint = (UnistylesRuntime as any)
    .breakpoint as keyof PortableContentBreakpoints;
  return currentBreakpoint === targetBreakpoint;
}

/**
 * Hook to check if the current screen is at or above a specific breakpoint
 *
 * @param minBreakpoint - The minimum breakpoint to check against
 * @returns Boolean indicating if the current screen is at or above the breakpoint
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const isTabletOrLarger = useIsBreakpointUp('md');
 *
 *   return (
 *     <View style={{
 *       flexDirection: isTabletOrLarger ? 'row' : 'column'
 *     }}>
 *       <Content />
 *     </View>
 *   );
 * };
 * ```
 */
export function useIsBreakpointUp(
  minBreakpoint: keyof PortableContentBreakpoints
): boolean {
  const screenWidth = (UnistylesRuntime as any).screen.width;
  const breakpoints = (UnistylesRuntime as any)
    .breakpoints as PortableContentBreakpoints;

  const minWidth = breakpoints[minBreakpoint];
  return screenWidth >= minWidth;
}

/**
 * Hook to check if the current screen is below a specific breakpoint
 *
 * @param maxBreakpoint - The maximum breakpoint to check against
 * @returns Boolean indicating if the current screen is below the breakpoint
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const isMobileOnly = useIsBreakpointDown('sm');
 *
 *   return (
 *     <View>
 *       {isMobileOnly && <MobileOnlyFeature />}
 *       <RegularContent />
 *     </View>
 *   );
 * };
 * ```
 */
export function useIsBreakpointDown(
  maxBreakpoint: keyof PortableContentBreakpoints
): boolean {
  const screenWidth = (UnistylesRuntime as any).screen.width;
  const breakpoints = (UnistylesRuntime as any)
    .breakpoints as PortableContentBreakpoints;

  const maxWidth = breakpoints[maxBreakpoint];
  return screenWidth < maxWidth;
}

/**
 * Hook to get responsive values based on the current breakpoint
 *
 * @param values - Object mapping breakpoints to values
 * @returns The value for the current breakpoint (or closest smaller breakpoint)
 *
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const columns = useResponsiveValue({
 *     xs: 1,
 *     sm: 2,
 *     md: 3,
 *     lg: 4,
 *     xl: 5
 *   });
 *
 *   return (
 *     <FlatList
 *       numColumns={columns}
 *       data={data}
 *       renderItem={renderItem}
 *     />
 *   );
 * };
 * ```
 */
export function useResponsiveValue<T>(
  values: Partial<Record<keyof PortableContentBreakpoints, T>>
): T | undefined {
  const breakpoints = (UnistylesRuntime as any)
    .breakpoints as PortableContentBreakpoints;
  const screenWidth = (UnistylesRuntime as any).screen.width;

  // Get all breakpoints that have values, sorted by width
  const availableBreakpoints = Object.keys(values)
    .filter(
      (bp) => values[bp as keyof PortableContentBreakpoints] !== undefined
    )
    .sort(
      (a, b) =>
        breakpoints[a as keyof PortableContentBreakpoints] -
        breakpoints[b as keyof PortableContentBreakpoints]
    );

  // Find the largest breakpoint that is still smaller than or equal to current screen width
  let selectedBreakpoint: keyof PortableContentBreakpoints | undefined;

  for (const bp of availableBreakpoints) {
    const breakpointWidth = breakpoints[bp as keyof PortableContentBreakpoints];
    if (breakpointWidth <= screenWidth) {
      selectedBreakpoint = bp as keyof PortableContentBreakpoints;
    } else {
      break;
    }
  }

  return selectedBreakpoint ? values[selectedBreakpoint] : undefined;
}
