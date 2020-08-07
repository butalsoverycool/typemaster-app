import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { withState } from './GameState';

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

  const { gameReady, gameON, material, charIndex, points, msg } = gameState;
  const { setPoints, setCharIndex, startGame, endGame } = gameSetters;

  if (!gameReady) return null;

  const inputHandler = char => {
    if (!char || char === undefined) return;

    if (!gameON) startGame();

    // if typo, -1 points
    if (char.toLowerCase() !== material[charIndex].toLowerCase()) {
      setPoints(-1);
      return;
    }

    // points
    setPoints(1);

    // update charIndex (+1)
    setCharIndex();

    // done
    if (charIndex + 1 >= material.length) {
      endGame();
    }
  };

  const blurHandler = () => {
    alert('Sorry, game was interupted. Please start over.');
    endGame();
  };

  return (
    <View style={styles.container}>
      <Input
        autoFocus={gameReady}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChangeText={value => inputHandler(value[value.length - 1])}
        onBlur={blurHandler}
      />
    </View>
  );
};

export default withState(UserInput);
