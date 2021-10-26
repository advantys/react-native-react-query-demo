import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryObserverResult } from 'react-query';
import { graphql } from 'msw';

import * as movieDetailsHook from '@app/screens/hooks/useMovieDetails';
import * as onlineStatus from '@app/providers/hooks/useOnlineStatus';
import { render, fireEvent, waitFor } from '@app/test/testUtils';
import {
  ERROR_SCREEN,
  MOVIE_DETAILS,
  RATINGS,
  RATINGS_UPDATED,
  STAR,
  STAR_OUTLINED,
} from '@app/test/testIDs';
import { movies } from '@app/test/data/movies';
import { moviesDetails } from '@app/test/data/movieDetails';
import { MovieDetailsScreen } from '@app/screens/MovieDetails';
import {
  MovieDetailsQuery,
  UpdateMovieRatingsMutation,
  UpdateMovieRatingsMutationVariables,
} from '@app/services/graphql';
import { server } from '@app/test/server';

const Stack = createStackNavigator();

function Component() {
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
    expect(queryByText(moviesDetails[0].title)).not.toBeNull();

    // wait for details to be fetched
    expect(
      await findByText(moviesDetails[0].storyline as string)
    ).not.toBeNull();
    expect(queryByText(moviesDetails[0].genre as string)).not.toBeNull();

    // Check if Ratings stars are displayed
    expect(queryAllByTestId(STAR)).toHaveLength(moviesDetails[0].ratings);
    expect(queryAllByTestId(STAR_OUTLINED)).toHaveLength(
      5 - moviesDetails[0].ratings
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
    expect(queryByText(moviesDetails[0].title)).not.toBeNull();

    // Check if Ratings stars are displayed
    expect(queryAllByTestId(STAR)).toHaveLength(moviesDetails[0].ratings);
    expect(queryAllByTestId(STAR_OUTLINED)).toHaveLength(
      5 - moviesDetails[0].ratings
    );

    // Should not display other details from the API
    expect(queryByText(moviesDetails[0].storyline as string)).toBeNull();
    expect(queryByText(moviesDetails[0].genre as string)).toBeNull();
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

  it('Should optimistically update the ratings', async () => {
    const { queryAllByTestId, findByTestId, getByA11yLabel, queryByTestId } =
      render(<Component />);

    expect(queryByTestId(RATINGS)).not.toBeNull();
    expect(queryAllByTestId(STAR).length).toBe(3);

    // There are 3 stars filled (ratings equals 3 for movie #1)
    // Press on the first star
    fireEvent.press(getByA11yLabel('star #1 star'));

    // Should optimistically update the ratings immediatly
    // So only 1 filled star is expected
    await waitFor(async () => expect(queryAllByTestId(STAR).length).toBe(1));

    // Should update the ratings from the API value
    expect(await findByTestId(RATINGS_UPDATED)).not.toBeNull();
    expect(queryAllByTestId(STAR).length).toBe(1);
  });

  it('Should optimistically update the ratings and rollback if the API call fails', async () => {
    const { queryAllByTestId, getByA11yLabel, queryByTestId } = render(
      <Component />
    );

    expect(queryByTestId(RATINGS)).not.toBeNull();
    expect(queryAllByTestId(STAR).length).toBe(3);

    // Mock the API mutation to throw a GraphQL error
    server.use(
      graphql.mutation<
        UpdateMovieRatingsMutation,
        UpdateMovieRatingsMutationVariables
      >('updateMovieRatingsMutation', (req, res, ctx) => {
        console.log(
          Date.now(),
          'API',
          'updateMovieRatingsMutation',
          'throw error',
          req.variables
        );
        return res(ctx.errors([{ message: 'mutation error test' }]));
      })
    );

    // There are 3 stars filled (ratings equals 3 for movie #1)
    expect(queryAllByTestId(STAR).length).toBe(3);

    // Press on the first star
    fireEvent.press(getByA11yLabel('star #1 star'));

    // Should optimistically update the ratings
    // So only 1 filled star is expected
    await waitFor(() => expect(queryAllByTestId(STAR).length).toBe(1), {
      interval: 5, // For Apple Silicon!
    });

    // Should rollback the ratings from the initial value
    // because of the GraphQL error
    await waitFor(() => expect(queryAllByTestId(STAR).length).toBe(3));
  });

  it('Should reset the ratings to 0 when clicking the current ratings star', async () => {
    const { queryAllByTestId, findByTestId, getByA11yLabel, queryByTestId } =
      render(<Component />);

    expect(queryByTestId(RATINGS)).not.toBeNull();
    expect(queryAllByTestId(STAR).length).toBe(3);

    // There are 3 stars filled (ratings equals 3 for movie #1)
    // Press on the third star
    fireEvent.press(getByA11yLabel('star #3 star'));

    // Should optimistically update the ratings immediatly
    // The ratings are reset to 0
    await waitFor(async () => expect(queryAllByTestId(STAR).length).toBe(0));

    // Should update the ratings from the API value
    expect(await findByTestId(RATINGS_UPDATED)).not.toBeNull();
    expect(queryAllByTestId(STAR).length).toBe(0);
  });
});
