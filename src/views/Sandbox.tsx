import React, { useEffect, useMemo, useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';
import seedrandom from 'seedrandom';

import { ScoreAction, useScore } from '../shared/ScoreContext';
import { generateCells, generatePoints } from '../util/voronoi-service';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
  },
});

type SandboxProps = Readonly<{
  seed: string;
}>;

const Sandbox: React.FC<SandboxProps> = ({
  seed,
}) => {
  const { score, updateScore } = useScore();

  const rng = useMemo(() => seedrandom(seed), [ seed ]);

  const cells = useMemo(() => {
    const viewBounds: [number, number, number, number] = [ 0, 0, 960, 500 ];
    const points = generatePoints(rng, 10, viewBounds);
    return generateCells(points, viewBounds);
  }, []);

  useEffect(() => {
    console.log('Voronoi results', cells);
  }, [ cells ]);

  const handlePress = (): void => {
    updateScore(ScoreAction.INCREMENT);
  };

  console.log('Rendered frame');
  return (
    <View style={styles.container}>
      <Button title="Increment score" onPress={handlePress}></Button>
      <Text>Score = {score}</Text>
    </View>
  );
};

export default Sandbox;
