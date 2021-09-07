import { queryClient } from '@app/services/queryClient';
import { MovieFragment } from '@app/services/graphql';

type MoviesQueryPaginatedData =
  | {
      pageParams: number[];
      pages: { movies: MovieFragment[] }[];
    }
  | undefined;

export function setMoviesQueryData(updatedMovie: {
  id: number;
  ratings?: number | null;
}) {
  queryClient.setQueryData<MoviesQueryPaginatedData>(
    'moviesQuery',
    (oldData) => {
      console.log(Date.now(), 'setMoviesQueryData');

      // Nothing to update
      if (!oldData) {
        return undefined;
      }

      // Update the movie in the movies list
      const newDataPages = oldData.pages.map((page) => ({
        movies: page.movies.map((movie) =>
          movie.id == updatedMovie.id
            ? { ...movie, ratings: updatedMovie.ratings ?? 0 }
            : movie
        ),
      }));

      return { pageParams: oldData.pageParams, pages: newDataPages };
    }
  );
}
