import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import { withState } from '../GameState';
import Time from './Time';
import Points from './Points';
import styles from './styles';

const Status = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { gameStandby, gameON, points, time } = gameState;

  //if (!gameON && gameStandby) return null;

  return (
    <View style={styles.section}>
      <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper}>
        <Time />

        <Points />
      </Card>
    </View>
  );
};

export default withState(Status);
