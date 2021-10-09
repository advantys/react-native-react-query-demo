import { graphql } from 'msw';
import {
  UpdateMovieRatingsMutation,
  UpdateMovieRatingsMutationVariables,
} from '@app/services/graphql';
import {
  moviesDetails,
  MOVIE_ID_MUTATION_ERROR,
} from '@app/test/data/movieDetails';

export const updateMovieRatingsMutationHandler = graphql.mutation<
  UpdateMovieRatingsMutation,
  UpdateMovieRatingsMutationVariables
>('updateMovieRatingsMutation', (req, res, ctx) => {
  console.log(Date.now(), 'API', 'updateMovieRatingsMutation', req.variables);

  // Simulate a GraphQL mutation error for movie #10
  if (req.variables.id === MOVIE_ID_MUTATION_ERROR) {
    return res(ctx.errors([{ message: 'mutation error test' }]));
  }

  // Simulate the mutation
  const newRatings = req.variables.ratings;
  const updateMovie = { ...moviesDetails[req.variables.id - 1], newRatings };

  return res(
    ctx.data({
      updateMovie,
    })
  );
});
