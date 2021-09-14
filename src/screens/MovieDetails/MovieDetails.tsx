import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ActivityIndicator,
  Title,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { useMovieDetails } from '@app/screens/hooks/useMovieDetails';
import { useMovieRatingsMutation } from '@app/screens/hooks/useMovieRatingsMutation';
import { MainStack } from '@app/navigation/types';
import { Paragraph } from '@app/components/Typography/Paragraph';
import { spacings } from '@app/styles/spacings';
import { MovieDetailsFragment } from '@app/services/graphql';
import { Ratings } from '@app/components/Ratings';

type MovieDetailsScreenNavigationProp = StackNavigationProp<
  MainStack,
  'MovieDetails'
>;

type Props = {
  navigation: MovieDetailsScreenNavigationProp;
  route: RouteProp<MainStack, 'MovieDetails'>;
};

export function MovieDetails({ route }: Props) {
  const theme = useTheme();
  const { movie } = route.params;

  const { movieDetails, isDeleted } = useMovieDetails(movie);
  const movieInfo: MovieDetailsFragment = movieDetails ?? movie;

  const { mutateRatings: onRatingsPress } = useMovieRatingsMutation(movieInfo);

  return (
    <>
      <ScrollView>
        <View>
          <View style={styles.rowAlign}>
            <Title style={[{ color: theme.colors.accent }]}>
              {movieInfo.title}
            </Title>
          </View>
          <View style={styles.ratingsRow}>
            <Ratings
              value={movieInfo.ratings}
              size={26}
              color={theme.colors.primary}
              onPress={!isDeleted ? onRatingsPress : () => {}}
            />
          </View>
          {!movieDetails?.storyline ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <>
              <View style={styles.rowAlign}>
                <Paragraph style={[{ color: theme.colors.text }]}>
                  {movieInfo.storyline}
                </Paragraph>
              </View>
              <View style={styles.rowAlign}>
                <Paragraph style={[{ color: theme.colors.info }]}>
                  {movieInfo.genre}
                </Paragraph>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <Snackbar
        visible={isDeleted}
        onDismiss={() => {}}
        style={[{ backgroundColor: theme.colors.primary }]}
      >
        The movie has been deleted.
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  rowAlign: {
    flexDirection: 'row',
    marginLeft: spacings.xxLarge,
    marginTop: spacings.xxLarge,
    marginRight: spacings.large,
  },
  ratingsRow: {
    flexDirection: 'row',
    marginLeft: spacings.xxLarge,
    marginTop: spacings.medium,
  },
  activityIndicator: {
    paddingVertical: spacings.xxLarge,
  },
});
