import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { ColorSchemeName, Platform, View, StyleSheet } from 'react-native';
import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateStatus } from 'react-native';

import { useAppState } from '@app/hooks/useAppState';
import { useThemeState } from '@app/hooks/useThemeState';
import { DefaultTheme, DarkTheme } from '@app/styles/themes';
import { NetworkStatusProvider } from '@app/providers/NetworkStatusProvider';
import { useOnlineManager } from '@app/hooks/useOnlineManager';
import { GraphQLClientProvider } from '@app/providers/GraphQLClientProvider';
import { queryClient } from '@app/services/queryClient';
import { storagePersister } from '@app/services/persister';

import { MainStack } from '@app/navigation/MainStack';
import { ThemeModeProvider } from '@app/providers/ThemeModeProvider';
import { useCustomFonts } from '@app/hooks/useCustomFonts';
import { APP_NOT_READY } from '@app/test/testIDs';

function onAppStateChange(status: AppStateStatus) {
  const isWEB = Platform.OS === 'web';

  // React Query already supports in web browser refetch on window focus by default
  if (!isWEB) {
    focusManager.setFocused(status === 'active');
  }
}

function getStatusBarStyle(themeColorScheme: ColorSchemeName) {
  const isIOS = Platform.OS === 'ios';
  return themeColorScheme !== 'dark' ? (isIOS ? 'dark' : 'light') : 'light';
}

export default function App() {
  const [loaded] = useCustomFonts();
  const { isReady, themeMode, themeModeState, setThemeModeState } =
    useThemeState();

  useAppState(onAppStateChange);

  useOnlineManager();

  const theme = themeMode === 'dark' ? DarkTheme : DefaultTheme;

  if (!loaded || !isReady)
    return (
      <View
        style={[styles.fill, { backgroundColor: theme.colors.primary }]}
        testID={APP_NOT_READY}
      />
    );

  return (
    <GraphQLClientProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: storagePersister }}
      >
        <QueryClientProvider client={queryClient}>
          <NetworkStatusProvider>
            <NavigationContainer theme={theme}>
              <PaperProvider theme={theme}>
                <ThemeModeProvider
                  themeMode={themeMode}
                  setThemeMode={setThemeModeState}
                  themeModeState={themeModeState}
                >
                  <StatusBar style={getStatusBarStyle(themeMode)} />
                  <SafeAreaProvider
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    <MainStack />
                  </SafeAreaProvider>
                </ThemeModeProvider>
              </PaperProvider>
            </NavigationContainer>
          </NetworkStatusProvider>
        </QueryClientProvider>
      </PersistQueryClientProvider>
    </GraphQLClientProvider>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
