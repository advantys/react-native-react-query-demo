import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import Color from 'color';
import { Platform } from 'react-native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {
  white,
  black,
  blue,
  green,
  orange,
  red,
  greyDarkLess,
  greyDark,
  greyDarkest,
  greyLight,
  greyLightest,
} from './colors';
import {
  InterBold,
  InterLight,
  InterRegular,
  InterSemiBold,
  InterThin,
} from './fonts';

const isIOS = Platform.OS === 'ios';

const fonts = {
  regular: {
    fontFamily: InterRegular,
    fontWeight: 'normal' as const,
  },
  medium: {
    fontFamily: InterSemiBold,
    fontWeight: '700' as const,
  },
  light: {
    fontFamily: InterLight,
    fontWeight: '300' as const,
  },
  thin: {
    fontFamily: InterThin,
    fontWeight: '200' as const,
  },
  bold: {
    fontFamily: InterBold,
    fontWeight: '700' as const,
  },
};

const fontConfig = {
  ios: {
    ...fonts,
  },
  android: {
    ...fonts,
  },
};

// ReactNativePaper global augmentation with custom properties
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      info: string;
      dividerBackground: string;
      headerBackground: string;
      headerTint: string;
    }
  }
}

export const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: blue,
    accent: green,
    background: white,
    success: green,
    info: green,
    warning: orange,
    error: red,
    link: blue,
    border: greyLight,
    headerBackground: isIOS ? greyLightest : blue,
    headerTint: isIOS ? black : white,
    dividerBackground: Color(black).alpha(0.25).rgb().toString(),
  },
  fonts: configureFonts(fontConfig),
};

export const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  ...DefaultTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...DefaultTheme.colors,
    background: black,
    backgroundHighlighted: greyDarkest,
    text: white,
    iconBackgroundDisabled: greyDarkLess,
    placeholder: greyDarkLess,
    border: greyDark,
    headerBackground: greyDarkest,
    headerTint: white,
    dividerBackground: Color(white).alpha(0.15).rgb().toString(),
  },
};
