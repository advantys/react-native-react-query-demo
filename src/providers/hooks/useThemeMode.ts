import React from 'react';
import { ThemeModeContext } from '../ThemeModeProvider';

export function useThemeMode() {
  const contextValue = React.useContext(ThemeModeContext);

  if (!contextValue)
    throw new Error(
      'Please make sure your component tree is wrapped with ThemeModeProvider component'
    );

  return contextValue;
}
