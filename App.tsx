import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useAppState from 'react-native-appstate-hook';
import { StatusBar } from 'expo-status-bar';
import { ColorSchemeName, Platform, View, StyleSheet } from 'react-native';
import { focusManager, QueryClientProvider } from 'react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateStatus } from 'react-native';

import { useThemeState } from '@app/hooks/useThemeState';
import { DefaultTheme, DarkTheme } from '@app/styles/themes';
import { NetworkStatusProvider } from '@app/providers/NetworkStatusProvider';
import { useOnlineManager } from '@app/hooks/useOnlineManager';
import { GraphQLClientProvider } from '@app/providers/GraphQLClientProvider';
import { queryClient } from '@app/services/queryClient';
import { MainStack } from '@app/navigation/MainStack';
import { ThemeModeProvider } from '@app/providers/ThemeModeProvider';
import { useCustomFonts } from '@app/hooks/useCustomFonts';
import { initPersistor } from '@app/services/persistor';
import { APP_NOT_READY } from '@app/test/testIDs';

// Load React Query cache from the async storage
initPersistor(queryClient);

function onAppStateChange(status: AppStateStatus) {
  const isWEB = Platform.OS === 'web';

  // React Query already supports in web browser refetch on window focus by default
  if (!isWEB) {
    console.log(Platform.OS);
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

  useAppState({
    onChange: onAppStateChange,
  });

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
    </GraphQLClientProvider>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
