# Contributing to Unistyles Adapter

Thank you for your interest in contributing to the Portable Content Unistyles Adapter! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Node.js 18+
- Yarn (recommended) or npm
- React Native development environment
- Xcode 16+ (for iOS development)
- Android Studio (for Android development)

### Getting Started

1. **Fork and Clone**

   ```bash
   git clone https://github.com/your-username/unistyles-adapter.git
   cd unistyles-adapter
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Build the Library**

   ```bash
   yarn build
   ```

4. **Run Tests**

   ```bash
   yarn test
   ```

5. **Set up Example App**
   ```bash
   cd example
   yarn install
   yarn ios # or yarn android
   ```

## Development Workflow

### Making Changes

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Add or update tests in `src/__tests__/`

4. Run the test suite:

   ```bash
   yarn test
   ```

5. Run linting and formatting:

   ```bash
   yarn lint
   yarn format
   ```

6. Test your changes in the example app:
   ```bash
   cd example
   yarn start
   ```

### Code Style

We use ESLint and Prettier to maintain consistent code style:

- **ESLint**: Enforces code quality rules
- **Prettier**: Handles code formatting
- **TypeScript**: Provides type safety

Run these commands before committing:

```bash
yarn lint:fix
yarn format
yarn typecheck
```

### Testing

We use Jest for testing with the following structure:

- **Unit tests**: Test individual functions and utilities
- **Integration tests**: Test adapter creation and configuration
- **Type tests**: Ensure TypeScript types work correctly

Test files should be placed in `src/__tests__/` and follow the naming convention `*.test.ts` or `*.test.tsx`.

### Documentation

When adding new features:

1. Update the main README.md if needed
2. Add JSDoc comments to public APIs
3. Update TypeScript type definitions
4. Add examples to the example app if applicable

## Project Structure

```
unistyles-adapter/
├── src/                    # Source code
│   ├── adapter/           # Core adapter implementation
│   ├── hooks/             # React hooks
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   └── __tests__/         # Test files
├── example/               # Example React Native app
├── docs/                  # Documentation
└── lib/                   # Built output (generated)
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:

```
feat: add responsive value utility function
fix: resolve theme merging issue with nested objects
docs: update installation instructions
test: add tests for breakpoint hooks
```

## Pull Request Process

1. **Before submitting:**
   - Ensure all tests pass
   - Run linting and formatting
   - Update documentation if needed
   - Test in the example app

2. **PR Description:**
   - Clearly describe what changes you made
   - Explain why the changes are needed
   - Include screenshots for UI changes
   - Reference any related issues

3. **Review Process:**
   - Maintainers will review your PR
   - Address any feedback or requested changes
   - Once approved, your PR will be merged

## Release Process

Releases are handled by maintainers:

1. Version bump using semantic versioning
2. Update CHANGELOG.md
3. Create GitHub release
4. Publish to npm

## Getting Help

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Discord**: Join our community Discord server
- **Email**: Contact the maintainers directly

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:

- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

Thank you for contributing to the Portable Content Unistyles Adapter!
