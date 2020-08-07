import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { withState } from './GameState';

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
});

const Action = ({ gameState, gameSetters, ...props }) => {
  if (!gameState || !gameSetters) return null;

  const { gameReady, gameON } = gameState;
  const { prepareGame, endGame } = gameSetters;

  return (
    <View style={styles.container}>
      {(!gameReady || gameON) && (
        <Button
          title={!gameON ? 'Start' : 'Stop'}
          onPress={!gameON ? prepareGame : endGame}
        />
      )}
      {/* <Text>Game ready: {String(gameState.gameReady)}</Text>
      <Text>Game ON: {String(gameState.gameON)}</Text> */}
    </View>
  );
};

export default withState(Action);
