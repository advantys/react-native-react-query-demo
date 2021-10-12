import React from 'react';

import { render } from '@app/test/testUtils';
import { MainStack } from '@app/navigation/MainStack';
import { MOVIES_LIST } from '@app/test/testIDs';
import { ThemeModeProvider } from '@app/providers/ThemeModeProvider';

describe('MainStack component tests', () => {
  const Component = () => {
    return (
      <ThemeModeProvider
        themeMode="light"
        themeModeState="light"
        setThemeMode={() => void 0}
      >
        <MainStack />
      </ThemeModeProvider>
    );
  };

  it('Should display Movies list screen', async () => {
    const { findByTestId } = render(<Component />);

    // Should display the Movies List screen as the initial route
    expect(await findByTestId(MOVIES_LIST)).not.toBeNull();
  });
});
