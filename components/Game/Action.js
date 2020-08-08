import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { withState } from '../GameState';
import styles from './styles';

const Action = ({ gameState, gameSetters, ...props }) => {
  if (!gameState || !gameSetters) return null;

  const { gameReady, gameON } = gameState;
  const { prepareGame, endGame } = gameSetters;

  return (
    <View style={styles.section}>
      <Card containerStyle={styles.card} wrapperStyle={styles.innerContainer}>
        <View style={styles.contentContainer}>
          {!gameReady /*  || gameON */ && (
            <Button
              title={!gameON ? 'Start' : 'Stop'}
              type="solid"
              containerStyle={{
                alignItems: 'center',
                width: '90%',
                borderRadius: 10,
              }}
              buttonStyle={{ backgroundColor: '#444' }}
              titleStyle={{ fontSize: 40, width: '100%' }}
              onPress={!gameON ? prepareGame : endGame}
            />
          )}
        </View>
      </Card>
    </View>
  );
};

export default withState(Action);
