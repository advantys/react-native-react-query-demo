import { MovieFragment } from '@app/services/graphql';

export type MainStack = {
  MoviesList: undefined;
  MovieDetails: {
    movie: MovieFragment;
  };
};
