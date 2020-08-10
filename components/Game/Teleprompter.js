import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
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

const Teleprompter = ({ gameState: { typed }, gameSetters }) => {
  let bgAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const animSeq = Animated.sequence([
    Animated.timing(bgAnim, {
      toValue: 1,
      duration: 100,
    }),
    Animated.timing(bgAnim, {
      toValue: 0,
      duration: 100,
    }),
  ]);

  useEffect(() => {
    animSeq.start();
  }, [typed.typoCount]);

  return (
    <Animated.View
      style={{
        backgroundColor: bgAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['#eee', 'red'],
        }),
      }}
    >
      <Text style={localStyles.material}>
        <Text style={localStyles.typed}>{typed.output}</Text>
        <Text style={localStyles.notTyped}>{typed.remaining}</Text>
      </Text>
    </Animated.View>
  );
};

export default withState(Teleprompter);
