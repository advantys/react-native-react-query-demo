import React from 'react';
import { render } from '@testing-library/react-native';

import { ListFooterComponent } from '@app/components/ListFooterComponent';
import { ACTIVITY_INDICATOR } from '@app/test/testIDs';

describe('ListFooterComponent component tests', () => {
  it('Should display the activity indicator', () => {
    const { queryByTestId } = render(
      <ListFooterComponent isFetchingNextPage={true} />
    );

    expect(queryByTestId(ACTIVITY_INDICATOR)).not.toBeNull();
  });

  it('Should not display the activity indicator', () => {
    const { queryByTestId } = render(
      <ListFooterComponent isFetchingNextPage={false} />
    );

    expect(queryByTestId(ACTIVITY_INDICATOR)).toBeNull();
  });
});
