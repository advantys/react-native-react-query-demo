import React from 'react';
import { ColorSchemeName } from 'react-native';

import type { ThemeModes } from '@app/hooks/useThemeState';

type ThemeMode = {
  themeMode: ColorSchemeName;
  themeModeState: ThemeModes;
  setThemeMode: (themeMode: ThemeModes) => void;
};

export const ThemeModeContext = React.createContext<ThemeMode | undefined>(
  {} as unknown as ThemeMode
);

type Props = {
  children: React.ReactNode;
  themeMode: ThemeMode['themeMode'];
  themeModeState: ThemeMode['themeModeState'];
  setThemeMode: ThemeMode['setThemeMode'];
};

export function ThemeModeProvider({
  children,
  themeMode,
  themeModeState,
  setThemeMode,
}: Props) {
  const themeModeContextValue = React.useMemo(() => {
    return {
      themeModeState,
      setThemeMode,
      themeMode,
    };
  }, [setThemeMode, themeMode, themeModeState]);
  return (
    <ThemeModeContext.Provider value={themeModeContextValue}>
      {children}
    </ThemeModeContext.Provider>
  );
}
