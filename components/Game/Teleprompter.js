import React, { Component, useRef, useEffect, useState, memo } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { usePrev, propsChanged } from '../../constants/helperFuncs';
import { withState } from '../GameState';
import { Section, Text, Anim } from '../Elements';

const getXMove = () => {
  let right = Math.random() >= 0.5;
  let res = Math.round(Math.random() * 80);

  return right ? res : -res;
};

const getScale = () => {
  let bigger = Math.random() >= 0.5;
  let res = Math.random() * (bigger ? 10 : 1);

  return res;
};

const TypedAnim = ({ char, ...props }) => {
  const [start, setStart] = useState(false);
  const [xMove, setXMove] = useState(getXMove());
  const [scale, setScale] = useState(getScale());

  useEffect(() => {
    if (char && char !== '' && !start) {
      setStart(true);
    }
  }, []);

  useEffect(() => {
    if (!start) {
      setStart(true);
    }
    setXMove(getXMove());
    setScale(getScale());
  }, [char]);

  return (
    <View style={styles.typedContainer}>
      <Anim
        enterOn={start}
        duration={{ in: 150, out: 0 }}
        easing={{ in: 'ease-out', out: 'ease' }}
        anim={{
          opacity: {
            fromValue: 1,
            toValue: 0,
          },
          transform: [
            {
              key: 'translateX',
              fromValue: 0,
              toValue: xMove,
            },
            {
              key: 'translateY',
              fromValue: 0,
              toValue: 30,
            },
            {
              key: 'scale',
              fromValue: 1,
              toValue: scale,
            },
          ],
        }}
        style={{ position: 'absolute', top: 0, right: 0 }}
        cb={() => setStart(false)}
      >
        <Text style={styles.typed}>{char}</Text>
      </Anim>
    </View>
  );
};

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

  const nextChar = typed.remaining[0];

  const remaining = typed.remaining.substring(1);

  return (
    <Section row fillW>
      {/* <Anim
        style={{
          flex: 1,
          width: '100%',
        }}
        duration={{ in: 200, out: 200 }}
        reRunOnChange={typed.typoCount}
        /* s 
        anim={{
          transform: [
            {
              key: 'translateX',
              fromValue: 0,
              toValue: 10,
            },
          ],
        }}
      > */}
      {/* <Text style={localStyles.material}> */}
      <Section
        row
        position="relative"
        fillw
        h={50}
        align="flex-start"
        style={{ overflow: 'hidden' }}
      >
        <TypedAnim char={typed.output[typed.output.length - 1]} />
        <View padding={0} w={8} justify="center" style={styles.nextContainer}>
          <Text style={styles.nextChar}>{nextChar}</Text>
        </View>
        <View style={{ flexWrap: 'nowrap', width: 'auto', height: 20 }}>
          <Text style={styles.remaining}>{remaining}</Text>
        </View>
      </Section>
      {/*  </Text> */}
      {/* </Anim> */}
    </Section>
  );
};

const MemoAnimated = memo(p => <AnimatedView {...p} />);

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

const Memo = memo(p => <Teleprompter {...p} />);

export default withState(Memo);

const styles = StyleSheet.create({
  material: { fontSize: 20, flexShrink: 1 },
  typedContainer: {
    width: 60,
    position: 'relative',
  },
  typed: {
    position: 'relative',
    top: 0,
    right: 10,
  },
  nextContainer: {
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#444',
    paddingTop: 0,
    paddingBottom: 0,
    width: 14,
  },
  nextChar: {
    color: '#eee',
    fontWeight: '700',
    textAlign: 'center',
  },
  remaining: {
    flex: 1,
    flexWrap: 'nowrap',
  },
});
