# 🚀 React Native Renderer Integration Guide

This guide shows how to integrate the **@portable-content/unistyles-adapter** with the react-native-renderer for seamless cross-platform styling with Unistyles 3.0.

## 📋 Prerequisites

### Required Dependencies

```json
{
  "react": ">=19.0.0",
  "react-native": ">=0.78.0",
  "react-native-unistyles": ">=3.0.0",
  "react-native-nitro-modules": ">=0.12.0",
  "react-native-edge-to-edge": ">=1.0.0"
}
```

### Installation

```bash
npm install @portable-content/unistyles-adapter
# or
yarn add @portable-content/unistyles-adapter
```

## 🔧 Setup

### 1. Configure Babel Plugin

Add to your `babel.config.js`:

```javascript
module.exports = {
  plugins: [['react-native-unistyles/plugin']],
};
```

### 2. Create Unistyles Configuration

Create `unistyles.ts` in your project:

```typescript
import { UnistylesRegistry } from 'react-native-unistyles';

// Define your themes
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

// Register with Unistyles
UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true,
    initialTheme: 'light',
  });
```

### 3. Initialize Adapter

```typescript
import { createPortableContentAdapter } from '@portable-content/unistyles-adapter';

const adapter = createPortableContentAdapter({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
  settings: {
    adaptiveThemes: true,
    initialTheme: 'light',
  },
});
```

## 🎯 React Native Renderer Integration

### Core Integration Pattern

```typescript
import {
  createPortableContentAdapter,
  usePortableContentTheme,
  usePortableContentBreakpoints,
  type PortableContentTheme,
  type PortableContentBreakpoints,
} from '@portable-content/unistyles-adapter';

// In your renderer setup
export class ReactNativeRenderer {
  private adapter: ReturnType<typeof createPortableContentAdapter>;

  constructor(config: RendererConfig) {
    this.adapter = createPortableContentAdapter({
      themes: config.themes,
      breakpoints: config.breakpoints,
      settings: config.settings,
    });
  }

  // Provide theme context to components
  renderWithTheme(component: React.ComponentType) {
    return () => {
      const { theme, setTheme, breakpoint } = usePortableContentTheme();
      const breakpoints = usePortableContentBreakpoints();

      return React.createElement(component, {
        theme,
        setTheme,
        breakpoint,
        breakpoints,
      });
    };
  }
}
```

### Component Integration

```typescript
// In your rendered components
import { usePortableContentTheme } from '@portable-content/unistyles-adapter';

export const PortableComponent: React.FC = () => {
  const { theme, breakpoint, isBreakpoint } = usePortableContentTheme();

  return (
    <View style={{
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
      // Responsive styling
      fontSize: isBreakpoint('sm') ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
    }}>
      <Text style={{ color: theme.colors.text }}>
        Current breakpoint: {breakpoint}
      </Text>
    </View>
  );
};
```

## 🎨 Advanced Usage

### Responsive Utilities

```typescript
import { createResponsiveValue } from '@portable-content/unistyles-adapter';

const responsivePadding = createResponsiveValue({
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
});
```

### Theme Utilities

```typescript
import {
  getThemeValue,
  mergeThemes,
} from '@portable-content/unistyles-adapter';

// Get nested theme values
const primaryColor = getThemeValue('colors.primary', '#007AFF');

// Merge theme overrides
const customTheme = mergeThemes(baseTheme, {
  colors: { primary: '#FF0000' },
});
```

### HOC Pattern

```typescript
import { withPortableContentTheme } from '@portable-content/unistyles-adapter';

const EnhancedComponent = withPortableContentTheme(MyComponent);
```

## 🔄 Runtime Theme Switching

```typescript
const ThemeSwitcher: React.FC = () => {
  const { themeName, setTheme } = usePortableContentTheme();

  return (
    <TouchableOpacity onPress={() => setTheme(themeName === 'light' ? 'dark' : 'light')}>
      <Text>Switch to {themeName === 'light' ? 'dark' : 'light'} theme</Text>
    </TouchableOpacity>
  );
};
```

## 📱 Breakpoint Detection

```typescript
const ResponsiveComponent: React.FC = () => {
  const { isBreakpoint, isAbove, isBelow, width } = usePortableContentBreakpoints();

  return (
    <View>
      {isBreakpoint('sm') && <Text>Small screen</Text>}
      {isAbove('md') && <Text>Medium screen or larger</Text>}
      {isBelow('lg') && <Text>Below large screen</Text>}
      <Text>Screen width: {width}px</Text>
    </View>
  );
};
```

## ⚡ Performance Optimization

The adapter uses Unistyles 3.0's zero re-render architecture:

- Theme changes don't trigger React re-renders
- Breakpoint changes are handled at the native level
- Optimal performance for complex UIs

## 🧪 Testing

```typescript
// Mock for testing
jest.mock('@portable-content/unistyles-adapter', () => ({
  usePortableContentTheme: () => ({
    theme: mockTheme,
    themeName: 'light',
    setTheme: jest.fn(),
    breakpoint: 'md',
    isBreakpoint: jest.fn(),
  }),
}));
```

## 🚨 Troubleshooting

### Common Issues

1. **Babel Plugin Not Working**
   - Ensure `react-native-unistyles/plugin` is in babel.config.js
   - Clear Metro cache: `npx react-native start --reset-cache`

2. **TypeScript Errors**
   - Ensure React 19+ and proper type definitions
   - Check peer dependency versions

3. **Theme Not Updating**
   - Verify Unistyles registry is properly configured
   - Check that themes are registered before adapter creation

## 📚 API Reference

### Core Functions

- `createPortableContentAdapter(config)` - Create adapter instance
- `usePortableContentTheme()` - Theme hook with reactivity
- `usePortableContentBreakpoints()` - Breakpoint detection hook
- `withPortableContentTheme(Component)` - HOC for theme injection

### Utilities

- `createResponsiveValue(values)` - Create responsive value object
- `getThemeValue(path, fallback)` - Get nested theme value
- `mergeThemes(base, overrides)` - Merge theme objects
- `validateTheme(theme)` - Validate theme structure

## 🎯 Next Steps

1. **Initialize** the adapter in your renderer setup
2. **Configure** themes and breakpoints for your design system
3. **Integrate** hooks in your components
4. **Test** theme switching and responsive behavior
5. **Deploy** with confidence! 🚀

---

**Need help?** Check the [GitHub repository](https://github.com/portable-content/unistyles-adapter) for examples and issues.
