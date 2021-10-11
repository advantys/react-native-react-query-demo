import React from 'react';

export function useQueryStatusLogging(
  {
    isLoading,
    isFetching,
  }: {
    isLoading: boolean;
    isFetching: boolean;
  },
  text: string
) {
  React.useEffect(() => {
    // isLoading is always false in Suspense mode
    if (isLoading) {
      console.log(Date.now(), `Loading ${text}`);
    }
  }, [isLoading, text]);

  React.useEffect(() => {
    if (isFetching) {
      console.log(Date.now(), `Fetching ${text}...`);
    }
  }, [isFetching, text]);
}
