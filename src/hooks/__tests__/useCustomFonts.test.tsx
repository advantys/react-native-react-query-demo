import { renderHook } from '@testing-library/react-hooks';

import { useCustomFonts } from '@app/hooks/useCustomFonts';

describe('useCustomFonts status hook tests', () => {
  it('Should load the fonts', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCustomFonts());

    expect(result.current[0]).toBeFalsy();

    // Wait for the mocked fonts to be loaded
    await waitForNextUpdate();
    expect(result.current[0]).toBeTruthy();
  });
});
