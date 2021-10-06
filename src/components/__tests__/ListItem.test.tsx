import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { ListItem } from '@app/components/ListItem';
import { LIST_ITEM } from '@app/test/testIDs';

describe('ListItem component tests', () => {
  it('Should display a list item with the title', () => {
    const item = {
      id: 1,
      title: 'title 1',
      ratings: 1,
    };
    const mockOnPress = jest.fn();
    const { queryByText } = render(
      <ListItem item={item} onPress={mockOnPress} />
    );

    expect(queryByText(`#${item.id}`)).not.toBeNull();
    expect(queryByText(item.title)).not.toBeNull();
  });

  it('Should not render a list item if the provided item is null', () => {
    const item = null;
    const mockOnPress = jest.fn();

    const { queryByTestId } = render(
      <ListItem item={item} onPress={mockOnPress} />
    );

    expect(queryByTestId(LIST_ITEM)).toBeNull();
  });

  it('Should call the onPress function with press the list item button', () => {
    const item = {
      id: 1,
      title: 'title 1',
      ratings: 1,
    };
    const mockOnPress = jest.fn();
    const { queryByTestId } = render(
      <ListItem item={item} onPress={mockOnPress} />
    );

    const pressableListItem = queryByTestId(LIST_ITEM);
    fireEvent.press(pressableListItem);
    expect(mockOnPress.mock.calls.length).toBe(1);
  });
});
