import NetInfo from '@react-native-community/netinfo';
import React from 'react';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = React.useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = React.useState<
    boolean | null | undefined
  >(undefined);

  React.useEffect(() => {
    return NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected != null && state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
  }, []);

  return React.useMemo(
    () => ({ isConnected, isInternetReachable }),
    [isConnected, isInternetReachable]
  );
}
