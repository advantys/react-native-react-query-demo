import React from 'react';

import { useUpdateMovieRatings } from '@app/screens/hooks/useUpdateMovieRatings';
import { MovieFragment } from '@app/services/graphql';

export function useMovieRatingsMutation(movie: MovieFragment) {
  const ratingsMutation = useUpdateMovieRatings();

  const mutateRatings = React.useCallback(
    async (index: number) => {
      const ratings = index === movie.ratings ? 0 : index;
      console.log(Date.now(), 'Movie #', movie.id, 'mutateRatings', ratings);
      await ratingsMutation.mutateAsync({ id: movie.id, ratings });
    },
    [movie, ratingsMutation]
  );

  return { mutateRatings };
}
