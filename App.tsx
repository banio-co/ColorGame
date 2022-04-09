import React from 'react';

import { ImageBackground, StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { LightTheme } from './src/util/LightTheme';
import GameView from './src/views/GameView';

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
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.image}>
        <View style={styles.container}>
          <GameView />
        </View>
      </ImageBackground>
    </PaperProvider>
  );
};

export default App;
