import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { withState } from '../GameState';
import styles from './styles';
import theme from '../../constants/theme';
import Card from '../Elements/Card';

const Action = ({ gameState, gameSetters, ...props }) => {
  if (!gameState || !gameSetters) return null;

  const { gameStandby, gameON, gamePaused, gameFinished } = gameState;
  const { prepareGame, endGame } = gameSetters;

  return (
    <View style={styles.section}>
      <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper}>
        <View style={styles.contentContainer}>
          {!gameStandby && !gamePaused /*  || gameON */ && (
            <Button
              title={gameFinished ? 'Play again' : !gameON ? 'Start' : 'Stop'}
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
