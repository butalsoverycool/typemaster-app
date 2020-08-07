import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { withState } from './GameState';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  title: {
    marginRight: 5,
  },
  badgeStyle: { flex: 1, width: 80 },
});

const Points = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { points } = gameState;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Points</Text>
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
    </View>
  );
};

export default withState(Points);
