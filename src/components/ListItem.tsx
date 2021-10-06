import Color from 'color';
import React from 'react';
import { PixelRatio, StyleSheet, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';

import { Ratings } from './Ratings';
import { Paragraph } from '@app/components/Typography/Paragraph';
import { Subheading } from '@app/components/Typography/Subheading';
import { roundness } from '@app/styles/roundness';
import { spacings } from '@app/styles/spacings';
import { LIST_LEFT_SPACING } from '@app/styles/constants';
import { MovieFragment } from '@app/services/graphql';
import { LIST_ITEM } from '@app/test/testIDs';

type Props = {
  item?: MovieFragment | null;
  onPress: (movie: MovieFragment) => void;
};

export function ListItem({ item, onPress }: Props) {
  const theme = useTheme();

  if (!item) return null;

  const blueBackground = Color(theme.colors.primary).fade(0.85).toString();

  return (
    <TouchableRipple
      onPress={() => onPress(item)}
      accessibilityRole="button"
      testID={LIST_ITEM}
    >
      <View style={styles.innerWrapper}>
        <View style={styles.topRow}>
          <View
            style={[
              styles.movieIdContainer,
              {
                backgroundColor: blueBackground,
              },
            ]}
          >
            <Subheading
              style={[theme.fonts.medium, { color: theme.colors.primary }]}
            >
              #{item.id}
            </Subheading>
          </View>
        </View>
        <View style={styles.secondRow}>
          <Paragraph
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.title, theme.fonts.medium]}
          >
            {item.title}
          </Paragraph>
          <Ratings value={item.ratings} size={18} />
        </View>
      </View>
    </TouchableRipple>
  );
}

const fontScale = PixelRatio.getFontScale();

export const LIST_ITEM_HEIGHT = 100 * fontScale;

const styles = StyleSheet.create({
  innerWrapper: {
    flexDirection: 'column',
    paddingRight: spacings.large,
    paddingLeft: LIST_LEFT_SPACING,
    height: LIST_ITEM_HEIGHT,
    paddingTop: spacings.large * fontScale,
    paddingBottom: spacings.medium * fontScale,
    marginBottom: spacings.xSmall,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacings.xSmall * fontScale,
  },
  movieIdContainer: {
    borderRadius: roundness.medium,
    marginRight: spacings.small,
    paddingHorizontal: spacings.small,
  },
  secondRow: {
    flexDirection: 'row',
    marginBottom: -spacings.xxSmall * fontScale,
    marginTop: spacings.xSmall,
  },
  title: {
    flex: 1,
  },
});
