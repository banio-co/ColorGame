import { DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

export type CustomTheme = Theme & {
  spacing: number,
  colors: {
    color1: string,
    color2: string,
    color3: string,
    color4: string,
  }
}

export const LightTheme: CustomTheme = {
  ...DefaultTheme,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    accent: '#07070A',
    background: '#FAFAFA',
    surface: '#FAFAFA',
    text: '#07070A',
    onSurface: '#FAFAFA',
    // Custom colors
    color1: '#F03834',
    color2: '#2274A5',
    color3: '#00916E',
    color4: '#F1C40F',
  },
  // Custom properties
  spacing: 8,
};
