import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withState } from '../GameState';
import styles from './styles';
import Time from './Time';
import Points from './Points';
import TypoCount from './TypoCount';
import Remaining from './Remaining';
import theme from '../../constants/theme';
import Card from '../Elements/Card';

const localStyles = StyleSheet.create({
  section: {
    width: '50%',
  },
});

const Status = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { gameStandby, gameON, points, time } = gameState;

  //if (!gameON && gameStandby) return null;

  return (
    <View style={theme.section}>
      <Card
        containerStyle={styles.card}
        wrapperStyle={[styles.cardWrapper, { flexWrap: 'wrap' }]}
      >
        <Time />

        <Points />

        <TypoCount />

        <Remaining />
      </Card>
    </View>
  );
};

export default withState(Status);
