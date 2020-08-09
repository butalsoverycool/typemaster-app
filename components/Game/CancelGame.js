import React from 'react';
import { withState } from '../GameState';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card, Button, Image } from 'react-native-elements';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import styles from './styles';
import Icon from '../Icon';

const localStyles = {
  section: {
    maxHeight: 60,
  },
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
    top: -30,
    flex: 1,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
};

const CancelGame = ({ gameState, gameSetters }) => {
  const { gameON, gamePaused } = gameState;
  const { prepareGame, togglePauseGame, endGame } = gameSetters;

  return (
    <View style={[styles.section, localStyles.section]}>
      <Card
        containerStyle={styles.card}
        wrapperStyle={[styles.cardWrapper, { justifyContent: 'space-around' }]}
      >
        {gameON && (
          <View>
            <Icon
              name={gamePaused ? 'play-circle' : 'pause-circle'}
              color={gamePaused ? 'green' : 'orange'}
              onPress={togglePauseGame}
              label={gamePaused ? 'continue' : 'pause'}
            />
          </View>
        )}

        <Icon
          name="stop"
          size={50}
          color="red"
          onPress={endGame}
          label="quit"
        />
      </Card>
    </View>
  );
};

export default withState(CancelGame);
