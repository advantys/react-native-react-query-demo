import { graphql } from 'msw';
import {
  UpdateMovieRatingsMutation,
  UpdateMovieRatingsMutationVariables,
} from '@app/services/graphql';
import { moviesDetails } from '@app/test/data/movieDetails';

export const updateMovieRatingsMutationHandler = graphql.mutation<
  UpdateMovieRatingsMutation,
  UpdateMovieRatingsMutationVariables
>('updateMovieRatingsMutation', (req, res, ctx) => {
  console.log(Date.now(), 'API', 'updateMovieRatingsMutation', req.variables);

  const newRatings = req.variables.ratings;
  const updateMovie = { ...moviesDetails[req.variables.id - 1], newRatings };

  return res(
    ctx.data({
      updateMovie,
    })
  );
});
