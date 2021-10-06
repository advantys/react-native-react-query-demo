import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { render } from '@app/test/testUtils';
import { MoviesListScreen } from '@app/screens/MoviesList';
import {
  LIST_ITEM,
  LOADING_SCREEN,
  MOVIES_LIST,
  STAR,
  STAR_OUTLINED,
} from '@app/test/testIDs';
import { movies } from '@app/test/data/movies';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoviesList" component={MoviesListScreen} />
    </Stack.Navigator>
  );
}

function Component() {
  return StackNavigator();
}

describe('MoviesList component tests', () => {
  it('Should display Movies list', async () => {
    const { queryAllByTestId, queryByTestId, findByTestId, queryByText } =
      render(<Component />);

    // The loading screen should appear
    expect(queryByTestId(LOADING_SCREEN)).not.toBeNull();

    // When the data are fetched the movies list should be displayed
    expect(await findByTestId(MOVIES_LIST)).not.toBeNull();

    // The loading screen should disapear when the items are fetched
    expect(queryByTestId(LOADING_SCREEN)).toBeNull();

    // Check list size
    expect(queryAllByTestId(LIST_ITEM)).toHaveLength(movies.length);

    // Check list items
    movies.forEach((movie) => {
      expect(queryByText(`#${movie.id}`)).not.toBeNull();
      expect(queryByText(movie.title)).not.toBeNull();
    });

    // Check if Ratings stars are displayed
    const starsCount = movies.reduce(
      (total, movie) => total + movie.ratings,
      0
    );
    const outlinedStarsCount = 5 * movies.length - starsCount;

    expect(queryAllByTestId(STAR)).toHaveLength(starsCount);
    expect(queryAllByTestId(STAR_OUTLINED)).toHaveLength(outlinedStarsCount);
  });
});
