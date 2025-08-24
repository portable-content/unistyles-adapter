# Unistyles Adapter for Portable Content

A React Native adapter library that integrates [Unistyles 3.0](https://www.unistyl.es/) with the [@portable-content/sdk](https://github.com/portable-content/sdk) for seamless cross-platform styling.

## Overview

This adapter provides a bridge between Portable Content's design system and Unistyles 3.0's powerful styling engine, enabling:

- **Zero re-renders**: Leverages Unistyles 3.0's C++ core for direct Shadow Tree updates
- **Cross-platform consistency**: Share up to 100% of styles across iOS, Android, and Web
- **New Architecture ready**: Built for React Native's Fabric renderer
- **Type-safe styling**: Full TypeScript support with theme and breakpoint autocomplete
- **Adaptive theming**: Automatic light/dark mode switching
- **Performance optimized**: Selective style updates based on dependencies

## Requirements

### React Native & Architecture

- **React Native**: 0.78.0+ (required for Fabric integration)
- **New Architecture**: Must be enabled (no Old Architecture support)
- **Expo SDK**: 53+ (if using Expo)

### Platform Support

- **iOS**: 15.0+
- **Android**: API 7+
- **Web**: Full React Native Web support
- **SSR**: Next.js Server Side Rendering support

### Development Tools

- **Xcode**: 16+ (recommended 16.3+) - Required by Nitro Modules
- **TypeScript**: 5.0+
- **Node.js**: 18+

## Quick Start

### 1. Installation

```bash
# Install the adapter and its peer dependencies
npm install @portable-content/unistyles-adapter @portable-content/sdk react-native-unistyles react-native-nitro-modules react-native-edge-to-edge

# Or with yarn
yarn add @portable-content/unistyles-adapter @portable-content/sdk react-native-unistyles react-native-nitro-modules react-native-edge-to-edge
```

### 2. Babel Configuration

Add the Unistyles Babel plugin to your `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'], // or 'babel-preset-expo' for Expo
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: 'src', // or your app's root folder
        },
      ],
    ],
  };
};
```

### 3. Platform Setup

#### For Expo Projects

```bash
npx expo prebuild --clean
```

#### For Bare React Native

```bash
cd ios && pod install
```

### 4. Configure the Adapter

Create a `styles/unistyles.ts` file in your project:

```typescript
import { StyleSheet } from 'react-native-unistyles';
import { createPortableContentAdapter } from '@portable-content/unistyles-adapter';

// Define your themes using Portable Content design tokens
const lightTheme = {
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

const darkTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
  },
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
};

// Define breakpoints
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Create the adapter
const adapter = createPortableContentAdapter({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
});

// Configure Unistyles
StyleSheet.configure({
  themes: adapter.themes,
  breakpoints: adapter.breakpoints,
  settings: {
    adaptiveThemes: true,
    initialTheme: 'light',
  },
});

// Export types for TypeScript
type AppThemes = typeof adapter.themes;
type AppBreakpoints = typeof adapter.breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

export { adapter };
```

### 5. Import Configuration

Import your configuration file in your app's entry point (e.g., `App.tsx` or `index.js`):

```typescript
import './styles/unistyles' // Import before any components
import { StyleSheet } from 'react-native-unistyles'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Unistyles!</Text>
    </View>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    fontWeight: 'bold'
  }
}))

export default App
```

## 📚 Documentation

### 🚀 Getting Started

- **[Integration Guide](./INTEGRATION_GUIDE.md)** - Complete setup and integration instructions for react-native-renderer
- **[Quick Reference](./QUICK_REFERENCE.md)** - API cheat sheet and common patterns
- **[Migration Guide](./MIGRATION_GUIDE.md)** - Migrate from other styling solutions

### 📖 Additional Resources

- [Storybook Demo](http://localhost:6006/) - Interactive component showcase (when running `npm run storybook`)
- [Example App](./example/) - Full React Native example implementation
- [API Reference](#api-reference) - Detailed API documentation below

## Development Setup

This section is for contributors who want to work on the adapter itself.

### Prerequisites

- Node.js 18+
- Yarn or npm
- React Native development environment
- Xcode 16+ (for iOS development)
- Android Studio (for Android development)

### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/portable-content/unistyles-adapter.git
cd unistyles-adapter

# Install dependencies
yarn install

# Build the library
yarn build

# Run tests
yarn test

# Run linting
yarn lint

# Format code
yarn format
```

### Project Structure

```
unistyles-adapter/
├── src/                    # Source code
│   ├── adapter/           # Core adapter implementation
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── index.ts           # Main export file
├── example/               # Example React Native app
│   ├── src/
│   ├── ios/
│   ├── android/
│   └── package.json
├── __tests__/             # Test files
├── docs/                  # Documentation
├── .github/               # GitHub workflows
├── package.json
├── tsconfig.json
├── babel.config.js
├── jest.config.js
├── .eslintrc.js
├── .prettierrc
└── README.md
```

### Available Scripts

```bash
# Development
yarn dev                   # Start development mode with watch
yarn build                 # Build the library
yarn build:watch          # Build with watch mode

# Testing
yarn test                  # Run tests
yarn test:watch           # Run tests in watch mode
yarn test:coverage        # Run tests with coverage

# Code Quality
yarn lint                  # Run ESLint
yarn lint:fix             # Fix ESLint issues
yarn format               # Format with Prettier
yarn typecheck            # Run TypeScript checks

# Example App
yarn example:install      # Install example app dependencies
yarn example:ios          # Run example on iOS
yarn example:android      # Run example on Android
yarn example:web          # Run example on web

# Release
yarn release              # Create a new release
yarn publish              # Publish to npm
```

### Testing

The library uses Jest for testing with React Native Testing Library:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test src/adapter/__tests__/adapter.test.ts
```

### Example App

The example app demonstrates the adapter's capabilities:

```bash
# Install example dependencies
cd example
yarn install

# iOS
yarn ios

# Android
yarn android

# Web
yarn web
```

## API Reference

### `createPortableContentAdapter(config)`

Creates an adapter instance that bridges Portable Content design tokens with Unistyles.

#### Parameters

- `config.themes` - Object containing theme definitions
- `config.breakpoints` - Object defining responsive breakpoints
- `config.settings` - Optional Unistyles settings

#### Returns

An adapter object with:

- `themes` - Processed themes for Unistyles
- `breakpoints` - Processed breakpoints for Unistyles
- `utils` - Utility functions for theme manipulation

### Theme Structure

Themes should follow the Portable Content design token structure:

```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    // ... additional colors
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    // ... additional spacing values
  };
  typography: {
    fontSize: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      // ... additional font sizes
    };
    // ... additional typography properties
  };
  // ... additional design tokens
}
```

## Advanced Usage

### Custom Theme Extensions

```typescript
import { createPortableContentAdapter } from '@portable-content/unistyles-adapter';

const adapter = createPortableContentAdapter({
  themes: {
    light: {
      // ... base theme
      custom: {
        gradients: {
          primary: ['#FF6B6B', '#4ECDC4'],
          secondary: ['#A8E6CF', '#DCEDC1'],
        },
      },
    },
  },
});
```

### Responsive Design

```typescript
const styles = StyleSheet.create((theme) => ({
  container: {
    padding: {
      xs: theme.spacing.sm,
      md: theme.spacing.lg,
      xl: theme.spacing.xl,
    },
    fontSize: {
      xs: theme.typography.fontSize.sm,
      md: theme.typography.fontSize.md,
      lg: theme.typography.fontSize.lg,
    },
  },
}));
```

### Dynamic Theming

```typescript
import { UnistylesRuntime } from 'react-native-unistyles';

// Switch themes programmatically
UnistylesRuntime.setTheme('dark');

// Get current theme
const currentTheme = UnistylesRuntime.themeName;

// Listen to theme changes
UnistylesRuntime.addPlugin((name) => {
  console.log('Theme changed to:', name);
});
```

## Troubleshooting

### Common Issues

#### 1. "Unistyles: we detected style object with N unistyles styles"

This warning occurs when spreading styles. Use array syntax instead:

```typescript
// ❌ Don't do this
<View style={{...style1, ...style2}} />

// ✅ Do this instead
<View style={[style1, style2]} />
```

#### 2. "ld.lld: error: Undefined symbols margelo::nitro::\*"

Clear Android build cache:

```bash
cd android
./gradlew clean
git clean -dfX
```

#### 3. Babel plugin not processing files

Ensure your `babel.config.js` includes the correct root path:

```js
plugins: [
  [
    'react-native-unistyles/plugin',
    {
      root: 'src', // Make sure this matches your project structure
    },
  ],
];
```

### Getting Help

- 📖 [Unistyles Documentation](https://www.unistyl.es/)
- 💬 [Discord Community](https://discord.gg/akGHf27P4C)
- 🐛 [Report Issues](https://github.com/portable-content/unistyles-adapter/issues)
- 📧 [Contact Support](mailto:support@portable-content.com)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for your changes
5. Run the test suite: `yarn test`
6. Run linting: `yarn lint`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

## License

MIT © [Portable Content](https://github.com/portable-content)

## Acknowledgments

- [Unistyles](https://www.unistyl.es/) - The powerful styling engine that makes this adapter possible
- [React Native Community](https://reactnative.dev/) - For the amazing ecosystem
- [Nitro Modules](https://nitro.margelo.com/) - For the high-performance native bindings
