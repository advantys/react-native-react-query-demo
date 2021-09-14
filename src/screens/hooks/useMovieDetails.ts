import { useMovieDetailsSubscription } from './useMovieDetailsSubscription';
import { useQueryStatusLogging } from '@app/hooks/useQueryStatusLogging';
import { MovieFragment, useMovieDetailsQuery } from '@app/services/graphql';
import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';

export function useMovieDetails(movie: MovieFragment) {
  const { graphQLClient } = useGraphQLClient();
  const id = movie.id;

  const queryInfo = useMovieDetailsQuery(
    graphQLClient,
    {
      id,
    },
    {
      initialData: { movie },
      suspense: false,
      useErrorBoundary: true,
      staleTime: Infinity,
      onSuccess: () => {
        console.log(Date.now(), `Fetching movie #${id} details succeed`);
      },
    }
  );

  useQueryStatusLogging(queryInfo, `movie #${id} details`);

  const { isDeleted } = useMovieDetailsSubscription(id);

  return {
    movieDetails: queryInfo.data?.movie,
    isDeleted,
  };
}
