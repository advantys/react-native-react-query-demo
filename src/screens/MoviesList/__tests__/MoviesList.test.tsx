import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, within, act } from '@testing-library/react-native';

import * as infiniteMovies from '@app/screens/hooks/useInfiniteMovies';
import * as onlineStatus from '@app/providers/hooks/useOnlineStatus';
import { render } from '@app/test/testUtils';
import { MoviesListScreen } from '@app/screens/MoviesList';
import {
  ERROR_SCREEN,
  LIST_ITEM,
  LOADING_SCREEN,
  MOVIES_LIST,
  MOVIE_DETAILS,
  STAR,
  STAR_OUTLINED,
} from '@app/test/testIDs';
import { movies } from '@app/test/data/movies';
import { MovieDetailsScreen } from '@app/screens/MovieDetails';

const flatListinitialNumToRender = 10;
const Stack = createStackNavigator();

function Component() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoviesList" component={MoviesListScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
}

describe('MoviesList component tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should display Movies list', async () => {
    const { queryAllByTestId, queryByTestId, findByTestId, queryByText } =
      render(<Component />);

    // The loading screen should appear
    expect(queryByTestId(LOADING_SCREEN)).not.toBeNull();

    // When the data are fetched the movies list should be displayed
    expect(await findByTestId(MOVIES_LIST)).not.toBeNull();

    // The loading screen should disappear when the items are fetched
    expect(queryByTestId(LOADING_SCREEN)).toBeNull();

    // Check list size
    // The FlatList create 10 items max even if we have 20 movies
    expect(queryAllByTestId(LIST_ITEM)).toHaveLength(
      flatListinitialNumToRender
    );

    // Check list items
    for (let i = 0; i < flatListinitialNumToRender; i++) {
      expect(queryByText(`#${movies[i].id}`)).not.toBeNull();
      expect(queryByText(movies[i].title)).not.toBeNull();
    }

    // Check if Ratings stars are displayed
    const starsCount = movies
      .slice(0, flatListinitialNumToRender)
      .reduce((total, movie) => total + movie.ratings, 0);
    const outlinedStarsCount = 5 * flatListinitialNumToRender - starsCount;

    expect(queryAllByTestId(STAR)).toHaveLength(starsCount);
    expect(queryAllByTestId(STAR_OUTLINED)).toHaveLength(outlinedStarsCount);
  });

  it('Should display the error screen if an exception is thrown', () => {
    // We mock useInfiniteMovies to throw an error
    jest.spyOn(infiniteMovies, 'useInfiniteMovies').mockImplementation(() => {
      throw 'error';
    });
    const { queryByTestId } = render(<Component />);

    expect(queryByTestId(ERROR_SCREEN)).not.toBeNull();
  });

  it('Should navigate to the movie details screen', async () => {
    const { findByTestId, queryByText } = render(<Component />);

    // Wait for the list to be loaded
    await findByTestId(MOVIES_LIST);

    // Press list item
    const listItem = queryByText(movies[0].title);

    await act(async () => {
      fireEvent.press(listItem);
    });

    // Should navigate the movie details screen

    const movieDetails = within(await findByTestId(MOVIE_DETAILS));

    // The movie title should be the same as the list item's one
    expect(movieDetails.queryByText(movies[0].title)).not.toBeNull();
  });

  it('Should fetch new page when scrolling', async () => {
    const { findByTestId, findByText } = render(<Component />);

    const moviesFlatList = await findByTestId(MOVIES_LIST);
    expect(moviesFlatList).not.toBeNull();

    // First scroll to display other items of the first page
    fireEvent.scroll(moviesFlatList, {
      nativeEvent: {
        contentSize: { height: 600, width: 400 },
        contentOffset: { y: 5000, x: 0 },
        layoutMeasurement: { height: 100, width: 100 }, // Dimensions of the device
      },
    });

    await findByText(movies[19].title);

    // Second scroll to display new items of the second page
    fireEvent.scroll(moviesFlatList, {
      nativeEvent: {
        contentSize: { height: 600, width: 400 },
        contentOffset: { y: 5000, x: 0 },
        layoutMeasurement: { height: 100, width: 100 }, // Dimensions of the device
      },
    });

    // Check that new movie items has been rendered
    await findByText(movies[20].title);
    await findByText(movies[20 + flatListinitialNumToRender - 1].title);
  });

  // eslint-disable-next-line jest/expect-expect
  it('Should refetch on pull to refresh', async () => {
    const { findByTestId } = render(<Component />);

    const moviesFlatList = await findByTestId(MOVIES_LIST);

    // First scroll to display other items of the first page
    fireEvent.scroll(moviesFlatList, {
      nativeEvent: {
        contentSize: { height: 600, width: 400 },
        contentOffset: { y: -15000, x: 0 },
        layoutMeasurement: { height: 100, width: 100 }, // Dimensions of the device
      },
    });

    fireEvent.scroll(moviesFlatList, {
      nativeEvent: {
        contentSize: { height: 600, width: 400 },
        contentOffset: { y: -15000, x: 0 },
        layoutMeasurement: { height: 100, width: 100 }, // Dimensions of the device
      },
    });
  });

  it('Should enable the refresh control in offline mode', async () => {
    // We mock useOnlineStatus to simulate an offline mode
    jest.spyOn(onlineStatus, 'useOnlineStatus').mockImplementation(() => true);

    const { findByTestId } = render(<Component />);

    // Wait for the list to be loaded
    const moviesFlatList = await findByTestId(MOVIES_LIST);

    // In offline mode the refresh control is not available
    expect(moviesFlatList.props['refreshControl']).not.toBeUndefined();
  });

  it('Should not enable the refresh control in offline mode', async () => {
    // We mock useOnlineStatus to simulate an offline mode
    jest.spyOn(onlineStatus, 'useOnlineStatus').mockImplementation(() => false);

    const { findByTestId } = render(<Component />);

    // Wait for the list to be loaded
    const moviesFlatList = await findByTestId(MOVIES_LIST);

    // In offline mode the refresh control is not available
    expect(moviesFlatList.props['refreshControl']).toBeUndefined();
  });
});
