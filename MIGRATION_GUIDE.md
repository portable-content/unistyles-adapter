# 🔄 Migration Guide

This guide helps you migrate from other styling solutions to the **@portable-content/unistyles-adapter**.

## 📋 Migration Paths

### From React Native StyleSheet

```typescript
// Before: React Native StyleSheet
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
});

// After: Portable Content Adapter
import { usePortableContentTheme } from '@portable-content/unistyles-adapter';

const MyComponent = () => {
  const { theme } = usePortableContentTheme();

  return (
    <View style={{
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    }}>
      {/* content */}
    </View>
  );
};
```

### From Styled Components

```typescript
// Before: Styled Components
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 16px;
  background-color: ${props => props.theme.colors.background};
`;

// After: Portable Content Adapter
import { usePortableContentTheme } from '@portable-content/unistyles-adapter';

const MyComponent = () => {
  const { theme } = usePortableContentTheme();

  return (
    <View style={{
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    }}>
      {/* content */}
    </View>
  );
};
```

### From Tamagui

```typescript
// Before: Tamagui
import { YStack, Text } from '@tamagui/core';

<YStack padding="$4" backgroundColor="$background">
  <Text color="$color">Hello</Text>
</YStack>

// After: Portable Content Adapter
import { usePortableContentTheme } from '@portable-content/unistyles-adapter';

const MyComponent = () => {
  const { theme } = usePortableContentTheme();

  return (
    <View style={{
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
};
```

### From NativeBase

```typescript
// Before: NativeBase
import { Box, Text } from 'native-base';

<Box bg="white" p={4}>
  <Text color="black">Hello</Text>
</Box>

// After: Portable Content Adapter
import { usePortableContentTheme } from '@portable-content/unistyles-adapter';

const MyComponent = () => {
  const { theme } = usePortableContentTheme();

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
};
```

## 🎨 Theme Migration

### Define Your Design System

```typescript
// 1. Extract your existing theme values
const designTokens = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    // Add your existing colors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    // Map your existing spacing scale
  },
  typography: {
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      // Convert your font sizes
    },
  },
};

// 2. Create light and dark variants
const lightTheme = designTokens;
const darkTheme = {
  ...designTokens,
  colors: {
    ...designTokens.colors,
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    // Override for dark mode
  },
};
```

### Responsive Breakpoints

```typescript
// Map your existing breakpoints
const breakpoints = {
  xs: 0, // Mobile portrait
  sm: 576, // Mobile landscape
  md: 768, // Tablet portrait
  lg: 992, // Tablet landscape
  xl: 1200, // Desktop
};
```

## 🔧 Component Migration Strategy

### Step 1: Create Theme Provider

```typescript
// App.tsx
import { UnistylesRegistry } from 'react-native-unistyles';
import { createPortableContentAdapter } from '@portable-content/unistyles-adapter';

// Register themes with Unistyles
UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({ light: lightTheme, dark: darkTheme })
  .addConfig({ adaptiveThemes: true });

// Create adapter
const adapter = createPortableContentAdapter({
  themes: { light: lightTheme, dark: darkTheme },
  breakpoints,
});
```

### Step 2: Migrate Components Gradually

```typescript
// Start with leaf components, work up the tree
const Button = ({ title, onPress }) => {
  const { theme } = usePortableContentTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text style={{
        color: 'white',
        fontSize: theme.typography.fontSize.md,
        textAlign: 'center',
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```

### Step 3: Add Responsive Behavior

```typescript
const ResponsiveComponent = () => {
  const { theme } = usePortableContentTheme();
  const { isBreakpoint, isAbove } = usePortableContentBreakpoints();

  return (
    <View style={{
      padding: isBreakpoint('xs') ? theme.spacing.sm : theme.spacing.lg,
      flexDirection: isAbove('md') ? 'row' : 'column',
    }}>
      {/* content */}
    </View>
  );
};
```

## 🚀 Migration Checklist

### Pre-Migration

- [ ] Audit existing theme/styling approach
- [ ] Document current design tokens
- [ ] Identify responsive breakpoints
- [ ] Plan component migration order

### Setup Phase

- [ ] Install dependencies (React 19+, RN 0.78+, Unistyles 3.0+)
- [ ] Configure Babel plugin
- [ ] Create theme definitions
- [ ] Set up Unistyles registry
- [ ] Create adapter instance

### Migration Phase

- [ ] Start with design system components (Button, Text, etc.)
- [ ] Migrate leaf components first
- [ ] Add responsive behavior where needed
- [ ] Test theme switching
- [ ] Update component tests

### Validation Phase

- [ ] Test on multiple screen sizes
- [ ] Verify theme switching works
- [ ] Check performance (should be better!)
- [ ] Update documentation
- [ ] Train team on new patterns

## ⚡ Performance Benefits

### Before (Traditional Approaches)

- ❌ Theme changes trigger full re-renders
- ❌ Responsive updates cause layout thrashing
- ❌ Large bundle sizes with CSS-in-JS
- ❌ Runtime style calculations

### After (Unistyles 3.0 + Adapter)

- ✅ Zero re-renders on theme changes
- ✅ Native-level responsive updates
- ✅ Compile-time optimizations
- ✅ Minimal runtime overhead

## 🧪 Testing Migration

```typescript
// Create test utilities
export const createMockTheme = () => ({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { md: 16 },
  typography: { fontSize: { md: 16 } },
});

// Mock the adapter in tests
jest.mock('@portable-content/unistyles-adapter', () => ({
  usePortableContentTheme: () => ({
    theme: createMockTheme(),
    themeName: 'light',
    setTheme: jest.fn(),
  }),
}));
```

## 🚨 Common Migration Issues

### Issue: Bundle Size Increase

**Solution**: Unistyles optimizes at compile-time, net bundle size usually decreases

### Issue: TypeScript Errors

**Solution**: Ensure React 19+ types and proper peer dependencies

### Issue: Theme Not Updating

**Solution**: Verify Unistyles registry setup and adapter creation

### Issue: Responsive Not Working

**Solution**: Check breakpoint definitions and hook usage

## 📚 Migration Resources

- **Before/After Examples**: See `/examples` directory
- **Component Library**: Pre-built components using the adapter
- **Design System**: Template for design token migration
- **Testing Utilities**: Helpers for component testing

## 🎯 Next Steps After Migration

1. **Optimize Performance**: Remove unnecessary re-renders
2. **Enhance Responsive Design**: Add more breakpoint-specific behavior
3. **Improve Developer Experience**: Create design system components
4. **Monitor Bundle Size**: Verify optimization benefits
5. **Team Training**: Educate on new patterns and best practices

---

**Need Help?** Check the [GitHub Issues](https://github.com/portable-content/unistyles-adapter/issues) or [Integration Guide](./INTEGRATION_GUIDE.md) for more details.
