import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withState } from '../GameState';
import styles from './styles';
import theme from '../../constants/theme';
import { Section, Card, Button, Btn } from '../Elements';

const Action = ({ gameState, gameSetters, ...props }) => {
  if (!gameState || !gameSetters) return null;

  const { gameStandby, gameON, gamePaused, gameFinished } = gameState;
  const { prepareGame, endGame } = gameSetters;

  return (
    <Section>
      <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper}>
        <Section row justify="center" align="center">
          {!gameStandby && !gamePaused /*  || gameON */ && (
            <Btn
              content={gameFinished ? 'Play again' : !gameON ? 'Start' : 'Stop'}
              type="outline"
              buttonStyle={{ maxWidth: '80%' }}
              w={400}
              h={100}
              onPress={!gameON ? prepareGame : endGame}
            />
          )}
        </Section>
      </Card>
    </Section>
  );
};

export default withState(Action);
