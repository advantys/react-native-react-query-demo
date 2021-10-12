import { renderHook } from '@testing-library/react-hooks';

import { createWrapper } from '@app/test/testUtils';
import { useInfiniteMovies } from '@app/screens/hooks/useInfiniteMovies';

describe('useInfiniteMovies hook tests', () => {
  it('Should fetch the first page', async () => {
    const wrapper = createWrapper();
    const { result, waitForNextUpdate } = renderHook(
      () => useInfiniteMovies(),
      { wrapper }
    );

    await waitForNextUpdate();
    expect(result.current.isFetched).toBeTruthy();
  });

  it('Should fetch the next page', async () => {
    const wrapper = createWrapper();
    const { result, waitForNextUpdate } = renderHook(
      () => useInfiniteMovies(),
      { wrapper }
    );

    // Wait for the first page
    await waitForNextUpdate();
    expect(result.current.data?.pages.length).toBe(1);

    // Fetch the second page
    await result.current.fetchNextPage();
    expect(result.current.data?.pages.length).toBe(2);

    // No more pages to fetch
    await result.current.fetchNextPage();
    expect(result.current.data?.pages.length).toBe(2);
  });
});