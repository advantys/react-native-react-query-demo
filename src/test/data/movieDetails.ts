import { MovieDetailsFragment } from '@app/services/graphql';

function generateMoviesDetails() {
  let movies: MovieDetailsFragment[] = [];
  for (let i = 1; i <= 30; i++) {
    movies.push({
      id: i,
      title: `movie ${i}`,
      ratings: 3,
      storyline: `storyline ${i}`,
      genre: `genre ${i}`,
    });
  }
  return movies;
}

export const moviesDetails = generateMoviesDetails();

export const MOVIE_ID_MUTATION_ERROR = 10;
