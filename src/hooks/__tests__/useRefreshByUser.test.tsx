import { renderHook, act } from '@testing-library/react-hooks';

import { useRefreshByUser } from '@app/hooks/useRefreshByUser';
import { waitFor } from '@app/test/testUtils';

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
    act(() => {
      result.current.refetchByUser();
    });

    expect(spyRefetch).toBeCalled();
    expect(result.current.isRefetchingByUser).toBeTruthy();

    // The refresh is completed
    waitFor(() => expect(result.current.isRefetchingByUser).toBeFalsy());
  });
});
