import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { withState } from './GameState';
import Time from './Time';
import Points from './Points';

const styles = StyleSheet.create({
  card: { height: 40 },
  innerContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badgeContainer: { marginTop: 5 },
  badge: { padding: 10 },
});

const Status = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { gameReady, gameON, points, time } = gameState;

  //if (!gameON && gameReady) return null;

  return (
    <Card containerStyle={styles.card} wrapperStyle={styles.innerContainer}>
      <Time />
      <Points />
    </Card>
  );
};

export default withState(Status);
