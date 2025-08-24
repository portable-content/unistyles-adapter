module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-unistyles|react-native-nitro-modules|react-native-edge-to-edge|@portable-content)/)',
  ],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      { presets: ['@babel/preset-env', '@babel/preset-typescript'] },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
