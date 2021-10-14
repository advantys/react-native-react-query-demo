import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useOnlineStatus } from '../useOnlineStatus';
import { NetworkStatusProvider } from '@app/providers/NetworkStatusProvider';
import * as networkStatus from '@app/hooks/useNetworkStatus';

type WrapperProps = {
  children: any;
};

const wrapper = ({ children }: WrapperProps) => {
  return <NetworkStatusProvider>{children}</NetworkStatusProvider>;
};

describe('useOnlineStatus hook tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should throw an error if the hook is wrapped in a provider', () => {
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.error).not.toBeNull();
  });

  it('Should return true if isInternetReachable is true', () => {
    jest.spyOn(networkStatus, 'useNetworkStatus').mockImplementation(() => {
      return {
        isConnected: true,
        isInternetReachable: true,
        type: 'test',
      };
    });
    const { result } = renderHook(() => useOnlineStatus(), { wrapper });
    expect(result.current).toBeTruthy();
  });

  it('Should return true if isConnected is true', () => {
    jest.spyOn(networkStatus, 'useNetworkStatus').mockImplementation(() => {
      return {
        isConnected: true,
        isInternetReachable: undefined,
      };
    });
    const { result } = renderHook(() => useOnlineStatus(), { wrapper });
    expect(result.current).toBeTruthy();
  });

  it('Should return false if isConnected is false', () => {
    jest.spyOn(networkStatus, 'useNetworkStatus').mockImplementation(() => {
      return {
        isConnected: false,
        isInternetReachable: undefined,
      };
    });
    const { result } = renderHook(() => useOnlineStatus(), { wrapper });
    expect(result.current).toBeFalsy();
  });
});
