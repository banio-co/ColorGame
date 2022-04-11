import React from 'react';

import { View, StyleSheet } from 'react-native';
import { useTheme, Title, Subheading } from 'react-native-paper';

import { CustomTheme } from '../../util/LightTheme';

const makeStyles = (theme: CustomTheme) => StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
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
    // TODO: Wrap with shared styled "Card" component
    <View style={styles.container}>
      <Title>{label}</Title>
      <Subheading>{score}</Subheading>
    </View>
  );
};

export default ScoreDisplay;
