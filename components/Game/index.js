import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withState } from '../GameState';
import Msg from '../Msg';
import Status from './Status';
import Material from './Material';
import Action from './Action';

import CancelGame from './CancelGame';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#eee',
  },
});

const Main = ({ gameState: { gameON, gameReady, material }, ...props }) => (
  <View style={styles.container}>
    {/* <Msg /> */}
    {gameON && <CancelGame />}

    <Status />

    <Material />
    {material.title && <Action />}
  </View>
);

export default withState(Main);
