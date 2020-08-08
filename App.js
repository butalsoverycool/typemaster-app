import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import GameState from './components/GameState';
import Header from './components/Header';
import Nav from './components/Nav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default function App() {
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
