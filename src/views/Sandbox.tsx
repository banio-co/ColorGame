import React, { useEffect, useMemo, useState } from 'react';

import { Delaunay } from 'd3-delaunay';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
  },
});

type SandboxProps = Readonly<{
    foo: string;
}>;

const Sandbox: React.FC<SandboxProps> = ({
  foo,
}) => {
  const [ counter, setCounter ] = useState(0);

  const voronoi = useMemo(() => {
    const points = [ [ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ];
    const delaunay = Delaunay.from(points);
    const result = delaunay.voronoi([ 0, 0, 960, 500 ]);

    console.log('Calculated voronoi diagram');

    return result;
  }, []);

  useEffect(() => {
    console.log('Voronoi results', voronoi);
  }, [ voronoi ]);

  const handlePress = (): void => {
    setCounter(counter + 1);
  };

  console.log('Rendered frame');
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <Text>Prop foo = {foo}</Text>
      <Button title="Increase Counter" onPress={handlePress}></Button>
      <Text>Counter = {counter}</Text>
    </View>
  );
};

export default Sandbox;
