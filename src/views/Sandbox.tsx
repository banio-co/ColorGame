import React, { useEffect, useMemo } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';

import { useRNG } from '../shared/RNGProvider';
import { ScoreAction, useScore } from '../shared/ScoreProvider';
import { generateCells, generatePoints } from '../util/voronoi-service';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
  },
});

const Sandbox: React.FC = () => {
  const { score, updateScore } = useScore();
  const { rng, setSeed } = useRNG();

  const cells = useMemo(() => {
    const viewBounds: [number, number, number, number] = [ 0, 0, 960, 500 ];
    const points = generatePoints(rng, 10, viewBounds);
    return generateCells(points, viewBounds);
  }, [ rng ]);

  useEffect(() => {
    console.log('Voronoi results', cells);
  }, [ cells ]);

  const handlePress = (): void => {
    updateScore(ScoreAction.INCREMENT);
  };

  const handleRngReset = (): void => {
    setSeed(`seed-${score}`);
  };

  console.log('Rendered frame');
  return (
    <View style={styles.container}>
      <Button title="Increment score" onPress={handlePress}></Button>
      <Button title={`Set RNG Seed = "seed-${score}"`} onPress={handleRngReset}></Button>
      <Text>Score = {score}</Text>
    </View>
  );
};

export default Sandbox;
