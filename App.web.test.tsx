import React from 'react';
import { act, render } from '@testing-library/react-native';
import { AppStateStatus } from 'react-native';
import { focusManager } from 'react-query';

import * as appStateHook from 'react-native-appstate-hook';
import App from './App';

describe('App tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should not call React Query focus manager in Web mode', async () => {
    // Mock web platform
    jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'web',
      select: () => void 0,
    }));

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

    await act(async () => {
      onChangeHandler?.('active');
    });

    expect(spySetFocused).not.toHaveBeenCalled();
  });
});
