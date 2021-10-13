import React from 'react';
import { render } from '@testing-library/react-native';

import * as appStateHook from 'react-native-appstate-hook';
import App from './App';
import { APP_NOT_READY } from '@app/test/testIDs';

describe('App tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should display a blank screen with Android', async () => {
    jest.spyOn(appStateHook, 'default').mockImplementation((_settings) => {
      return {
        appState: 'active',
      };
    });

    // Mock android platform
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
      select: () => void 0,
    }));

    const { findByTestId } = render(<App />);

    expect(await findByTestId(APP_NOT_READY)).not.toBeNull();
  });
});
