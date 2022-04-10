import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../../util/LightTheme';

const makeStyles = (theme: CustomTheme) => StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

export type ScoreDisplayProps = Readonly<{
  label: string;
  score: number | string;
}>;

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  label,
  score,
}) => {
  const theme = useTheme() as CustomTheme;
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Text>{score}</Text>
    </View>
  );
};

export default ScoreDisplay;
