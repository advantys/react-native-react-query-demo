import { renderHook } from '@testing-library/react-hooks';

import { useAppState } from '@app/hooks/useAppState';

describe('useAppState hook tests', () => {
  it('Should not call the app change handler', async () => {
    const onAppChange = jest.fn().mockImplementation(() => void 0);
    renderHook(() => useAppState(onAppChange));
    expect(onAppChange).not.toHaveBeenCalled();
  });
});
