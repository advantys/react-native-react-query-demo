import { renderHook } from '@testing-library/react-hooks';

import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';

describe('useGraphQLClient hook tests', () => {
  it('Should throw an error if the hook is wrapped in a provider', () => {
    const { result } = renderHook(() => useGraphQLClient());
    expect(result.error).not.toBeNull();
  });
});
