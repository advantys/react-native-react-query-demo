import React from 'react';
import { render, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { useRefreshOnFocus } from '@app/hooks/useRefreshOnFocus';

describe('useRefreshOnFocus status hook tests', () => {
  it('Should return call the refetch function on the second screen focus', async () => {
    const refetchSpy = jest.fn();

    const TestScreen1 = () => {
      useRefreshOnFocus(refetchSpy);
      return null;
    };

    const TestScreen2 = () => null;

    const navigation = React.createRef<any>();
    const Stack = createStackNavigator();

    const Container = () => {
      return (
        <NavigationContainer ref={navigation}>
          <Stack.Navigator>
            <Stack.Screen name="screen1" component={TestScreen1} />
            <Stack.Screen name="screen2" component={TestScreen2} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    };

    render(<Container />);

    // Should not refetch on the first screen1 focus
    expect(refetchSpy).not.toHaveBeenCalled();

    await act(async () => navigation.current.navigate('screen2'));

    // Should refetch on the second screen1 focus
    await act(async () => navigation.current.navigate('screen1'));
    expect(refetchSpy).toHaveBeenCalled();
  });
});
