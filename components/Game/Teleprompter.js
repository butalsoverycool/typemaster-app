import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { withState } from '../GameState';

const localStyles = StyleSheet.create({
  material: { fontSize: 20, flexShrink: 1 },
  typed: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: '700',
  },
  notTyped: {},
});

const Teleprompter = ({ gameState: { typed }, gameSetters }) => (
  <View>
    <Text style={localStyles.material}>
      <Text style={localStyles.typed}>{typed.output}</Text>
      <Text style={localStyles.notTyped}>{typed.remaining}</Text>
    </Text>
  </View>
);

export default withState(Teleprompter);
