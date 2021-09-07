import { useTheme } from 'react-native-paper';
import { useMemo } from 'react';

import { useThemeMode } from '@app/providers/hooks/useThemeMode';

export function useHeaderStyles() {
  const theme = useTheme();
  const { themeMode } = useThemeMode();

  return useMemo(
    () => ({
      headerStyle: {
        backgroundColor: theme.colors.headerBackground,
        shadowOpacity: themeMode === 'dark' ? 0.3 : undefined, //only in the dark mode,
      },
      headerTintColor: theme.colors.headerTint,
      headerTitleStyle: theme.fonts.medium,
      headerBackTitleStyle: theme.fonts.regular,
    }),
    [
      theme.colors.headerBackground,
      theme.colors.headerTint,
      theme.fonts.medium,
      theme.fonts.regular,
      themeMode,
    ]
  );
}
