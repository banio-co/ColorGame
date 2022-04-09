import React, { useEffect, useMemo, useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';

import { generateNodes } from '../util/voronoi-service';

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

  const nodes = useMemo(() => {
    return generateNodes([ [ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ], [ 0, 0, 960, 500 ]);
  }, []);

  useEffect(() => {
    console.log('Voronoi results', nodes);
  }, [ nodes ]);

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
