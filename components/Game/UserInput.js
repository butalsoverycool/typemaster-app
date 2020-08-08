import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
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
    gameReady,
    gameON,
    material: { text },
    charIndex,
    points,
    msg,
  } = gameState;
  const { setPoints, setCharIndex, startGame, endGame } = gameSetters;

  if (!gameReady) return null;

  const inputHandler = char => {
    if (!char || char === undefined) return;

    if (!gameON) startGame();

    // if typo, -1 points
    if (char.toLowerCase() !== text[charIndex].toLowerCase()) {
      setPoints(-1);
      return;
    }

    // points
    setPoints(1);

    // update charIndex (+1)
    setCharIndex();

    // done
    if (charIndex + 1 >= text.length) {
      endGame();
    }
  };

  const blurHandler = () => {
    const res = randOfArr(gameOverText);

    Alert.alert('', 'Interaction outside keyboard', [
      {
        text: res.text + ' ' + res.emoji,
        style: 'cancel',
      },
    ]);

    endGame();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.section}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Input
            autoFocus={gameReady}
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
