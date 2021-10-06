import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { LOADING_SCREEN, ACTIVITY_INDICATOR } from '@app/test/testIDs';

export function LoadingScreen() {
  const theme = useTheme();

  return (
    <View
      testID={LOADING_SCREEN}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        testID={ACTIVITY_INDICATOR}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
