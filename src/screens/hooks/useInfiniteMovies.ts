import { useInfiniteQuery } from '@tanstack/react-query';

import { useQueryStatusLogging } from '@app/hooks/useQueryStatusLogging';
import {
  MovieFragment,
  MoviesQuery,
  MoviesQueryDocument,
  MoviesQueryVariables,
} from '@app/services/graphql';
import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';

export function useInfiniteMovies() {
  const { graphQLClient } = useGraphQLClient();

  const pageSize = 20;

  const queryInfo = useInfiniteQuery(
    ['moviesQuery'],
    ({ pageParam }) => {
      console.log(
        Date.now(),
        'Fetch movies page #',
        pageParam ? pageParam + 1 : 1
      );
      return graphQLClient.request<MoviesQuery, MoviesQueryVariables>(
        MoviesQueryDocument,
        {
          offset: pageParam ? pageParam * pageSize + 1 : 0,
          limit: pageSize,
        }
      );
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.movies.length < pageSize) {
          return undefined;
        }
        return allPages.length;
      },
      onSuccess: () => {
        console.log(Date.now(), 'Fetching movies succeed');
      },
      // Polling demo
      // refetchInterval: 3000,
    }
  );

  useQueryStatusLogging(queryInfo, `movies`);

  const movies = queryInfo.data?.pages.reduce<Array<MovieFragment | null>>(
    (prev: Array<MovieFragment | null>, curr) => {
      return [...prev, ...curr.movies];
    },
    []
  );

  return {
    ...queryInfo,
    movies,
  };
}
