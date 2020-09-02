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

const TypedCorrect = ({ char, gameON, ...props }) => {
  const [firstRender, setFirstRender] = useState(true);
  const [start, setStart] = useState(false);
  const [rerunSwitch, setRerunSwitch] = useState(false);
  const [xMove, setXMove] = useState(getXMove());
  const [scale, setScale] = useState(getScale());

  // const xMove = useRef(new Animated.Value(0))
  // const scale = useRef(new Animated.Value(1))

  // const animate = () => {

  //     Animated.timing(xMove, {

  //     })
  // }

  useEffect(() => {
    /* if (char && char !== '' && !start) {
      setStart(true);
    }
    setFirstRender(false); */
  }, []);

  useEffect(() => {
    if (!gameON) return;

    // running
    if (char && char !== ' ' && start) {
      setRerunSwitch(!rerunSwitch);
    } else if (char !== ' ' && !start) {
      setStart(true);
    }
    // animate();
    setXMove(getXMove());
    setScale(getScale());
  }, [char]);

  return (
    <Section fillH style={[styles.typedContainer, { zIndex: 2 }]}>
      <Anim
        enterOn={start}
        rerunOnChange={rerunSwitch}
        duration={{ in: 600, out: 0 }}
        easing={{ in: 'ease-out', out: 'linear' }}
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
        style={{
          position: 'absolute',
          zIndex: 2,
          top: 0,
          right: 0,
          display: !gameON ? 'none' : 'block',
        }}
        enterCallback={() => setStart(false)}
      >
        <Text style={styles.typedCorrect}>{char}</Text>
      </Anim>
    </Section>
  );
};

const TypedTypo = ({ char, gameON, ...props }) => {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (char && char !== '') {
      setTrigger(!trigger);
    }
  }, [char]);

  return (
    <Section fillH style={styles.typedContainer}>
      <Anim
        rerunOnChange={trigger}
        /* hideOnExit={true} */
        duration={{ in: 1000, out: 0 }}
        easing={{ in: 'ease-out', out: 'linear' }}
        anim={{
          opacity: {
            fromValue: 1,
            toValue: 0,
          },
          /* transform: [
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
          ], */
        }}
        style={{
          display: !gameON ? 'none' : 'block',
        }}
        enterCallback={() => setStart(false)}
      >
        <Text style={styles.typedTypo}>{char}</Text>
      </Anim>
    </Section>
  );
};

const AnimatedView = ({ gameState: { typed, material, gameON }, ...props }) => {
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

  const wasTypo =
    typed.input[typed.input.length - 1] !== material.text[typed.index - 1];

  return (
    <Section row fillW fillH spaceTop align="flex-start">
      <Section
        row
        position="relative"
        fillw
        h={50}
        align="flex-start"
        style={{ overflowX: 'hidden', overflowY: 'visible' }}
      >
        <TypedTypo
          char={wasTypo ? typed.input[typed.input.length - 1] : ''}
          gameON={gameON}
        />

        <TypedCorrect
          char={typed.output[typed.output.length - 1]}
          gameON={gameON}
        />

        <View padding={0} w={8} justify="center" style={styles.nextContainer}>
          <Text style={styles.nextChar}>{nextChar}</Text>
        </View>
        <View style={{ flexWrap: 'nowrap', width: 'auto', height: 20 }}>
          <Text style={styles.remaining}>{remaining}</Text>
        </View>
      </Section>
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
    return <AnimatedView gameState={this.props.gameState} />;
  }
}

const Memo = memo(p => <Teleprompter {...p} />);

export default withState(Memo);

const styles = StyleSheet.create({
  material: { fontSize: 20, flexShrink: 1 },
  typedContainer: {
    width: 60,
    height: '100%',
    overflow: 'visible',
    position: 'relative',
  },
  typedCorrect: {
    position: 'absolute',
    zIndex: 99,
  },
  typedTypo: {
    fontSize: 30,
    color: 'red',
    textDecorationLine: 'line-through',
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
