# Changelog

All notable changes to the Portable Content Unistyles Adapter will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2024-08-24

### Added

- **Core Adapter Implementation**
  - `createPortableContentAdapter()` - Main adapter factory function
  - `usePortableContentTheme()` - React hook for theme access with reactivity
  - `usePortableContentBreakpoints()` - React hook for responsive breakpoint detection
  - `withPortableContentTheme()` - HOC for class component theme injection

- **Comprehensive Utility Functions**
  - `createResponsiveValue()` - Create responsive value objects
  - `getThemeValue()` - Get nested theme values with fallbacks
  - `mergeThemes()` - Merge theme objects with deep merging
  - `validateTheme()` - Validate theme structure and completeness

- **Full TypeScript Support**
  - Complete type definitions for all APIs
  - Theme and breakpoint autocomplete
  - Strict typing with proper generics
  - Re-exported Unistyles types for convenience

- **React 19 + Unistyles 3.0 Integration**
  - Real Unistyles 3.0.10 integration (not mocked)
  - React 19.1.1 compatibility verified
  - React Native 0.78+ support with New Architecture
  - Zero re-render performance with native-level updates

- **Comprehensive Testing Suite**
  - 36 tests covering all functionality (100% passing)
  - Integration tests, hook tests, adapter tests, utility tests
  - React 19 compatibility verified through testing
  - Jest + jsdom environment for React hook testing

- **Production-Ready Documentation**
  - Complete Integration Guide for react-native-renderer
  - Quick Reference with API cheat sheet
  - Migration Guide from other styling solutions
  - Working Storybook demo with interactive examples

- **Developer Experience**
  - Working Storybook 9.1.3 on http://localhost:6006/
  - Example React Native app with full implementation
  - ESLint + Prettier configuration
  - GitHub Actions CI/CD with retry logic for reliability
  - React Native Builder Bob for library building

### Features

- **Zero Re-renders**: Leverages Unistyles 3.0's C++ core for direct Shadow Tree updates
- **Cross-platform Support**: iOS, Android, and Web compatibility
- **Type-safe Theming**: Full TypeScript support with theme autocomplete
- **Responsive Design**: Breakpoint-based responsive values and utilities
- **Adaptive Theming**: Automatic light/dark mode switching
- **Performance Optimized**: Compile-time optimizations and minimal runtime overhead
- **React Native Renderer Ready**: Complete interface for react-native-renderer integration

---

## Release Notes

### Version 0.1.0 - Production Ready Release 🚀

This is the **production-ready initial release** of the Portable Content Unistyles Adapter, providing seamless integration between Portable Content's design system and Unistyles 3.0's powerful styling engine.

**🎯 Ready for React Native Renderer Integration:**
The adapter provides the exact interface needed for react-native-renderer with comprehensive documentation and testing.

**✅ What's Included:**

- **Complete API Surface**: All hooks, utilities, and types needed for integration
- **React 19 Compatibility**: Fully tested with React 19.1.1 and React Native 0.78+
- **Comprehensive Testing**: 36/36 tests passing with full coverage
- **Production Documentation**: Integration guides, migration paths, and API reference
- **Working Examples**: Storybook demo and example React Native app

**🚀 Key Features:**

- **Zero Re-renders**: Direct Shadow Tree updates from C++ for maximum performance
- **Type-Safe**: Full TypeScript support with theme and breakpoint autocomplete
- **Cross-Platform**: Consistent styling across iOS, Android, and Web
- **Responsive**: Built-in breakpoint system for responsive design
- **Adaptive**: Automatic theme switching based on system preferences
- **Performance Optimized**: Compile-time optimizations and minimal runtime overhead

**📋 Requirements:**

- React 19.0.0+
- React Native 0.78.0+
- Unistyles 3.0.0+
- react-native-nitro-modules 0.12.0+
- react-native-edge-to-edge 1.0.0+

**🚀 Getting Started:**

```bash
npm install @portable-content/unistyles-adapter
```

See the [Integration Guide](./INTEGRATION_GUIDE.md) for complete setup instructions.

**📚 Documentation:**

- [Integration Guide](./INTEGRATION_GUIDE.md) - Complete react-native-renderer setup
- [Quick Reference](./QUICK_REFERENCE.md) - API cheat sheet and patterns
- [Migration Guide](./MIGRATION_GUIDE.md) - Migrate from other styling solutions

**🔧 Breaking Changes:**
None (initial release)

**🐛 Known Issues:**
None at this time - all CI checks passing

**👥 Contributors:**

- Portable Content Team - Initial implementation and documentation
- Community feedback and testing

---

For more detailed information about changes, see the commit history on GitHub.
