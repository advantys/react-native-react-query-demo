import React from 'react';

export function useRefreshByUser(refetch: () => Promise<unknown>) {
  const [isRefetchingByUser, setIsRefetchingByUser] = React.useState(false);

  async function refetchByUser() {
    console.log(Date.now(), 'Refetching initiated by a user refresh');

    setIsRefetchingByUser(true);
    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
