import React from 'react';

import { ImageBackground, StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { ScoreProvider } from './src/shared/ScoreContext';
import { LightTheme } from './src/util/LightTheme';
import GameView from './src/views/GameView';
import Sandbox from './src/views/Sandbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

const App: React.FC = () => {
  return (
    <PaperProvider theme={LightTheme}>
      <ScoreProvider>
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.image}>
          <View style={styles.container}>
            <GameView />
            <Sandbox seed="beer"/>
          </View>
        </ImageBackground>
      </ScoreProvider>
    </PaperProvider>
  );
};

export default App;
