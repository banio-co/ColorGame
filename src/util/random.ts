import { PRNG } from 'seedrandom';

export const getNumberInRange = (rng: PRNG, start: number, end: number): number => {
  return ((end - start) * rng()) + start;
};
