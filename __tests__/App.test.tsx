import React from 'react';
import { render } from '@testing-library/react-native';
import ReactNative, { AppStateStatus } from 'react-native';
import { focusManager } from 'react-query';

import * as appStateHook from 'react-native-appstate-hook';
import App from '../App';
import { APP_NOT_READY } from '@app/test/testIDs';

describe('App tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should display a blank screen with iOs', async () => {
    jest.spyOn(appStateHook, 'default').mockImplementation((_settings) => {
      return {
        appState: 'active',
      };
    });

    const { findByTestId } = render(<App />);

    expect(await findByTestId(APP_NOT_READY)).not.toBeNull();
  });

  it('Should display a blank screen in dark mode', async () => {
    jest.spyOn(appStateHook, 'default').mockImplementation((_settings) => {
      return {
        appState: 'active',
      };
    });

    jest.spyOn(ReactNative, 'useColorScheme').mockImplementation(() => {
      return 'dark';
    });

    const { findByTestId } = render(<App />);

    expect(await findByTestId(APP_NOT_READY)).not.toBeNull();
  });

  it('Should call React Query focus manager when the app is active', async () => {
    const spySetFocused = jest.spyOn(focusManager, 'setFocused');

    let onChangeHandler: ((status: AppStateStatus) => void) | undefined;
    jest.spyOn(appStateHook, 'default').mockImplementation((settings) => {
      onChangeHandler = settings?.onChange;
      return {
        appState: 'active',
      };
    });

    render(<App />);

    expect(onChangeHandler).toBeDefined();

    onChangeHandler?.('active');

    expect(spySetFocused).toHaveBeenCalledWith(true);
  });
});
