import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import GameState from './components/GameState';
import Header from './components/Header';
import Nav from './components/Nav';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const init = async () => {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    setAppReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!appReady) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <GameState>
        <View style={styles.container}>
          <Header />

          <Nav />
        </View>
      </GameState>
    </NavigationContainer>
  );
}
