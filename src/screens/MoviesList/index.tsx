import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import { MoviesList } from './MoviesList';
import type { MainStack as MainStackType } from '@app/navigation/types';
import { LoadingScreen } from '@app/components/LoadingScreen';
import { Layout } from '@app/components/Layout';
import { ErrorScreen } from '@app/components/ErrorScreen';

type MoviesListScreenNavigationProp = StackNavigationProp<
  MainStackType,
  'MoviesList'
>;

type Props = {
  navigation: MoviesListScreenNavigationProp;
};

export function MoviesListScreen(props: Props) {
  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={(props) => (
              <ErrorScreen {...props} message={'Error loading list items'} />
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<LoadingScreen />}>
              <MoviesList {...props} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
