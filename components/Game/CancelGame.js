import React from 'react';
import { withState } from '../GameState';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';

const styles = {
  button: (props = {}) => ({
    color: props.color || 'red',
  }),
  TouchableOpacityStyle: {
    position: 'absolute',
    width: '100%',
    height: 50,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    left: 0,
    top: 0,
    flex: 1,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,

    height: 50,
    //backgroundColor:'black'
  },
};

const CancelGame = ({ gameState, gameSetters }) => {
  const { gameON, gamePaused } = gameState;
  const { togglePauseGame, endGame } = gameSetters;

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.TouchableOpacityStyle}>
      {gamePaused ? (
        <View>
          <Text>Type to continue</Text>
        </View>
      ) : (
        <IconFill name="pause-circle" size={50} onPress={togglePauseGame} />
      )}
      <IconFill name="stop" size={50} onPress={endGame} />
    </TouchableOpacity>
  );
};

export default withState(CancelGame);
