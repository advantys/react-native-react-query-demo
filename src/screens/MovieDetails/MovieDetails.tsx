import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator, Title, useTheme } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';

import { useMovieDetails } from '@app/screens/hooks/useMovieDetails';
import { useMovieRatingsMutation } from '@app/screens/hooks/useMovieRatingsMutation';
import { MainStack } from '@app/navigation/types';
import { Paragraph } from '@app/components/Typography/Paragraph';
import { spacings } from '@app/styles/spacings';
import { useOnlineStatus } from '@app/providers/hooks/useOnlineStatus';
import { MovieDetailsFragment } from '@app/services/graphql';
import { useRefreshByUser } from '@app/hooks/useRefreshByUser';
import { Ratings } from '@app/components/Ratings';
import { MOVIE_DETAILS } from '@app/test/testIDs';

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
  const isOnline = useOnlineStatus();
  const { movie } = route.params;

  const { movieDetails, refetch } = useMovieDetails(movie);
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const movieInfo: MovieDetailsFragment = movieDetails ?? movie;
  const { mutateRatings: onRatingsPress } = useMovieRatingsMutation(movieInfo);

  return (
    <ScrollView
      refreshControl={
        isOnline ? (
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            tintColor={theme.colors.primary}
          />
        ) : undefined
      }
    >
      <View testID={MOVIE_DETAILS}>
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
            onPress={onRatingsPress}
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
