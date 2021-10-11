import { NavigationContainer } from '@react-navigation/native';
import { GraphQLClient } from 'graphql-request';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { render, RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NetworkStatusProvider } from '@app/providers/NetworkStatusProvider';
import {
  GraphQLClientProvider,
  GraphQLClientState,
} from '@app/providers/GraphQLClientProvider';

export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        retry: false,
      },
    },
  });

  // Tests use local msw mock API server
  const testGraphQLEndpoint = 'http://localhost:3000/graphql';
  const graphQLClientTestState: GraphQLClientState = {
    graphQLClient: new GraphQLClient(testGraphQLEndpoint),
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <GraphQLClientProvider defaultState={graphQLClientTestState}>
        <QueryClientProvider client={queryClient}>
          <NetworkStatusProvider>
            <NavigationContainer>
              <PaperProvider>
                <React.Suspense fallback={null}>{children}</React.Suspense>
              </PaperProvider>
            </NavigationContainer>
          </NetworkStatusProvider>
        </QueryClientProvider>
      </GraphQLClientProvider>
    );
  };

  return wrapper;
}

function customRender(
  component: React.ReactElement<any>,
  options?: RenderOptions
) {
  return render(component, { wrapper: createWrapper(), ...options });
}

export * from '@testing-library/react-native';

export { customRender as render };
