import React from 'react';
import { render } from '@testing-library/react-native';

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

  it('Should display a blank screen with Android', async () => {
    // Mock android platform
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
      select: () => void 0,
    }));

    jest
      .spyOn(appStateHook, 'useAppState')
      .mockImplementation((_onChange) => {});

    const { findByTestId } = render(<App />);

    expect(await findByTestId(APP_NOT_READY)).not.toBeNull();
  });
});
