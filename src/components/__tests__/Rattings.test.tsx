import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Ratings } from '@app/components/Ratings';
import { STAR, STAR_OUTLINED } from '@app/test/testIDs';

describe('Ratings component tests', () => {
  it('Should display the stars', () => {
    const { queryAllByTestId } = render(<Ratings value={2} size={10} />);

    // There are 5 stars that can be full or outlined
    // according to the value prop
    expect(queryAllByTestId(STAR)).toHaveLength(2);
    expect(queryAllByTestId(STAR_OUTLINED)).toHaveLength(3);
  });

  it('Should call the onPress function', () => {
    const mockOnPress = jest.fn();
    const { queryAllByTestId } = render(
      <Ratings value={2} size={10} onPress={mockOnPress} />
    );

    const pressableStars = queryAllByTestId(STAR);
    fireEvent.press(pressableStars[1]);
    expect(mockOnPress.mock.calls.length).toBe(1);
  });
});
