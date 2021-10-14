import React from 'react';
import { render } from '@testing-library/react-native';

import { LoadingScreen } from '@app/components/LoadingScreen';
import { LOADING_SCREEN, ACTIVITY_INDICATOR } from '@app/test/testIDs';

describe('LoadingScreen component tests', () => {
  it('Should display the loading screen', () => {
    const { queryByTestId } = render(<LoadingScreen />);

    expect(queryByTestId(LOADING_SCREEN)).not.toBeNull();
    expect(queryByTestId(ACTIVITY_INDICATOR)).not.toBeNull();
  });
});
