/**
 * Tests for Portable Content hooks
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import {
  usePortableContentTheme,
  usePortableContentThemeStatic,
} from '../hooks/useTheme';
import { usePortableContentBreakpoints } from '../hooks/useBreakpoints';

// Mock Unistyles
jest.mock('react-native-unistyles', () => ({
  UnistylesRuntime: {
    getTheme: jest.fn(() => ({
      colors: { primary: '#007AFF', background: '#FFFFFF' },
      spacing: { md: 16 },
      typography: { fontSize: { md: 16 } },
    })),
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
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
  })),
}));

describe('Portable Content Hooks', () => {
  describe('usePortableContentTheme', () => {
    it('should return theme data correctly', () => {
      const { result } = renderHook(() => usePortableContentTheme());

      expect(result.current.theme).toBeDefined();
      expect(result.current.theme.colors.primary).toBe('#007AFF');
      expect(result.current.themeName).toBe('light');
      expect(result.current.breakpoint).toBe('md');
      expect(typeof result.current.setTheme).toBe('function');
      expect(typeof result.current.isBreakpoint).toBe('function');
    });

    it('should provide working isBreakpoint function', () => {
      const { result } = renderHook(() => usePortableContentTheme());

      expect(result.current.isBreakpoint('md')).toBe(true);
      expect(result.current.isBreakpoint('lg')).toBe(false);
    });
  });

  describe('usePortableContentThemeStatic', () => {
    it('should return theme without reactivity', () => {
      const { result } = renderHook(() => usePortableContentThemeStatic());

      expect(result.current).toBeDefined();
      expect(result.current.colors.primary).toBe('#007AFF');
      expect(result.current.spacing.md).toBe(16);
    });
  });

  describe('usePortableContentBreakpoints', () => {
    it('should return breakpoint data correctly', () => {
      const { result } = renderHook(() => usePortableContentBreakpoints());

      expect(result.current.breakpoint).toBe('md');
      expect(result.current.width).toBe(768);
      expect(result.current.height).toBe(1024);
      expect(typeof result.current.isBreakpoint).toBe('function');
    });

    it('should provide working isBreakpoint function', () => {
      const { result } = renderHook(() => usePortableContentBreakpoints());

      expect(result.current.isBreakpoint('md')).toBe(true);
      expect(result.current.isBreakpoint('xs')).toBe(false);
    });
  });
});
