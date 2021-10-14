import React from 'react';
import { NetworkStatusContext } from '@app/providers/NetworkStatusProvider';

export function useOnlineStatus() {
  const contextValue = React.useContext(NetworkStatusContext);

  if (!contextValue) {
    throw new Error(
      'Wrap your components tree with a GraphQLClientProvider component'
    );
  }

  const isOnline =
    typeof contextValue.isInternetReachable === 'boolean'
      ? contextValue.isInternetReachable
      : contextValue.isConnected;

  return isOnline;
}
