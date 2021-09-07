import { useFonts } from 'expo-font';

import {
  InterBold,
  InterLight,
  InterRegular,
  InterSemiBold,
  InterThin,
} from '@app/styles/fonts';

export function useCustomFonts() {
  return useFonts({
    [InterRegular]: require('../../assets/fonts/Inter-Regular.woff2'),
    [InterSemiBold]: require('../../assets/fonts/Inter-SemiBold.woff2'),
    [InterLight]: require('../../assets/fonts/Inter-Light.woff2'),
    [InterThin]: require('../../assets/fonts/Inter-Thin.woff2'),
    [InterBold]: require('../../assets/fonts/Inter-Bold.woff2'),
  });
}
