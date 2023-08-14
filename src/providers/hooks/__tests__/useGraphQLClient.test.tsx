import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useGraphQLClient } from '@app/providers/hooks/useGraphQLClient';
import { GraphQLClientProvider } from '@app/providers/GraphQLClientProvider';

describe('useGraphQLClient hook tests', () => {
  it('Should throw an error if the hook is wrapped in a provider', () => {
    const { result } = renderHook(() => useGraphQLClient());
    expect(result.error).not.toBeNull();
  });

  it('Should return a GraphQL client by default', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GraphQLClientProvider>{children}</GraphQLClientProvider>
    );
    const { result } = renderHook(() => useGraphQLClient(), { wrapper });

    expect(result.current.graphQLClient).not.toBeNull();
  });
});
