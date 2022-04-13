import React, { useContext, useEffect, useState } from 'react';

import { useTheme } from 'react-native-paper';
import { PRNG } from 'seedrandom';

import { CustomTheme } from '../util/LightTheme';
import { getNumberInRange } from '../util/random';
import { useRNG } from './RNGProvider';

export type ColorStore = Readonly<{
  peekNextColor(): string;
  peekAllColors(): string[];
  getNextColor(): string;
}>;

const ColorContext = React.createContext<ColorStore>(null);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { rng } = useRNG();
  const theme = useTheme() as CustomTheme;
  const themeColors = [ theme.colors.color1, theme.colors.color2, theme.colors.color3, theme.colors.color4 ];
  const [ colors, setColors ] = useState([]);

  useEffect(() => {
    setColors(generateColors(rng));
  }, [ rng ]);

  const generateColors = (rng: PRNG): string[] => {
    const colors = [];
    for (let i = 0; i < 4; i++) { // have 4th color ready in case of animation to slide in
      const randIndex = Math.floor(getNumberInRange(rng, 0, 4));
      colors.push(themeColors[randIndex]);
    }
    return colors;
  };

  const generateNewColor = (rng: PRNG): string => {
    const randIndex = Math.floor(getNumberInRange(rng, 0, 4));
    return themeColors[randIndex];
  };

  const peekNextColor = (): string => colors[0];

  const peekAllColors = (): string[] => colors;

  const getNextColor = (): string => {
    const nextColor = colors[0];
    setColors((colors) => [ ...(colors.slice(1)), generateNewColor(rng) ]);
    return nextColor;
  };

  return (
    <ColorContext.Provider value={{ peekNextColor, getNextColor, peekAllColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = (): ColorStore => useContext(ColorContext);
