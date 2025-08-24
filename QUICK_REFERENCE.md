# 📖 Quick Reference Guide

## 🚀 Installation & Setup

```bash
npm install @portable-content/unistyles-adapter
```

**Babel Config:**

```javascript
module.exports = {
  plugins: [['react-native-unistyles/plugin']],
};
```

## 🎯 Core API

### Adapter Creation

```typescript
import { createPortableContentAdapter } from '@portable-content/unistyles-adapter';

const adapter = createPortableContentAdapter({
  themes: { light: lightTheme, dark: darkTheme },
  breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 },
  settings: { adaptiveThemes: true, initialTheme: 'light' },
});
```

### Theme Hook

```typescript
import { usePortableContentTheme } from '@portable-content/unistyles-adapter';

const { theme, themeName, setTheme, breakpoint, isBreakpoint } =
  usePortableContentTheme();
```

### Breakpoints Hook

```typescript
import { usePortableContentBreakpoints } from '@portable-content/unistyles-adapter';

const { breakpoint, width, height, isBreakpoint, isAbove, isBelow } =
  usePortableContentBreakpoints();
```

## 🎨 Common Patterns

### Theme Switching

```typescript
const toggleTheme = () => setTheme(themeName === 'light' ? 'dark' : 'light');
```

### Responsive Styling

```typescript
const fontSize = isBreakpoint('sm')
  ? theme.typography.fontSize.sm
  : theme.typography.fontSize.md;
```

### Conditional Rendering

```typescript
{isAbove('md') && <LargeScreenComponent />}
{isBelow('lg') && <SmallScreenComponent />}
```

## 🛠️ Utilities

### Responsive Values

```typescript
import { createResponsiveValue } from '@portable-content/unistyles-adapter';

const padding = createResponsiveValue({
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
});
```

### Theme Values

```typescript
import { getThemeValue } from '@portable-content/unistyles-adapter';

const primaryColor = getThemeValue('colors.primary', '#007AFF');
```

### Theme Merging

```typescript
import { mergeThemes } from '@portable-content/unistyles-adapter';

const customTheme = mergeThemes(baseTheme, { colors: { primary: '#FF0000' } });
```

## 🧩 HOC Pattern

```typescript
import { withPortableContentTheme } from '@portable-content/unistyles-adapter';

const ThemedComponent = withPortableContentTheme(MyComponent);
```

## 📱 Breakpoint Values

```typescript
const breakpoints = {
  xs: 0, // 0px and up
  sm: 576, // 576px and up
  md: 768, // 768px and up
  lg: 992, // 992px and up
  xl: 1200, // 1200px and up
};
```

## 🎨 Theme Structure

```typescript
const theme = {
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
```

## ⚡ Performance Tips

- ✅ Use `usePortableContentTheme()` for reactive updates
- ✅ Theme changes don't trigger React re-renders
- ✅ Breakpoint detection is handled natively
- ✅ Optimal for complex UIs with many themed components

## 🧪 Testing

```typescript
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

## 🚨 Requirements

- **React**: >=19.0.0
- **React Native**: >=0.78.0
- **Unistyles**: >=3.0.0
- **Nitro Modules**: >=0.12.0
- **Edge to Edge**: >=1.0.0

## 📚 TypeScript Support

Full TypeScript support with exported types:

- `PortableContentTheme`
- `PortableContentBreakpoints`
- `PortableContentAdapterConfig`
- `AdapterInstance`
- `ResponsiveValue<T>`

## 🔗 Exports

```typescript
// Main functions
export { createPortableContentAdapter } from './adapter/createAdapter';
export { usePortableContentTheme } from './hooks/useTheme';
export { usePortableContentBreakpoints } from './hooks/useBreakpoints';
export { withPortableContentTheme } from './adapter/withTheme';

// Utilities
export {
  createResponsiveValue,
  mergeThemes,
  validateTheme,
  getThemeValue,
} from './utils';

// Types
export type {
  PortableContentTheme,
  PortableContentBreakpoints /* ... */,
} from './types';

// Unistyles re-exports
export { StyleSheet as PortableContentStyleSheet } from 'react-native-unistyles';
export type { UnistylesRuntime as PortableContentRuntime } from 'react-native-unistyles';
```

---

**📖 Full Guide**: See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed setup instructions.
