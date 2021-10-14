import { MovieFragment } from '@app/services/graphql';

function generateMovies() {
  let movies: MovieFragment[] = [];
  for (let i = 1; i <= 30; i++) {
    movies.push({
      id: i,
      title: `movie ${i}`,
      ratings: 3,
    });
  }
  return movies;
}

export const movies = generateMovies();
