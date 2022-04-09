import React, { useEffect, useMemo, useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';
import seedrandom from 'seedrandom';

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
  const [ counter, setCounter ] = useState(0);

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
    setCounter(counter + 1);
  };

  console.log('Rendered frame');
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <Button title="Increase Counter" onPress={handlePress}></Button>
      <Text>Counter = {counter}</Text>
    </View>
  );
};

export default Sandbox;
