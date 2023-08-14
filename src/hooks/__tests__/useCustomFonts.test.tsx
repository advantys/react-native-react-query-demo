import { renderHook } from '@testing-library/react-hooks';

import { useCustomFonts } from '@app/hooks/useCustomFonts';

describe('useCustomFonts status hook tests', () => {
  it('Should load the fonts', async () => {
    const { result } = renderHook(() => useCustomFonts());
    expect(result.current[0]).toBeTruthy();
  });
});
