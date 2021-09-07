import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import { MovieDetails } from './MovieDetails';
import { LoadingScreen } from '@app/components/LoadingScreen';
import { Layout } from '@app/components/Layout';
import { ErrorScreen } from '@app/components/ErrorScreen';

type Props = React.ComponentProps<typeof MovieDetails>;

export function MovieDetailsScreen(props: Props) {
  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={(props) => (
              <ErrorScreen {...props} message={'Error loading movie details'} />
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<LoadingScreen />}>
              <MovieDetails {...props} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
