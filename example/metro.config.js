const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  watchFolders: [
    // Include the parent directory to watch for changes in the library
    path.resolve(__dirname, '..'),
  ],
  resolver: {
    // Add support for the library's source files
    alias: {
      '@portable-content/unistyles-adapter': path.resolve(
        __dirname,
        '..',
        'src'
      ),
    },
    // Ensure we can resolve modules from the parent directory
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '..', 'node_modules'),
    ],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(defaultConfig, config);
