import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Input } from 'react-native-elements';
import { withState } from '../GameState';
import {
  dynamicMsg,
  levelWithdrawal,
  bannedKeys,
} from '../../constants/preset';
import { randOfArr } from '../../constants/helperFuncs';

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

const UserInput = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    gameStandby,
    gameON,
    gamePaused,
    material,
    typed,
    points,
    msg,
    settings,
  } = gameState;
  const {
    setPoints,
    setTyped,
    setTypoCount,
    startGame,
    endGame,
    togglePauseGame,
  } = gameSetters;

  if (!gameStandby) return null;

  const inputHandler = e => {
    const char = e.nativeEvent.key;

    if (!char || char === undefined) return;

    for (let nth = 0; nth < bannedKeys.length; nth++) {
      if (char === bannedKeys[nth]) {
        const res = randOfArr(gameOverText);

        return;
      }
    }

    if (!gameON) startGame();

    if (gameON && gamePaused) togglePauseGame();

    // update typed and points based on isTypo
    const isTypo = char !== material.text[typed.index];

    // game over
    if (isTypo && settings.level >= 3) {
      const res = randOfArr(gameOverText);

      Alert.alert('Game Over', "Stella Pajunas doesn't accept errors", [
        {
          text: 'I can do better ' + res.emoji,
          style: 'cancel',
        },
      ]);

      return endGame();
    }

    const newTyped = {
      index: isTypo ? typed.index : typed.index + 1,
      input: typed.input + char,
      output: isTypo ? typed.output : typed.output + char,
      remaining: isTypo
        ? material.text.substring(typed.index)
        : material.text.substring(typed.index + 1),
      typoCount: isTypo ? typed.typoCount + 1 : typed.typoCount,
    };

    const newPoints = isTypo ? levelWithdrawal[settings.level] * 100 : 1;

    // points
    setPoints(newPoints);

    // update charIndex (+1)
    setTyped(newTyped);

    // finish-line
    if (newTyped.remaining.length <= 0) {
      endGame();
    }
  };

  const blurHandler = () => {
    if (gameON) return endGame();

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
            /* onChangeText={value => inputHandler(value[value.length - 1], value)} */
            onBlur={blurHandler}
            onKeyPress={inputHandler}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default withState(UserInput);