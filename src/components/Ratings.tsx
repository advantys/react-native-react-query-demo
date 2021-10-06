import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { STAR_OUTLINED, STAR } from '@app/test/testIDs';

const Star = (
  index: number,
  name: 'star' | 'star-outlined',
  size: number,
  color?: string,
  onPress?: (index: number) => void
) => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback
      key={index}
      testID={name == 'star' ? STAR : STAR_OUTLINED}
      onPress={() => onPress?.(index)}
    >
      <Entypo
        key={index}
        name={name}
        size={size}
        color={color || theme.colors.accent}
      />
    </TouchableWithoutFeedback>
  );
};

type Props = {
  value: number;
  size: number;
  color?: string;
  onPress?: (index: number) => void;
};

export function Ratings({ value, size, color, onPress }: Props) {
  const stars = [];

  for (var i = 1; i <= 5; i++) {
    stars.push(
      Star(i, i > value ? 'star-outlined' : 'star', size, color, onPress)
    );
  }

  return <View style={styles.stars}>{stars}</View>;
}

const styles = StyleSheet.create({
  stars: {
    flexDirection: 'row',
  },
});
