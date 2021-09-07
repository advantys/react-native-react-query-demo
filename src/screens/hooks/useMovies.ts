import { useQueryStatusLogging } from '@app/hooks/useQueryStatusLogging';
import { useMoviesQuery } from '@app/services/graphql';
import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';

export function useMovies() {
  const { graphQLClient } = useGraphQLClient();

  const queryInfo = useMoviesQuery(
    graphQLClient,
    {
      limit: 30,
    },
    {
      onSuccess: () => {
        console.log(Date.now(), 'Fetching movies succeed');
      },
      // Polling
      //refetchInterval: 3000,
    }
  );

  useQueryStatusLogging(queryInfo, `movies`);

  return {
    movies: queryInfo.data?.movies,
    refetch: queryInfo.refetch,
  };
}
