import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';
import { Platform } from 'react-native';

const isWEB = Platform.OS === 'web';

export function useOnlineManager() {
  React.useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (!isWEB) {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
}
