import React from 'react';

import { render } from '@app/test/testUtils';
import { MainStack } from '@app/navigation/MainStack';
import { MOVIES_LIST } from '@app/test/testIDs';
import { DarkTheme, DefaultTheme } from '@app/styles/themes';

it('Should display Movies list screen in light mode', async () => {
  const { findByTestId } = render(<MainStack />, undefined, 'light');

  // Should display the Movies List screen as the initial route
  const moviesList = await findByTestId(MOVIES_LIST);
  expect(moviesList).not.toBeNull();
  expect(moviesList).toHaveStyle({
    backgroundColor: DefaultTheme.colors.background,
  });
});

it('Should display Movies list screen in dark mode', async () => {
  const { findByTestId } = render(<MainStack />, undefined, 'dark');

  // Should display the Movies List screen as the initial route
  const moviesList = await findByTestId(MOVIES_LIST);
  expect(moviesList).not.toBeNull();
  expect(moviesList).toHaveStyle({
    backgroundColor: DarkTheme.colors.background,
  });
});
