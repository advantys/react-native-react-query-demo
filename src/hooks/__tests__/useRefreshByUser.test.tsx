import { renderHook, act } from '@testing-library/react-hooks';

import { useRefreshByUser } from '@app/hooks/useRefreshByUser';

describe('useRefreshByUser status hook tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should return the fetch status', async () => {
    const spyRefetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(setImmediate));
    const { result, waitFor } = renderHook(() => useRefreshByUser(spyRefetch));

    expect(result.current.isRefetchingByUser).toBeFalsy();

    // Initiates a refresh
    await act(async () => {
      result.current.refetchByUser();
    });

    // Should call the refetch function
    expect(spyRefetch).toBeCalled();

    // Should set isRefetchingByUser to true
    waitFor(() => expect(result.current.isRefetchingByUser).toBeTruthy());

    // Should set isRefetchingByUser to false when the refetch is completed
    waitFor(() => expect(result.current.isRefetchingByUser).toBeFalsy());
  });
});
