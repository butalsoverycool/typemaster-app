import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import GameState from './components/GameState';
import getSounds, { loadSound } from './constants/getSounds';
import Header from './components/Header';
import Nav from './components/Nav';

import { playSound } from './constants/helperFuncs';
import getImgs from './constants/imgs';

import Firebase, { FirebaseContext } from './components/Firebase';
import { useFonts } from 'expo-font';
import { CutiveMono_400Regular } from '@expo-google-fonts/cutive-mono';

import { Monofett_400Regular } from '@expo-google-fonts/monofett';

import Splash from './components/Splash';

const introSoundFile = require('./assets/audio/main.mp3');

console.log(`(React version: ${React.version})`);

export default () => {
  const [appReady, setAppReady] = useState(false);
  const [splashRunning, setSplashRunning] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [introSound, setIntroSound] = useState(null);
  const [sounds, setSounds] = useState(null);
  const [imgs, setImgs] = useState(null);

  const [startTimeout, setStartTimeout] = useState(null);

  let [cutiveMono] = useFonts({
    CutiveMono_400Regular,
  });

  let [monoFett] = useFonts({
    Monofett_400Regular,
  });

  // appReady-dependencies
  const dependencies = [
    introSound,
    sounds,
    cutiveMono,
    monoFett,
    splashRunning,
    imgs,
  ];

  // on mount
  useEffect(() => {
    // get intro-sound
    loadSound({ file: introSoundFile, name: 'main' }, sound => {
      setIntroSound(sound);

      // then game sounds
      getSounds(sounds => setSounds(sounds));

      // load/cache imgs
      getImgs({ cb: imgs => setImgs(imgs) });
    });

    // cleanup worker
    return () => {
      clearTimeout(startTimeout);
    };
  }, []);

  // play intro-sound when available
  useEffect(() => {
    if (introSound) {
      playSound({ sound: introSound });
    }
  }, [introSound]);

  // on dependencies-update
  useEffect(() => {
    // all loaded = app ready
    if (!dependencies.some(dep => !dep)) {
      // buy splash some time
      setStartTimeout(
        setTimeout(() => {
          setAppReady(true);
        }, 1200)
      );
    }
  }, dependencies);

  if (!introSound) return null;

  if (!splashDone || !appReady) {
    return (
      <View>
        <Splash
          enterCallback={() => setSplashRunning(true)}
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
        <GameState sounds={sounds} imgs={imgs}>
          <PaperProvider>
            <Header />

            <Nav />
          </PaperProvider>
        </GameState>
      </FirebaseContext.Provider>
    </NavigationContainer>
  );
};
