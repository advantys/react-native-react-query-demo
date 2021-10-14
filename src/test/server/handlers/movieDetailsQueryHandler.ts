import { graphql } from 'msw';
import {
  MovieDetailsQuery,
  MovieDetailsQueryVariables,
} from '@app/services/graphql';
import { moviesDetails } from '@app/test/data/movieDetails';

export const movieDetailsQueryHandler = graphql.query<
  MovieDetailsQuery,
  MovieDetailsQueryVariables
>('movieDetailsQuery', (req, res, ctx) => {
  console.log(Date.now(), 'API', 'movieDetailsQuery', req.variables);

  return res(
    ctx.data({
      movie: moviesDetails[req.variables.id - 1],
    })
  );
});
