import React from 'react';
import { render } from '@testing-library/react-native';
import ReactNative, { AppStateStatus } from 'react-native';
import { focusManager } from '@tanstack/react-query';

import App from '../App';
import * as appStateHook from '@app/hooks/useAppState';
import { APP_NOT_READY } from '@app/test/testIDs';

describe('App tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should display a blank screen with iOs', async () => {
    jest
      .spyOn(appStateHook, 'useAppState')
      .mockImplementation((_onAppChange) => {});

    const { findByTestId } = render(<App />);

    expect(await findByTestId(APP_NOT_READY)).not.toBeNull();
  });

  it('Should display a blank screen in dark mode', async () => {
    jest
      .spyOn(appStateHook, 'useAppState')
      .mockImplementation((_onAppChange) => {});

    jest.spyOn(ReactNative, 'useColorScheme').mockImplementation(() => {
      return 'dark';
    });

    const { findByTestId } = render(<App />);

    expect(await findByTestId(APP_NOT_READY)).not.toBeNull();
  });

  it('Should call React Query focus manager when the app is active', async () => {
    const setFocusedSpy = jest.spyOn(focusManager, 'setFocused');

    let onChangeHandler: ((status: AppStateStatus) => void) | undefined;

    jest.spyOn(appStateHook, 'useAppState').mockImplementation((onChange) => {
      onChangeHandler = onChange;
    });

    render(<App />);

    expect(onChangeHandler).toBeDefined();

    onChangeHandler?.('active');

    expect(setFocusedSpy).toHaveBeenCalledWith(true);
  });
});
