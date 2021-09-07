import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { spacings } from '@app/styles/spacings';

type Props = {
  isFetchingNextPage: boolean;
};

export function ListFooterComponent({ isFetchingNextPage }: Props) {
  if (!isFetchingNextPage) return null;

  return <ActivityIndicator style={styles.activityIndicator} />;
}

const styles = StyleSheet.create({
  activityIndicator: {
    paddingVertical: spacings.medium,
  },
});
