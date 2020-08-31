import { Image, Text, Dimensions, Animated } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

import GameState from './components/GameState';
import getSounds, { loadSound } from './constants/getSounds';
import Header from './components/Header';
import Nav from './components/Nav';

import { playSound } from './constants/helperFuncs';

import { View, Loading, Section, Anim } from './components/Elements';

import { Asset } from 'expo-asset';

import Firebase, { FirebaseContext } from './components/Firebase';
import { useFonts } from 'expo-font';
import { CutiveMono_400Regular } from '@expo-google-fonts/cutive-mono';

import { Monofett_400Regular } from '@expo-google-fonts/monofett';

import * as SplashScreen from 'expo-splash-screen';

import Splash from './components/Splash';

const tensionFile = require('./assets/audio/tension.mp3');

//const splash = require('./assets/imgs/typemaster_splash.png');

console.log(`(React version: ${React.version})`);

export default () => {
  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [tension, setTension] = useState(null);
  const [sounds, setSounds] = useState(null);
  const [splashVisible, setSplashVisible] = useState(false);

  const [splash, setSplash] = useState(null);
  const [splashReady, setSplashReady] = useState(false);

  let [cutiveLoaded] = useFonts({
    CutiveMono_400Regular,
  });

  let [fettLoaded] = useFonts({
    Monofett_400Regular,
  });

  // gather what to load
  const dependencies = [
    tension,
    sounds,
    cutiveLoaded,
    fettLoaded,
    splashVisible,
  ];

  // on mount
  useEffect(() => {
    loadSound(tensionFile, tension => setTension(tension));
    // get sounds once
    getSounds(res => setSounds(res));
  }, []);

  useEffect(() => {
    if (tension) {
      playSound({ sound: tension });
    }
  }, [tension]);

  // on load
  useEffect(() => {
    // check if all loaded
    if (!dependencies.some(dep => !dep)) {
      setTimeout(() => {
        setAppReady(true);
      }, 1200);
    }
  }, dependencies);

  useEffect(() => {
    if (appReady) {
      //SplashScreen.hideAsync();
    }
  }, [appReady]);

  //if (!splash) return null;

  if (!tension) return null;

  if (!splashDone || !appReady) {
    return (
      <View>
        <Splash
          enterCallback={() => setSplashVisible(true)}
          exitOn={appReady}
          exitCallback={() => setSplashDone(true)}
        />
        {/* <Loading textContent="Initializing game" /> */}
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
