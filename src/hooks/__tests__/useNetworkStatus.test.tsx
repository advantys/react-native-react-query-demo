import { renderHook, act } from '@testing-library/react-hooks';
import NetInfo from '@react-native-community/netinfo';
import {
  NetInfoState,
  NetInfoDisconnectedStates,
  NetInfoStateType,
  NetInfoChangeHandler,
} from '@react-native-community/netinfo';

import { useNetworkStatus } from '@app/hooks/useNetworkStatus';

describe('useNetworkStatus hook tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should return the network status', async () => {
    let handler: NetInfoChangeHandler = () => void 0;

    const addEventListenerSpy = jest
      .spyOn(NetInfo, 'addEventListener')
      .mockImplementation((listener) => {
        handler = listener;
        return () => (handler = () => void 0);
      });
    const { result } = renderHook(() => useNetworkStatus());

    expect(addEventListenerSpy).toHaveBeenCalled();

    // Mock a connected event
    const connectedInfoStateMock: NetInfoState = {
      isConnected: true,
      isInternetReachable: null,
      type: NetInfoStateType.other,
      details: { isConnectionExpensive: false },
    };

    await act(async () => {
      handler(connectedInfoStateMock);
    });

    expect(result.current.isConnected).toBeTruthy();

    // Mock a disconnected event
    const disconnectedInfoStateMock: NetInfoDisconnectedStates = {
      isConnected: false,
      isInternetReachable: false,
      type: NetInfoStateType.none,
      details: null,
    };

    await act(async () => {
      handler(disconnectedInfoStateMock);
    });

    expect(result.current.isConnected).toBeFalsy();
  });
});
