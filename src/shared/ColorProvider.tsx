import React, { useContext, useEffect, useState } from 'react';

import { useTheme } from 'react-native-paper';
import { PRNG } from 'seedrandom';

import { CustomTheme } from '../util/LightTheme';
import { getNumberInRange } from '../util/random';
import { useRNG } from './RNGProvider';

export type ColorStore = Readonly<{
  peekNextColor(): string;
  getNextColor(): string;
  getAllColors(): string[];
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

  useEffect(() => {
    console.log(`colors: ${colors}`);
  }, [ colors ]);

  const generateColors = (rng: PRNG): string[] => {
    const colors = [];
    for (let i = 0; i < 4; i++) { // have 4th color ready in case of animation to slide in
      const randIndex = Math.floor(getNumberInRange(rng, 0, 4));
      colors.push(themeColors[randIndex]);
    }
    return colors;
  };

  const getNewColor = (rng: PRNG): string => {
    const randIndex = Math.floor(getNumberInRange(rng, 1, 4));
    return themeColors[randIndex];
  };

  const peekNextColor = (): string => {
    return colors[0];
  };

  const getNextColor = (): string => {
    const nextColor = colors[0];
    setColors((colors) => [ ...(colors.slice(1)), getNewColor(rng) ]);
    return nextColor;
  };

  const getAllColors = (): string[] => {
    return colors;
  };

  return (
    <ColorContext.Provider value={{ peekNextColor, getNextColor, getAllColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = (): ColorStore => useContext(ColorContext);
