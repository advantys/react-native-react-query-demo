import { setMoviesQueryData } from '@app/screens/utils/setMoviesQueryData';
import {
  MovieFragment,
  useUpdateMovieRatingsMutation,
} from '@app/services/graphql';
import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';
import { queryClient } from '@app/services/queryClient';

export function useUpdateMovieRatings() {
  const { graphQLClient } = useGraphQLClient();

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

      // Get the previous movies data data
      const previousMovies = queryClient.getQueryData<{ movie: MovieFragment }>(
        ['movies']
      );

      // Optimistic udpate for the Movies list
      setMoviesQueryData(updatedMovie);

      // Return a context that can be use in onError
      return { previousMovie, previousMovies, updatedMovie };
    },
    onSuccess: (data) => {
      const id = data.updateMovie?.id;
      console.log(Date.now(), 'Movie #', id, 'onSuccess');
    },
    onError: (err, updatedMovie, context: any) => {
      console.log(Date.now(), 'Movie #', updatedMovie.id, 'onError', err);

      // Rollback to previous movie details data
      queryClient.setQueryData(
        ['movieDetailsQuery', { id: updatedMovie.id }],
        context.previousMovie
      );

      // Rollback to previous movies list data
      setMoviesQueryData(context.previousMovies);
    },
  });

  return mutation;
}
