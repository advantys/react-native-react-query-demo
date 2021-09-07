import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { useMovies } from '@app/screens/hooks/useMovies';
import { Divider } from '@app/components/Divider';
import { MainStack } from '@app/navigation/types';
import { ListItem, LIST_ITEM_HEIGHT } from '@app/components/ListItem';
import { LIST_LEFT_SPACING } from '@app/styles/constants';
import { MovieFragment } from '@app/services/graphql';
import { useOnlineStatus } from '@app/providers/hooks/useOnlineStatus';
import { useRefreshOnFocus } from '@app/hooks/useRefreshOnFocus';
import { useRefreshByUser } from '@app/hooks/useRefreshByUser';

type MoviesListScreenNavigationProp = StackNavigationProp<
  MainStack,
  'MoviesList'
>;

type Props = {
  navigation: MoviesListScreenNavigationProp;
};

export function MoviesList({ navigation }: Props) {
  const theme = useTheme();
  const isOnline = useOnlineStatus();

  const { movies, refetch } = useMovies();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onListItemPress = React.useCallback(
    (movie: MovieFragment) => {
      navigation.navigate('MovieDetails', {
        movie,
      });
    },
    [navigation]
  );

  const renderItem = React.useCallback(
    ({ item }: { item: MovieFragment }) => {
      return <ListItem item={item} onPress={onListItemPress} />;
    },
    [onListItemPress]
  );

  return (
    <View style={[styles.fill]}>
      <FlatList
        refreshControl={
          isOnline ? (
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
              tintColor={theme.colors.primary}
            />
          ) : undefined
        }
        data={movies}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={renderItem}
        style={[
          styles.fill,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
        ItemSeparatorComponent={() => (
          <Divider
            style={{
              marginLeft: LIST_LEFT_SPACING,
            }}
          />
        )}
        getItemLayout={(_data, index) => ({
          length: LIST_ITEM_HEIGHT,
          offset: LIST_ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
