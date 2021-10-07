import { graphql } from 'msw';
import {
  MovieDetailsQuery,
  MovieDetailsQueryVariables,
} from '@app/services/graphql';
import { movie1 } from '@app/test/data/movieDetails';

export const movieDetailsQueryHandler = graphql.query<
  MovieDetailsQuery,
  MovieDetailsQueryVariables
>('movieDetailsQuery', (req, res, ctx) => {
  return res(
    ctx.data({
      movie: movie1,
    })
  );
});
