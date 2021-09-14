import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';
import { MovieDetailsFragment } from '@app/services/graphql';

export const useMovieDetailsSubscription = (id: number) => {
  const { webSocketClient } = useGraphQLClient();
  const queryClient = useQueryClient();
  const [isDeleted, setIsDeleted] = useState(false);
  const isFirstResponse = useRef(true);

  useEffect(() => {
    const movieSubscription = `subscription { 
      movie(id: ${id}) { 
        id 
        title 
        ratings 
        storyline 
        genre 
      }
    }`;

    console.log(Date.now(), `Subscribe to movie #${id} details`);

    const unsubscribe = webSocketClient.subscribe<any>(
      { query: movieSubscription },
      {
        next: (value: { data: { movie: MovieDetailsFragment | null } }) => {
          console.log(Date.now(), `Movie #${id} details received`);
          if (value.data.movie) {
            queryClient.setQueryData(['movieDetailsQuery', { id }], value.data);
          } else {
            setIsDeleted(true);
          }
          if (!isFirstResponse.current) {
            queryClient.invalidateQueries('moviesQuery');
          }
          isFirstResponse.current = false;
        },
        error: (error) => {
          console.error(
            Date.now(),
            `Movie #${id} details subscription error`,
            error
          );
        },
        complete: () => {
          console.log(
            Date.now(),
            `Movie #${id} details subscription completed`
          );
        },
      }
    );

    return () => {
      console.log(Date.now(), `Unsubscribe to movie #${id} details`);
      return unsubscribe();
    };
  }, [id, queryClient, webSocketClient]);

  return { isDeleted };
};
