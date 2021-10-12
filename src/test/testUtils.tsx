import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GraphQLClient } from 'graphql-request';
import { Provider as PaperProvider } from 'react-native-paper';
import { render, RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ColorSchemeName } from 'react-native';

import { ThemeModeProvider } from '@app/providers/ThemeModeProvider';
import type { ThemeModes } from '@app/hooks/useThemeState';
import { DarkTheme, DefaultTheme } from '@app/styles/themes';
import { NetworkStatusProvider } from '@app/providers/NetworkStatusProvider';
import {
  GraphQLClientProvider,
  GraphQLClientState,
} from '@app/providers/GraphQLClientProvider';

export function createWrapper(themeMode?: ColorSchemeName) {
  // Create a React Query client for testing
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

  // Set the theme according to the provided theme mode
  const theme = themeMode === 'dark' ? DarkTheme : DefaultTheme;
  const themeModeState: ThemeModes = themeMode === 'dark' ? 'dark' : 'light';

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <GraphQLClientProvider defaultState={graphQLClientTestState}>
        <QueryClientProvider client={queryClient}>
          <NetworkStatusProvider>
            <NavigationContainer theme={theme}>
              <PaperProvider theme={theme}>
                <ThemeModeProvider
                  themeMode={themeMode}
                  themeModeState={themeModeState}
                  setThemeMode={() => void 0}
                >
                  <React.Suspense fallback={null}>{children}</React.Suspense>
                </ThemeModeProvider>
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
  options?: RenderOptions,
  themeMode?: ColorSchemeName
) {
  return render(component, { wrapper: createWrapper(themeMode), ...options });
}

export * from '@testing-library/react-native';

export { customRender as render };
