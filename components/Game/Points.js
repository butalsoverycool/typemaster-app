import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { withState } from '../GameState';
import styles from './styles';

const Points = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { points } = gameState;

  return (
    <View style={styles.contentContainer}>
      <Badge
        value={points}
        status={
          points < 0
            ? 'error'
            : points < 5
            ? 'warning'
            : points < 10
            ? 'primary'
            : 'success'
        }
        badgeStyle={styles.badgeStyle}
        textStyle={{ fontSize: 20 }}
      />
      <Text style={styles.label}>Points</Text>
    </View>
  );
};

export default withState(Points);
