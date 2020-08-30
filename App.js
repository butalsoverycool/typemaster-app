import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

import GameState from './components/GameState';
import getSounds from './constants/getSounds';
import Header from './components/Header';
import Nav from './components/Nav';

import { View, Loading } from './components/Elements';

import Firebase, { FirebaseContext } from './components/Firebase';
import { useFonts } from 'expo-font';
import { CutiveMono_400Regular } from '@expo-google-fonts/cutive-mono';

import { Monofett_400Regular } from '@expo-google-fonts/monofett';

console.log(`(React version: ${React.version})`);

export default () => {
  const [appReady, setAppReady] = useState(false);
  const [sounds, setSounds] = useState(null);

  let [cutiveLoaded] = useFonts({
    CutiveMono_400Regular,
  });

  let [fettLoaded] = useFonts({
    Monofett_400Regular,
  });

  // gather what to load
  const dependencies = [sounds, cutiveLoaded, fettLoaded];

  // on mount
  useEffect(() => {
    // get sounds once
    getSounds(res => setSounds(res));
  }, []);

  // on load
  useEffect(() => {
    // check if all loaded
    if (!dependencies.some(dep => !dep)) {
      setAppReady(true);
    }
  }, dependencies);

  if (!appReady) {
    return (
      <View>
        <Loading textContent="Initializing game" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <FirebaseContext.Provider value={new Firebase()}>
        <GameState sounds={sounds}>
          <PaperProvider>
            <Header />

            <Nav />
          </PaperProvider>
        </GameState>
      </FirebaseContext.Provider>
    </NavigationContainer>
  );
};
