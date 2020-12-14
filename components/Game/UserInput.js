import React, { Component, memo } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { withState } from '../GameState';
import {
  dynamicMsg,
  withdrawal,
  reward,
  bannedKeys,
} from '../../constants/preset';
import {
  randOfArr,
  mathRandInc,
  propsChanged,
  playSound,
} from '../../constants/helperFuncs';
import Input from '../Elements/Input';

const { gameOverText } = dynamicMsg;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    margin: 10,
    opacity: 0,
  },
  input: { fontSize: 12 },
});

class UserInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickingMs: 100,
      timer: null,
      ticking: null,
      quote: false,
    };

    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);

    this.onInput = this.onInput.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.typeSound = this.typeSound.bind(this);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameON,',
      'gameStandby',
      'gamePaused',
      'material',
      'typed',
      'level',
      'muted',
      'time',
      'latestScore',
    ]);

  componentWillUnmount = () => {
    this.stopTimer();
  };

  tick() {
    this.props.gameSetters.addTick();
  }

  startTimer() {
    let timer = setInterval(this.tick, this.state.tickingMs);
    this.setState({ timer }, () => console.log('Timer started!'));
  }

  stopTimer() {
    clearInterval(this.state.timer);
    console.log('Timer stopped!');
    //this.setState({ timer: null });
  }

  typeSound(name) {
    /* const { playSound } = this.props.gameSetters;

    playSound(name); */
  }

  onInput = e => {
    const {
      gameStandby,
      gameON,
      gamePaused,
      material,
      typed,
      achievements,
      level,
      muted,
    } = this.props.gameState;

    const {
      inputHandler,
      startGame,
      endGame,
      createLatestScore,
      setGameState,
      playSound,
    } = this.props.gameSetters;

    if (gameStandby && !gameON && !gamePaused) {
      this.startTimer();
      startGame();
    }

    if (this.state.quote) return this.setState({ quote: false });

    const char = e.nativeEvent.key;

    // temp workaround for quote-character registering event twice :'(
    if (
      char === "'" ||
      char === '´' ||
      char === '`' ||
      char === '’' ||
      char === '‘' ||
      char === '"' ||
      char === '“' ||
      char === '”'
      /* &&
      (typed.output[typed.output.length - 1] === "'" ||
        typed.output[typed.output.length - 1] === '´' ||
        typed.output[typed.output.length - 1] === '`' ||
        typed.output[typed.output.length - 1] === '’' ||
        typed.output[typed.output.length - 1] === '‘') */
    ) {
      this.setState({ quote: true });
    }

    console.log('Input char:', char);

    // bail if undefined input
    if (!char || char === undefined) return;

    // bail if banned key
    for (let nth = 0; nth < bannedKeys.length; nth++) {
      if (char === bannedKeys[nth]) {
        return;
      }
    }

    // update typed and points based on isTypo
    let isTypo = char !== material.text[typed.index];

    if (
      (char === "'" ||
        char === '´' ||
        char === '`' ||
        char === '’' ||
        char === '‘') &&
      (material.text[typed.index] === "'" ||
        material.text[typed.index] === '´' ||
        material.text[typed.index] === '`' ||
        material.text[typed.index] === '’' ||
        material.text[typed.index] === '‘')
    ) {
      isTypo = false;
    }

    const remaining = isTypo
      ? material.text.substring(typed.index)
      : material.text.substring(typed.index + 1);

    // type/typo-sound
    if (remaining.length > 0) {
      // dont play if 3+ words in a row (pianoRoll)
      playSound({ name: isTypo ? 'gasp' : 'type' });
    }

    /* // game over
    if (isTypo && level >= 3) {
      const res = randOfArr(gameOverText);

      Alert.alert('Game Over', "Stella Pajunas doesn't accept errors", [
        {
          text: 'I can do better ' + res.emoji,
          style: 'cancel',
        },
      ]);

      return endGame();
    } */

    const typedProps = {
      index: isTypo ? typed.index : typed.index + 1,
      input: typed.input + char,
      output: isTypo ? typed.output : typed.output + char,
      remaining,
      typoCount: isTypo ? typed.typoCount + 1 : typed.typoCount,
      wasTypo: isTypo,
    };

    const pointsToAdd = isTypo ? withdrawal : reward;

    // points
    inputHandler({ pointsToAdd, typedProps, char });

    // finish-line
    if (typedProps.remaining.length <= 0) {
      //createLatestScore({ qualified: false });
      endGame({ gameFinished: true, cb: createLatestScore });
    }
  };

  onBlur = () => {
    const { gameON, typed, points } = this.props.gameState;

    const { endGame } = this.props.gameSetters;

    if (gameON) endGame({ gameFinished: false });

    if (points < -10) return;

    if (typed.index <= 0) return;

    const res = randOfArr(gameOverText);

    Alert.alert('Game ended', 'Interaction outside keyboard', [
      {
        text: res.text + ' ' + res.emoji,
        style: 'cancel',
      },
    ]);
  };

  render() {
    // console.log('Rendering <UserInput />');
    const { gameState } = this.props;

    if (!gameState) return null;

    const { gameStandby, gameON } = gameState;

    if (!gameStandby && !gameON) return null;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.section}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Input
              autoFocus={gameStandby}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              on={{ onKeyPress: this.onInput, onBlur: this.onBlur }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const Memo = memo(props => <UserInput {...props} />);

export default withState(Memo);
