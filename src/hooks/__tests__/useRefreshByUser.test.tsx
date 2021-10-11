import { renderHook } from '@testing-library/react-hooks';

import { useRefreshByUser } from '@app/hooks/useRefreshByUser';
import { act } from '@app/test/testUtils';

describe('useRefreshByUser status hook tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should return the fetch status', async () => {
    const spyRefetch = jest.fn();
    const { result } = renderHook(() => useRefreshByUser(spyRefetch));

    expect(result.current.isRefetchingByUser).toBeFalsy();

    // Initiates a refresh
    act(async () => {
      result.current.refetchByUser();
    });
    expect(spyRefetch).toBeCalled();
    expect(result.current.isRefetchingByUser).toBeTruthy();
  });
});
