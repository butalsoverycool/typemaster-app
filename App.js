import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import GameState from './components/GameState';
import getSounds, { loadSound } from './constants/getSounds';
import Header from './components/Header';
import Nav from './components/Nav';

import { loadSounds, playSound } from './constants/helperFuncs';
import getImgs from './constants/imgs';

import Firebase, { FirebaseContext } from './components/Firebase';
import { useFonts } from 'expo-font';
import { CutiveMono_400Regular } from '@expo-google-fonts/cutive-mono';

import { Monofett_400Regular } from '@expo-google-fonts/monofett';
import {
  CourierPrime_400Regular,
  CourierPrime_400Regular_Italic,
  CourierPrime_700Bold,
  CourierPrime_700Bold_Italic,
} from '@expo-google-fonts/courier-prime';

import Splash from './components/Splash';

const introSoundFile = require('./assets/audio/main.mp3');

console.log(`(React version: ${React.version})`);

export default () => {
  console.log('APP RENDER');
  const [appReady, setAppReady] = useState(false);
  const [splashRunning, setSplashRunning] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [introSound, setIntroSound] = useState(null);
  const [sounds, setSounds] = useState(null);
  const [imgs, setImgs] = useState(null);

  let [fonts] = useFonts({
    Monofett_400Regular,
    CutiveMono_400Regular,

    CourierPrime_400Regular,
    CourierPrime_400Regular_Italic,
    CourierPrime_700Bold,
    CourierPrime_700Bold_Italic,
  });

  // appReady-dependencies
  const dependencies = useMemo(() => {
    return [
      { name: 'introSound', status: !!introSound },
      { name: 'sounds', status: !!sounds },
      { name: 'fonts', status: !!fonts },
      { name: 'splashRunning', status: splashRunning },
      { name: 'imgs', status: !!imgs },
    ];
  }, [introSound, sounds, fonts, splashRunning, imgs]);

  const loadIntroSound = async () => {
    const sound = await loadSound({
      file: introSoundFile,
      name: 'main',
    });
    setIntroSound(sound.file);
  };

  const loadGameSounds = async () => {
    const gameSounds = await getSounds();
    setSounds(gameSounds);
  };

  const loadImgs = async () => {
    const gameImgs = await getImgs({ cb: imgs => setImgs(imgs) });
    setImgs(gameImgs);
  };

  // on mount
  useEffect(() => {
    // get intro-sound
    loadIntroSound();

    // then game sounds
    loadGameSounds();

    // load/cache imgs
    loadImgs();
  }, []);

  // play intro-sound when available
  useEffect(() => {
    console.log('playing intro', introSound);
    introSound && playSound({ sound: introSound });
  }, [introSound]);

  // on dependencies-update
  useEffect(() => {
    console.log('deps dummy', dependencies);

    console.log('IMG RES', imgs);
    console.log('SOUND RES', sounds);
    // all loaded = app ready
    let startTimeout;
    if (!dependencies.some(dep => !dep)) {
      console.log('app deps!');
      // buy splash some time
      startTimeout = setTimeout(() => {
        setAppReady(true);
      }, 1200);
    }

    // cleanup worker
    return () => clearTimeout(startTimeout);
  }, dependencies);

  return (
    introSound && (
      <View style={{ flex: 1 }}>
        {(!splashDone || !appReady) && (
          <Splash
            enterCallback={() => setSplashRunning(true)}
            exitOn={appReady}
            exitCallback={() => setSplashDone(true)}
          />
        )}
        <NavigationContainer>
          <FirebaseContext.Provider value={new Firebase()}>
            <GameState
              sounds={sounds}
              imgs={imgs}
              appReady={appReady && splashDone}
            >
              <PaperProvider>
                <Header />

                <Nav />
              </PaperProvider>
            </GameState>
          </FirebaseContext.Provider>
        </NavigationContainer>
      </View>
    )
  );
};
