import React from 'react';
import { render } from '@testing-library/react-native';
import { AppStateStatus } from 'react-native';
import { focusManager } from '@tanstack/react-query';

import App from '../App';
import * as appStateHook from '@app/hooks/useAppState';

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

    const setFocusedSpy = jest.spyOn(focusManager, 'setFocused');

    let onChangeHandler: ((status: AppStateStatus) => void) | undefined;

    jest.spyOn(appStateHook, 'useAppState').mockImplementation((onChange) => {
      onChangeHandler = onChange;
    });

    render(<App />);

    expect(onChangeHandler).toBeDefined();

    onChangeHandler?.('active');

    expect(setFocusedSpy).not.toHaveBeenCalled();
  });
});
