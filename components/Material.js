import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Card, Overlay } from 'react-native-elements';

import { withState } from './GameState';
import { pickMaterial } from '../constants/helperFuncs';
import UserInput from './UserInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    textAlign: 'center',

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingTop: 15,
  },
  material: {
    padding: 5,
  },
  typed: {
    color: 'green',
    fontWeight: '700',
  },
  notTyped: {},
});

const Material = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const { gameReady, gameON, material, charIndex } = gameState;
  const { endGame } = gameSetters;

  const typed = material.substring(0, charIndex);
  const notTyped = material.substring(charIndex);

  const clickHandler = () => {
    alert('Sorry, game ended');
    endGame();
  };

  return gameReady ? (
    <View style={styles.container}>
      <Text style={styles.material}>
        <Text style={styles.typed}>{typed}</Text>
        <Text style={styles.notTyped}>{notTyped}</Text>
      </Text>
      <UserInput />
    </View>
  ) : null;
};

export default withState(Material);
