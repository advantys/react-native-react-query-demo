import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import { Paragraph } from '@app/components/Typography/Paragraph';
import { PARAGRAPH } from '@app/test/testIDs';

describe('Paragraph component tests', () => {
  it('Should display the paragraph children', () => {
    const CHILDREN_TEST_ID = 'CHILDREN';
    const Children = () => {
      return <View testID={CHILDREN_TEST_ID} />;
    };

    const { queryByTestId } = render(
      <Paragraph>
        <Children />
      </Paragraph>
    );

    expect(queryByTestId(CHILDREN_TEST_ID)).not.toBeNull();
  });

  it('Should apply the default style', () => {
    const CHILDREN_TEST_ID = 'CHILDREN';
    const Children = () => {
      return <View testID={CHILDREN_TEST_ID} />;
    };

    const { queryByTestId } = render(
      <Paragraph>
        <Children />
      </Paragraph>
    );

    const paragraph = queryByTestId(PARAGRAPH);
    expect(paragraph).toHaveStyle({ fontSize: 14 });
  });

  it('Should apply the xs style', () => {
    const Children = () => {
      return <View />;
    };

    const { queryByTestId } = render(
      <Paragraph size="xs">
        <Children />
      </Paragraph>
    );

    const paragraph = queryByTestId(PARAGRAPH);
    expect(paragraph).toHaveStyle({ fontSize: 11 });
  });
  it('Should apply the s style', () => {
    const Children = () => {
      return <View />;
    };

    const { queryByTestId } = render(
      <Paragraph size="s">
        <Children />
      </Paragraph>
    );

    const paragraph = queryByTestId(PARAGRAPH);
    expect(paragraph).toHaveStyle({ fontSize: 12 });
  });

  it('Should apply the m style', () => {
    const Children = () => {
      return <View />;
    };

    const { queryByTestId } = render(
      <Paragraph size="m">
        <Children />
      </Paragraph>
    );

    const paragraph = queryByTestId(PARAGRAPH);
    expect(paragraph).toHaveStyle({ fontSize: 14 });
  });

  it('Should apply the l style', () => {
    const Children = () => {
      return <View />;
    };

    const { queryByTestId } = render(
      <Paragraph size="l">
        <Children />
      </Paragraph>
    );

    const paragraph = queryByTestId(PARAGRAPH);
    expect(paragraph).toHaveStyle({ fontSize: 16 });
  });
});
