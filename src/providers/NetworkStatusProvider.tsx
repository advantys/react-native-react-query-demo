import React from 'react';

import { useNetworkStatus } from '@app/hooks/useNetworkStatus';

type NetworkStatus = {
  isConnected: boolean;
  isInternetReachable: boolean | null | undefined;
};

export const NetworkStatusContext = React.createContext<NetworkStatus | null>(
  null
);

type Props = {
  children: React.ReactNode;
};

export function NetworkStatusProvider({ children }: Props) {
  const networkStatus = useNetworkStatus();

  return (
    <NetworkStatusContext.Provider value={networkStatus}>
      {children}
    </NetworkStatusContext.Provider>
  );
}
