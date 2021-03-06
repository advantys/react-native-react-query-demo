import { graphql } from 'msw';
import {
  MovieFragment,
  MoviesQuery,
  MoviesQueryVariables,
} from '@app/services/graphql';
import { movies } from '@app/test/data/movies';

export const moviesQueryHandler = graphql.query<
  MoviesQuery,
  MoviesQueryVariables
>('moviesQuery', (req, res, ctx) => {
  console.log(Date.now(), 'API', 'moviesQuery', req.variables);

  const limit = req.variables.limit;
  const offset = req.variables.offset || 0;

  // Pagination management
  let result: MovieFragment[] = [];
  if (offset == 0) {
    result = movies.slice(offset, limit);
  } else {
    result =
      offset > movies.length
        ? []
        : movies.slice(offset - 1, offset + limit - 1);
  }

  return res(
    ctx.data({
      movies: result,
    })
  );
});
