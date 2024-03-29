import { renderHook } from '@testing-library/react-hooks';

import { createWrapper, waitFor } from '@app/test/testUtils';
import { useInfiniteMovies } from '@app/screens/hooks/useInfiniteMovies';

describe('useInfiniteMovies hook tests', () => {
  it('Should fetch the first page', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useInfiniteMovies(), { wrapper });

    await waitFor(() => expect(result.current.isFetched).toBeTruthy());
  });

  it('Should fetch the next page', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useInfiniteMovies(), { wrapper });

    // Wait for the first page
    await waitFor(() => expect(result.current.data?.pages.length).toBe(1));

    // Fetch the second page
    result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages.length).toBe(2));

    // No more pages to fetch
    result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages.length).toBe(2));
  });
});
