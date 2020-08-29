import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

import GameState from './components/GameState';
import getSounds from './constants/getSounds';
import Header from './components/Header';
import Nav from './components/Nav';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Section } from './components/Elements';

import Firebase, { FirebaseContext } from './components/Firebase';
import {
  useFonts,
  CutiveMono_400Regular,
} from '@expo-google-fonts/cutive-mono';

import { Monofett_400Regular } from '@expo-google-fonts/monofett';

const REACT_VERSION = React.version;
console.log('react version:', REACT_VERSION);

export default () => {
  const [appReady, setAppReady] = useState(false);

  let [cutiveLoaded] = useFonts({
    CutiveMono_400Regular,
  });

  let [fettLoaded] = useFonts({
    Monofett_400Regular,
  });
  const [sounds, setSounds] = useState(null);

  const init = async () => {
    getSounds(res => setSounds(res));
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (cutiveLoaded && sounds) {
      setAppReady(true);
    }
  }, [cutiveLoaded, fettLoaded, sounds]);

  if (!appReady) {
    return <AppLoading />;
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
