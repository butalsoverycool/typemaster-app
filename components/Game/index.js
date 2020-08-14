import React, { Component, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import theme from '../../constants/theme';
import { withState } from '../GameState';
import { propsChanged } from '../../constants/helperFuncs';

import Msg from './Msg';
import Status from './Status';
import Material from './Material';
import Action from './Action';

import CancelGame from './CancelGame';
import Typer from './Typer';
import Level from './Level';

import { View, Section } from '../Elements';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#eee',
  },
});

class Game extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameON,',
      'gameStandby',
      'gamePaused',
      'material',
    ]);

  render() {
    const { gameON, gameStandby, gamePaused, material } = this.props.gameState;

    return (
      <View>
        <Msg />

        {(gameStandby || gameON || gamePaused) && <Status />}

        {(gameStandby || gameON || gamePaused) && <CancelGame />}

        {!gameStandby && !gameON && <Typer />}

        {!gameStandby && !gameON && <Level />}

        <Material />

        {material.title && (
          <Section flex={1} justify="center">
            <Action />
          </Section>
        )}
      </View>
    );
  }
}

const Memo = memo(p => <Game {...p} />);

export default withState(Memo);
