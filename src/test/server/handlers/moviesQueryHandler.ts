import { graphql } from 'msw';
import { MoviesQuery, MoviesQueryVariables } from '@app/services/graphql';
import { movies } from '@app/test/data/movies';

export const moviesQueryHandler = graphql.query<
  MoviesQuery,
  MoviesQueryVariables
>('moviesQuery', (req, res, ctx) => {
  return res(
    ctx.data({
      movies,
    })
  );
});
