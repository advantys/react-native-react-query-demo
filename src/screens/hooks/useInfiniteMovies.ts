import { useQueryStatusLogging } from '@app/hooks/useQueryStatusLogging';
import { MovieFragment, useInfiniteMoviesQuery } from '@app/services/graphql';
import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';

export function useInfiniteMovies() {
  const { graphQLClient } = useGraphQLClient();
  const pageSize = 20;

  const queryInfo = useInfiniteMoviesQuery(
    'offset',
    graphQLClient,
    {
      offset: 0,
      limit: pageSize,
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.movies.length < pageSize) {
          return undefined;
        }
        return { offset: allPages.length * pageSize + 1 };
      },
      onSuccess: () => {
        console.log(Date.now(), 'Fetching movies succeed');
      },
      // Polling demo
      // refetchInterval: 3000,
    }
  );

  useQueryStatusLogging(queryInfo, `movies`);

  const movies = queryInfo.data?.pages.reduce<Array<MovieFragment>>(
    (prev: Array<MovieFragment>, curr) => {
      return [...prev, ...curr.movies];
    },
    []
  );

  return {
    ...queryInfo,
    movies,
  };
}
