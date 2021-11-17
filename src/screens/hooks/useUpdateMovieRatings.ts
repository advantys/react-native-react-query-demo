import { useQueryClient } from 'react-query';

import {
  MovieFragment,
  useUpdateMovieRatingsMutation,
} from '@app/services/graphql';
import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';

export function useUpdateMovieRatings() {
  const { graphQLClient } = useGraphQLClient();
  const queryClient = useQueryClient();

  const mutation = useUpdateMovieRatingsMutation(graphQLClient, {
    onMutate: async (updatedMovie) => {
      console.log(Date.now(), 'Movie #', updatedMovie.id, 'onMutate');

      // Cancel on-going fetching
      await queryClient.cancelQueries([
        'movieDetailsQuery',
        { id: updatedMovie.id },
      ]);

      // Get the previous movie details data
      const previousMovie = queryClient.getQueryData<{ movie: MovieFragment }>([
        'movieDetailsQuery',
        { id: updatedMovie.id },
      ]);

      // Optimistic udpate for the Movie details
      queryClient.setQueryData(['movieDetailsQuery', { id: updatedMovie.id }], {
        movie: { ...previousMovie?.movie, ratings: updatedMovie.ratings },
      });

      // Return a context that can be use in onError
      return { previousMovie, updatedMovie };
    },
    onSuccess: (data) => {
      const id = data.updateMovie?.id;
      console.log(Date.now(), 'Movie #', id, 'update succeed');
      queryClient.invalidateQueries('moviesQuery.infinite');
    },
    onError: (err, updatedMovie, context: any) => {
      console.log(Date.now(), 'Movie #', updatedMovie.id, 'update error', err);

      // Rollback to previous movie details data
      queryClient.setQueryData(
        ['movieDetailsQuery', { id: updatedMovie.id }],
        context.previousMovie
      );
    },
  });

  return mutation;
}
