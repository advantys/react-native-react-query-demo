import { server } from '@app/test/server';

// To avoid the following warning:
// "Animated: `useNativeDriver` is not supported.."
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});
