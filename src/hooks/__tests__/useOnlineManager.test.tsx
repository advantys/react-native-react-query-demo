import { renderHook, act } from '@testing-library/react-hooks';
import { onlineManager } from 'react-query';
import NetInfo from '@react-native-community/netinfo';
import {
  NetInfoState,
  NetInfoStateType,
  NetInfoChangeHandler,
} from '@react-native-community/netinfo';

import { useOnlineManager } from '../useOnlineManager';

describe('useOnlineManager hook tests', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('Should call react query setOnline if not web platform', async () => {
    // Mock android platform
    jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
      select: () => void 0,
    }));

    // Spy React-Query onlineManager
    const spySetOnline = jest
      .spyOn(onlineManager, 'setOnline')
      .mockImplementation((isOnline) => isOnline);

    // Spy NetInfo addEventListener
    let handler: NetInfoChangeHandler = () => void 0;
    jest.spyOn(NetInfo, 'addEventListener').mockImplementation((listener) => {
      handler = listener;
      return () => (handler = () => void 0);
    });

    renderHook(() => useOnlineManager());

    // Mock a connected event
    const mockConnectedInfoState: NetInfoState = {
      isConnected: true,
      isInternetReachable: true,
      type: NetInfoStateType.other,
      details: { isConnectionExpensive: false },
    };

    await act(async () => {
      handler(mockConnectedInfoState);
    });

    // setOnline should be called if not web platform
    expect(spySetOnline.mock.calls.length).toBe(1);
  });

  it('Should not call addEventListener if web platform', async () => {
    // Mock web platform
    jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'web',
      select: () => void 0,
    }));

    // Spy NetInfo addEventListener
    const spyAddEventListener = jest.spyOn(NetInfo, 'addEventListener');

    renderHook(() => useOnlineManager());

    // Should not be call addEventListener
    expect(spyAddEventListener.mock.calls.length).toBe(0);
  });
});
