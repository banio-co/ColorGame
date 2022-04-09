import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Headline, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../util/LightTheme';

const makeStyles = (theme: CustomTheme) => StyleSheet.create({
  surface: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing * 3,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  gameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    justifyContent: 'space-between',
  },
});

const GameView: React.FC = () => {
  const theme = useTheme() as CustomTheme;
  const styles = makeStyles(theme);

  return (
    <Surface style={styles.surface}>
      <Headline>Color Game</Headline>

      <View style={styles.gameContainer}>
        <View>board</View>
        <View style={styles.infoContainer}>
          <View>colors</View>
          <View>score</View>
          <View>high score</View>
        </View>
      </View>
    </Surface>
  );
};

export default GameView;
