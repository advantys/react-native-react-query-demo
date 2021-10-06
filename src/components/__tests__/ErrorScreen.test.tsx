import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { ErrorScreen } from '@app/components/ErrorScreen';

describe('ErrorScreen component tests', () => {
  it('Should display an error with the provided message', () => {
    const error = new Error('error 1');

    const { queryByText } = render(
      <ErrorScreen
        error={error}
        message="error message 1"
        resetErrorBoundary={() => true}
      />
    );

    expect(queryByText('error message 1')).not.toBeNull();
    expect(queryByText('Retry')).not.toBeNull();
  });

  it('Should display an error with the error message', () => {
    const error = new Error('error 1');

    const { queryByText } = render(
      <ErrorScreen error={error} resetErrorBoundary={() => true} />
    );

    expect(queryByText('error 1')).not.toBeNull();
    expect(queryByText('Retry')).not.toBeNull();
  });

  it('Should call the resetErrorBoundary reset function', () => {
    const error = new Error('error 1');
    const mockReset = jest.fn();

    const { queryByText } = render(
      <ErrorScreen error={error} resetErrorBoundary={mockReset} />
    );

    const retryButton = queryByText('Retry');

    fireEvent.press(retryButton);
    expect(mockReset.mock.calls.length).toBe(1);
  });
});
