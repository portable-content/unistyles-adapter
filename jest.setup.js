// Jest setup file for additional configuration

// Mock react-native modules that might not be available in test environment
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock Unistyles runtime for testing
jest.mock('react-native-unistyles', () => ({
  StyleSheet: {
    create: jest.fn((styles) => styles),
    configure: jest.fn(),
    hairlineWidth: 1,
  },
  UnistylesRuntime: {
    theme: {
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
    },
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
      width: 375,
      height: 812,
    },
    setTheme: jest.fn(),
    addPlugin: jest.fn(),
    removePlugin: jest.fn(),
  },
}));

// Mock @portable-content/typescript-sdk if needed
// jest.mock('@portable-content/typescript-sdk', () => ({
//   // Add mock implementations as needed
// }));

// Global test utilities
global.console = {
  ...console,
  // Suppress console.warn in tests unless explicitly needed
  warn: jest.fn(),
};
