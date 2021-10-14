import { renderHook, act } from '@testing-library/react-hooks';
import ReactNative from 'react-native';

import { useThemeState } from '@app/hooks/useThemeState';

describe('useThemeState hook tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should return the default theme state', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockImplementation(() => {
      return 'light';
    });
    const { result, waitForNextUpdate } = renderHook(() => useThemeState());

    expect(result.current.themeModeState).toEqual('auto');
    expect(result.current.themeMode).toEqual('light');
    expect(result.current.isReady).toBeFalsy();

    // Wait for the theme mode state to be retrieved from the Async Storage
    await waitForNextUpdate();
    expect(result.current.isReady).toBeTruthy();
  });

  it('Should change the theme state to dark', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockImplementation(() => {
      return 'light';
    });
    const { result, waitForNextUpdate } = renderHook(() => useThemeState());

    // Wait for the theme mode state to be retrieved from the Async Storage
    await waitForNextUpdate();

    // Change the theme mode state
    await act(async () => {
      result.current.setThemeModeState('dark');
    });

    expect(result.current.isReady).toBeTruthy();
    expect(result.current.themeMode).toEqual('dark');
    expect(result.current.themeModeState).toEqual('dark');
  });
});
