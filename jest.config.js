module.exports = {
  preset: 'jest-expo',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/app.config.ts',
    '!**/types.ts',
    '!**/test/**',
    '!**/hasura/**',
    '!**/assets/**',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|crypto-es)',
  ],
  moduleNameMapper: {
    '\\.(woff|woff2)$': require.resolve('./src/test/fileMock.js'),
  },
  setupFilesAfterEnv: ['./src/test/testSetup.ts'],
};
