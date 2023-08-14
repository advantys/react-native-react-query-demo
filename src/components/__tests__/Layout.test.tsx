import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import { Layout } from '@app/components/Layout';

describe('Layout component tests', () => {
  it('Should display the layout screen with its children', () => {
    const CHILDREN_TEST_ID = 'CHILDREN';
    const Children = () => {
      return <View testID={CHILDREN_TEST_ID} />;
    };

    const { queryByTestId } = render(
      <Layout>
        <Children />
      </Layout>
    );

    expect(queryByTestId(CHILDREN_TEST_ID)).not.toBeNull();
  });
});
