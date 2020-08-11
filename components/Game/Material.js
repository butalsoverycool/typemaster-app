import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { withState } from '../GameState';
import UserInput from './UserInput';
import theme from '../../constants/theme';
import styles from './styles';
import { levels } from '../../constants/options';
import library from '../../constants/library';
import Teleprompter from './Teleprompter';
import Preview from './Preview';
import TextList from './TextList';
import Card from '../Elements/Card';

import ScoreBoard from '../ScoreBoard';

const localStyles = StyleSheet.create({
  material: { fontSize: 20, flexShrink: 1 },
  typed: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: '700',
  },
  notTyped: {},

  textItem: { fontSize: 20, color: 'black' },
});

const Material = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    gameStandby,
    gameON,
    gamePaused,
    gameFinished,
    material: { title = '', text = '' },
    typed,
    settings,
  } = gameState;
  const { endGame, setMaterial } = gameSetters;

  /* const typed = text.substring(0, charIndex);
  const notTyped = text.substring(charIndex); */

  const [choice, setChoice] = useState({});

  const clickHandler = () => {
    alert('Sorry, game ended');
    endGame();
  };

  return (
    <View style={[styles.section, {}]}>
      <Card
        containerStyle={styles.card}
        wrapperStyle={[
          styles.cardWrapper,
          {
            alignItems: 'flex-start',
          },
        ]}
      >
        <View>
          {gamePaused ? null : gameStandby || gameON ? (
            <Teleprompter />
          ) : title && text ? (
            <Preview />
          ) : (
            <TextList />
          )}
        </View>
      </Card>
      <UserInput />
    </View>
  );
};

export default withState(Material);
