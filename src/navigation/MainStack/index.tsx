import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MoviesListScreen } from '@app/screens/MoviesList';
import type { MainStack as MainStackType } from '@app/navigation/types';
import { useHeaderStyles } from '@app/hooks/useHeaderStyles';
import { MovieDetailsScreen } from '@app/screens/MovieDetails';

const Stack = createStackNavigator<MainStackType>();

export function MainStack() {
  const headerOptionsStyles = useHeaderStyles();

  return (
    <Stack.Navigator
      initialRouteName="MoviesList"
      screenOptions={headerOptionsStyles}
    >
      <Stack.Screen
        name="MoviesList"
        component={MoviesListScreen}
        options={{
          headerTitle: 'Movies',
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{
          headerTitle: 'Movie details',
        }}
      />
    </Stack.Navigator>
  );
}
