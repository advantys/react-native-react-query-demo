import '@testing-library/jest-native/extend-expect';

import { server } from './server';

// To avoid the following warning:
// "Animated: `useNativeDriver` is not supported.."
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Fix https://github.com/expo/expo/issues/21434
jest.mock('expo-font', () => ({
  useFonts: () => [true, null],
  isLoaded: () => true,
}));
jest.mock('expo-asset');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Fix https://github.com/react-native-netinfo/react-native-netinfo/issues/613
enum MockNetInfoStateType {
  unknown = 'unknown',
  none = 'none',
  cellular = 'cellular',
  wifi = 'wifi',
  bluetooth = 'bluetooth',
  ethernet = 'ethernet',
  wimax = 'wimax',
  vpn = 'vpn',
  other = 'other',
}

const mockNetworkType = MockNetInfoStateType.other;

jest.mock('@react-native-community/netinfo', () => ({
  type: mockNetworkType,
  isConnected: true,
  isInternetReachable: true,
  addEventListener: jest.fn(),
  NetInfoStateType: MockNetInfoStateType,
}));

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
