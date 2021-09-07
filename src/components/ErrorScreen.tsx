import React from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { Paragraph } from './Typography/Paragraph';
import { spacings } from '@app/styles/spacings';

type Props = FallbackProps & {
  message?: string;
};

export function ErrorScreen({ error, message, resetErrorBoundary }: Props) {
  const errorMessage = message || error.message;

  return (
    <View style={styles.container}>
      <Paragraph style={styles.errorMessage}>{errorMessage}</Paragraph>
      <Button mode="contained" onPress={resetErrorBoundary} uppercase={false}>
        Retry
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    marginBottom: spacings.large,
  },
});
