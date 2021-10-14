import { moviesQueryHandler } from './moviesQueryHandler';
import { movieDetailsQueryHandler } from './movieDetailsQueryHandler';
import { updateMovieRatingsMutationHandler } from './updateMovieRatingsMutationHandler';

export const handlers = [
  moviesQueryHandler,
  movieDetailsQueryHandler,
  updateMovieRatingsMutationHandler,
];
