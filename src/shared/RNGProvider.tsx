import React, { useContext, useState } from 'react';

import seedrandom, { PRNG } from 'seedrandom';

export type RNGStore = Readonly<{
  rng: PRNG;
  setSeed(seed: string): PRNG;
}>;

export type RNGProviderProps = {
  // Provide an initial seed so we guarantee `rng` isn't null
  seed: string;
  children: React.ReactNode;
}

const RNGContext = React.createContext<RNGStore>(null);
export const RNGProvider: React.FC<RNGProviderProps> = ({ seed, children }) => {
  // If we don't wrap `seedrandom` in a lambda like this, rng will be executed as state is set and it just becomes a number
  const [ rng, setRng ] = useState<PRNG>(() => seedrandom(seed));

  // Reset the RNG with a new seed. Returns next RNG function.
  const setSeed = (nextSeed: string): PRNG => {
    const nextRng = seedrandom(nextSeed);
    setRng(() => nextRng);

    return nextRng;
  };

  return (
    <RNGContext.Provider value={{
      rng,
      setSeed,
    }}>
      { children }
    </RNGContext.Provider>
  );
};

export const useRNG = (): RNGStore => useContext(RNGContext);
