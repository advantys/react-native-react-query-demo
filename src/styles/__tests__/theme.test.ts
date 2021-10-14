jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: () => void 0,
}));

import { DefaultTheme } from '@app/styles/themes';
import { blue } from '@app/styles/colors';

describe('Default theme tests', () => {
  it('Should adjust the default theme for Android', async () => {
    expect(DefaultTheme.colors.headerBackground).toEqual(blue);
  });
});
