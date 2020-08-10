import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Input } from 'react-native-elements';
import { withState } from '../GameState';
import { dynamicMsg } from '../../constants/preset';
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

  const inputHandler = char => {
    if (!char || char === undefined) return;

    if (!gameON) startGame();

    if (gameON && gamePaused) togglePauseGame();

    // if typo, -1 points
    if (char !== material.text[typed.index]) {
      setTypoCount(1);
      setPoints(-1);
      return;
    }

    // points
    setPoints(1);

    // update charIndex (+1)
    setTyped({
      index: typed.index + 1,
      input: material.text + char,
    });

    // done
    if (typed.index + 1 >= material.text.length) {
      endGame();
    }
  };

  const blurHandler = () => {
    endGame();

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
            onChangeText={value => inputHandler(value[value.length - 1])}
            onBlur={blurHandler}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default withState(UserInput);
