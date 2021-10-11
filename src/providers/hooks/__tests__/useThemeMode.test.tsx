import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useThemeMode } from '@app/providers/hooks/useThemeMode';
import { ThemeModeProvider } from '@app/providers/ThemeModeProvider';

type WrapperProps = {
  children: any;
};

describe('useThemeMode custom hook tests', () => {
  it('Should throw an error if useThemeMode hook is not wrapped in a ThemeModeProvider', () => {
    const { result } = renderHook(() => useThemeMode());
    expect(result.error).not.toBeNull();
  });

  it('Should expose the theme mode', () => {
    const spySetThemeMode = jest.fn();

    const wrapper = ({ children }: WrapperProps) => {
      return (
        <ThemeModeProvider
          themeMode={'light'}
          setThemeMode={spySetThemeMode}
          themeModeState={'auto'}
        >
          {children}
        </ThemeModeProvider>
      );
    };
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    expect(result.current.themeMode).toEqual('light');
    expect(result.current.themeModeState).toEqual('auto');

    result.current.setThemeMode('dark');
    expect(spySetThemeMode.mock.calls.length).toEqual(1);
  });
});
