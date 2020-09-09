import React, { Component, useRef, useEffect, useState, memo } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Animated, View } from 'react-native';
import { usePrev, propsChanged } from '../../constants/helperFuncs';
import { withState } from '../GameState';
import { Section, Text, Anim } from '../Elements';
import Stars from './Stars';

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

const TypedCorrect = ({
  char,
  gameON,
  gameStandby,
  gamePaused,
  autoStart = false,
  onExit,
  remaining,
  ...props
}) => {
  //if (!gameON || remaining.length <= 1) return null;

  const [start, setStart] = useState(false);
  const [rerunSwitch, setRerunSwitch] = useState(false);
  const [xMove, setXMove] = useState(getXMove());
  const [scale, setScale] = useState(getScale());

  useEffect(() => {
    let bail = false;

    // running
    if (char && char !== ' ' && start && !bail) {
      setRerunSwitch(!rerunSwitch);
    } else if (char !== ' ' && !start && !bail) {
      console.log('remaining', remaining.length);
      setStart(true);
    }

    // animate();
    setXMove(getXMove());
    setScale(getScale());

    return () => {
      if (!gameON || remaining.length <= 2)
        console.log('Cleaning up TypedCorrect');

      return !gameON || gameStandby || remaining.length <= 1
        ? (bail = true)
        : null;
    };
  }, [char]);

  return (
    <Section
      fillH
      style={[styles.typedContainer, { zIndex: 2, position: 'absolute' }]}
    >
      <Anim
        enterOn={start}
        rerunOnChange={rerunSwitch}
        hideOnExit={true}
        bailOn={!gameON || remaining.length <= 2}
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
        enterCallback={() => {
          setStart(false);
          if (typeof onExit === 'function') onExit();
        }}
        enterCallbackDelay={1000}
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
    <Section h={30} fillW justify="center" align="center">
      <Anim
        rerunOnChange={trigger}
        duration={{ in: 1000, out: 0 }}
        easing={{ in: 'ease-out', out: 'linear' }}
        anim={{
          opacity: {
            fromValue: 1,
            toValue: 0,
          },
        }}
        style={{
          display: !gameON ? 'none' : 'block',
        }}
      >
        <Text style={styles.typedTypo}>{char}</Text>
      </Anim>
    </Section>
  );
};

const AnimatedView = ({
  gameState: { achievements, typed, material, gameON },
  ...props
}) => {
  let bgAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  let firstRender = useRef(true); // Initial value for opacity: 0

  const prevTypoCount = usePrev(typed.typoCount);

  const [correctArr, setCorrectArr] = useState([]);
  const [charArr, setCharArr] = useState([]);

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
    setCharArr(
      material.text.split('').map(char => ({ char, enter: false, exit: false }))
    );
  }, []);

  useEffect(() => {
    if (!gameON) return;

    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (prevTypoCount !== typed.typoCount) {
        animSeq.start();
      }
    }
  }, [typed.typoCount]);

  useEffect(() => {
    if (!gameON) return;

    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (charArr.length > 0 && typed.index > 0) {
        let newArr = charArr;
        newArr[typed.index].enter = true;

        setCharArr(newArr);
      }
    }
  }, [typed.output]);

  const nextChar = typed.remaining[0];

  const remaining = typed.remaining.substring(1);

  const wasTypo =
    typed.input[typed.input.length - 1] !== material.text[typed.index - 1];

  console.log('correct length', correctArr.length);

  const success =
    !wasTypo && achievements.words >= 10 && achievements.words % 10 === 0
      ? true
      : false;

  return (
    <Section fillW align="flex-start" padding={0} style={{ maxWidth: '100%' }}>
      <TypedTypo
        char={wasTypo ? typed.input[typed.input.length - 1] : ''}
        gameON={gameON}
      />
      <Section
        row
        position="relative"
        fillW
        h={50}
        justify="flex-start"
        align="flex-start"
        style={{ overflowX: 'hidden', overflowY: 'visible', zIndex: 2 }}
      >
        <Section style={styles.typedContainer}>
          {charArr.map((item, nth) => {
            if (item.enter !== true) return null;

            return (
              <TypedCorrect
                key={nth}
                /* ref={item.ref} */
                autoStart
                char={item.char}
                gameON={gameON}
                remaining={typed.remaining}
                onExit={() => {
                  const newArr = charArr;
                  charArr[nth].enter = false;

                  setCharArr(newArr);
                }}
              />
            );
          })}
        </Section>

        <Section row>
          <View padding={0} w={8} style={styles.nextContainer}>
            <Text style={styles.nextChar}>{nextChar}</Text>
          </View>
          <View
            style={{
              flexWrap: 'nowrap',
              width: 'auto',
              height: 16,
              justifyContent: 'center',
            }}
          >
            <Text style={styles.remaining}>{remaining}</Text>
          </View>
        </Section>
      </Section>
      <Stars />
    </Section>
  );
};

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
    overflow: 'visible',
    position: 'relative',
    zIndex: 5,
    backgroundColor: 'rgba(0,0,0,0)',
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
    textAlign: 'left',
  },
});
