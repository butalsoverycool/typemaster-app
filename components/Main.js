import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withState } from './GameState';
import Msg from './Msg';
import Status from './Status';
import Material from './Material';
import Action from './Action';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  title: {},
});

const Main = props => (
  <View style={styles.container}>
    <Msg />
    <Status />

    <Material />

    <Action />
  </View>
);

export default withState(Main);
