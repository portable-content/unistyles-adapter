# Changelog

All notable changes to the Portable Content Unistyles Adapter will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial implementation of Portable Content Unistyles Adapter
- Core adapter factory (`createPortableContentAdapter`)
- React hooks for theme and breakpoint access
- Higher-order components for theme injection
- Comprehensive utility functions
- TypeScript type definitions
- Example React Native app
- Complete test suite
- Documentation and setup guides

### Features

- **Zero re-renders**: Leverages Unistyles 3.0's C++ core for direct Shadow Tree updates
- **Cross-platform support**: iOS, Android, and Web compatibility
- **Type-safe theming**: Full TypeScript support with autocomplete
- **Responsive design**: Breakpoint-based responsive values
- **Adaptive theming**: Automatic light/dark mode switching
- **Performance optimized**: Selective style updates based on dependencies

### Developer Experience

- React Native Builder Bob for library building
- ESLint and Prettier for code quality
- Jest testing framework with comprehensive coverage
- Example app demonstrating all features
- Detailed documentation and contribution guidelines

## [0.1.0] - 2024-01-XX

### Added

- Initial release of the Portable Content Unistyles Adapter
- Support for Unistyles 3.0 and React Native New Architecture
- Integration with @portable-content/sdk
- Comprehensive theming system
- Responsive breakpoint utilities
- Example application

---

## Release Notes

### Version 0.1.0

This is the initial release of the Portable Content Unistyles Adapter, providing seamless integration between Portable Content's design system and Unistyles 3.0's powerful styling engine.

**Key Features:**

- **New Architecture Ready**: Built specifically for React Native's Fabric renderer
- **Zero Re-renders**: Direct Shadow Tree updates from C++ for maximum performance
- **Type-Safe**: Full TypeScript support with theme and breakpoint autocomplete
- **Cross-Platform**: Consistent styling across iOS, Android, and Web
- **Responsive**: Built-in breakpoint system for responsive design
- **Adaptive**: Automatic theme switching based on system preferences

**Requirements:**

- React Native 0.78.0+
- New Architecture enabled
- Unistyles 3.0+
- TypeScript 5.0+

**Getting Started:**
See the README.md for complete installation and setup instructions.

**Breaking Changes:**
None (initial release)

**Migration Guide:**
This is a new library, no migration needed.

**Known Issues:**
None at this time.

**Contributors:**

- Initial implementation by the Portable Content team

---

For more detailed information about changes, see the commit history on GitHub.
