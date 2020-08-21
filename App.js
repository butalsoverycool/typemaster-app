import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

import GameState from './components/GameState';
import Header from './components/Header';
import Nav from './components/Nav';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Section } from './components/Elements';

import Firebase, { FirebaseContext } from './components/Firebase';

const REACT_VERSION = React.version;
console.log('react version:', REACT_VERSION);

export default () => {
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
      <FirebaseContext.Provider value={new Firebase()}>
        <GameState>
          <PaperProvider>
            <Section flex={1} padding={0}>
              <Header />

              <Nav />
            </Section>
          </PaperProvider>
        </GameState>
      </FirebaseContext.Provider>
    </NavigationContainer>
  );
};
