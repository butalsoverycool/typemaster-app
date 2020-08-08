import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import { withState } from '../GameState';
import Time from './Time';
import Points from './Points';
import styles from './styles';

const Status = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { gameReady, gameON, points, time } = gameState;

  //if (!gameON && gameReady) return null;

  return (
    <View style={styles.section}>
      <Card containerStyle={styles.card} wrapperStyle={styles.innerContainer}>
        <Time />

        <Points />
      </Card>
    </View>
  );
};

export default withState(Status);
