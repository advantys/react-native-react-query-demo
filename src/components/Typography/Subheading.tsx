import React from 'react';
import { StyleSheet } from 'react-native';
import { Subheading as PaperSubheading } from 'react-native-paper';

export function Subheading(
  props: React.ComponentProps<typeof PaperSubheading>
) {
  return <PaperSubheading {...props} style={[props.style, styles.text]} />;
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.2,
  },
});
