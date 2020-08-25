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
  levelWithdrawal,
  bannedKeys,
} from '../../constants/preset';
import { randOfArr, propsChanged } from '../../constants/helperFuncs';
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

    this.onInput = this.onInput.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameON,',
      'gameStandby',
      'gamePaused',
      'material',
      'typed',
      'level',
    ]);

  onInput = e => {
    const {
      gameStandby,
      gameON,
      gamePaused,
      material,
      typed,
      level,
    } = this.props.gameState;

    const {
      inputHandler,
      startGame,
      endGame,
      createLatestScore,
    } = this.props.gameSetters;

    if (gameStandby && !gameON && !gamePaused) startGame();

    const char = e.nativeEvent.key;

    console.log('char', char);

    // bail if undefined input
    if (!char || char === undefined) return;

    // bail if banned key
    for (let nth = 0; nth < bannedKeys.length; nth++) {
      if (char === bannedKeys[nth]) {
        return;
      }
    }

    // update typed and points based on isTypo
    const isTypo = char !== material.text[typed.index];

    // game over
    if (isTypo && level >= 3) {
      const res = randOfArr(gameOverText);

      Alert.alert('Game Over', "Stella Pajunas doesn't accept errors", [
        {
          text: 'I can do better ' + res.emoji,
          style: 'cancel',
        },
      ]);

      return endGame();
    }

    const typedProps = {
      index: isTypo ? typed.index : typed.index + 1,
      input: typed.input + char,
      output: isTypo ? typed.output : typed.output + char,
      remaining: isTypo
        ? material.text.substring(typed.index)
        : material.text.substring(typed.index + 1),
      typoCount: isTypo ? typed.typoCount + 1 : typed.typoCount,
    };

    const pointsToAdd = isTypo ? levelWithdrawal[level] * 100 : 1;

    // points
    inputHandler({ pointsToAdd, typedProps });

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
    console.log('Rendering <UserInput />');
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
