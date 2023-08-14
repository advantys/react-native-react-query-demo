import React from 'react';
import { render } from '@testing-library/react-native';

import { Divider } from '@app/components/Divider';
import { DIVIDER } from '@app/test/testIDs';

describe('Divider component tests', () => {
  it('Should display the divider', () => {
    const { queryByTestId } = render(<Divider />);

    expect(queryByTestId(DIVIDER)).not.toBeNull();
  });
});
