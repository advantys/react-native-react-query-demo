import React from 'react';

export function useQueryStatusLogging(
  {
    isFetching,
  }: {
    isFetching: boolean;
  },
  text: string
) {
  React.useEffect(() => {
    if (isFetching) {
      console.log(Date.now(), `Fetching ${text}...`);
    }
  }, [isFetching, text]);
}
