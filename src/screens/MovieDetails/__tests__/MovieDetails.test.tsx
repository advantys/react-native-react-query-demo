import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { QueryObserverResult } from 'react-query';
import * as movieDetailsHook from '@app/screens/hooks/useMovieDetails';
import * as onlineStatus from '@app/providers/hooks/useOnlineStatus';
import { render } from '@app/test/testUtils';
import {
  ERROR_SCREEN,
  MOVIE_DETAILS,
  STAR,
  STAR_OUTLINED,
} from '@app/test/testIDs';
import { movies } from '@app/test/data/movies';
import { movie1Details } from '@app/test/data/movieDetails';
import { MovieDetailsScreen } from '@app/screens/MovieDetails';
import { MovieDetailsQuery } from '@app/services/graphql';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        initialParams={{ movie: movies[0] }}
      />
    </Stack.Navigator>
  );
}

function Component() {
  return StackNavigator();
}

describe('MovieDetails component tests', () => {
  beforeEach(() => {
    // We need to restore the functions mocked with spyOn
    // for tests that need the actual function
    jest.restoreAllMocks();
  });

  it('Should display Movie details', async () => {
    const { queryByTestId, findByText, queryByText, queryAllByTestId } = render(
      <Component />
    );

    expect(queryByTestId(MOVIE_DETAILS)).not.toBeNull();

    // The title provided in the route params should be displayed
    expect(queryByText(movie1Details.title)).not.toBeNull();

    // wait for details to be fetched
    expect(await findByText(movie1Details.storyline as string)).not.toBeNull();
    expect(queryByText(movie1Details.genre as string)).not.toBeNull();

    // Check if Ratings stars are displayed
    expect(queryAllByTestId(STAR)).toHaveLength(movie1Details.ratings);
    expect(queryAllByTestId(STAR_OUTLINED)).toHaveLength(
      5 - movie1Details.ratings
    );
  });

  it('Should display Movie details when the API data are not available', async () => {
    // We mock useMovieDetails to return an undefined movie details
    jest.spyOn(movieDetailsHook, 'useMovieDetails').mockImplementation(() => {
      return {
        movieDetails: undefined,
        refetch: () =>
          new Promise<QueryObserverResult<MovieDetailsQuery, unknown>>(
            () => true
          ),
      };
    });
    const { queryByTestId, queryByText, queryAllByTestId } = render(
      <Component />
    );

    expect(queryByTestId(MOVIE_DETAILS)).not.toBeNull();

    // The title provided in the route params should be displayed
    expect(queryByText(movie1Details.title)).not.toBeNull();

    // Check if Ratings stars are displayed
    expect(queryAllByTestId(STAR)).toHaveLength(movie1Details.ratings);
    expect(queryAllByTestId(STAR_OUTLINED)).toHaveLength(
      5 - movie1Details.ratings
    );

    // Should not display other details from the API
    expect(queryByText(movie1Details.storyline as string)).toBeNull();
    expect(queryByText(movie1Details.genre as string)).toBeNull();
  });

  it('Should display the error screen if an exception is thrown', () => {
    // We mock useMovieDetails to throw an error
    jest.spyOn(movieDetailsHook, 'useMovieDetails').mockImplementation(() => {
      throw 'error';
    });
    const { queryByTestId } = render(<Component />);

    expect(queryByTestId(ERROR_SCREEN)).not.toBeNull();
  });

  it('Should enable the refresh control in offline mode', async () => {
    // We mock useOnlineStatus to simulate an offline mode
    jest.spyOn(onlineStatus, 'useOnlineStatus').mockImplementation(() => true);

    const { findByTestId } = render(<Component />);

    // Wait for the list to be loaded
    const moviesFlatList = await findByTestId(MOVIE_DETAILS);

    // In offline mode the refresh control is not available
    expect(moviesFlatList.props['refreshControl']).not.toBeUndefined();
  });

  it('Should not enable the refresh control in offline mode', async () => {
    // We mock useOnlineStatus to simulate an offline mode
    jest.spyOn(onlineStatus, 'useOnlineStatus').mockImplementation(() => false);

    const { findByTestId } = render(<Component />);

    // Wait for the list to be loaded
    const moviesFlatList = await findByTestId(MOVIE_DETAILS);

    // In offline mode the refresh control is not available
    expect(moviesFlatList.props['refreshControl']).toBeUndefined();
  });
});
