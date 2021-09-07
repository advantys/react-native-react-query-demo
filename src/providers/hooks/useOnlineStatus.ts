import React from 'react';
import { NetworkStatusContext } from '@app/providers/NetworkStatusProvider';

export function useOnlineStatus() {
  const networkStatus = React.useContext(NetworkStatusContext);

  const isOnline =
    typeof networkStatus.isInternetReachable === 'boolean'
      ? networkStatus.isInternetReachable
      : networkStatus.isConnected;

  return isOnline;
}
