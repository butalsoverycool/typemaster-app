import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withState } from './GameState';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

const Header = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { gameStandby, gameON, msg } = gameState;

  //if (gameStandby || gameON) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type Master</Text>

      {props.children}
    </View>
  );
};

export default withState(Header);
