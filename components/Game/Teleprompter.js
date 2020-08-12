import React, { Component, useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { usePrev, propsChanged } from '../../constants/helperFuncs';
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

const AnimatedView = ({ typed, ...props }) => {
  let bgAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  let firstRender = useRef(true); // Initial value for opacity: 0

  const prevTypoCount = usePrev(typed.typoCount);

  const animSeq = Animated.sequence([
    Animated.timing(bgAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }),
    Animated.timing(bgAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }),
  ]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (prevTypoCount !== typed.typoCount) {
        animSeq.start();
      }
    }
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

class Teleprompter extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, ['typed']);

  render() {
    const { typed } = this.props.gameState;

    return <AnimatedView typed={typed} />;
  }
}

export default withState(Teleprompter);
