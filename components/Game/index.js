import React, { Component, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import theme from '../../constants/theme';
import { withFirebase } from '../Firebase/context';
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

import SignIn from '../SignIn';

import Spinner from 'react-native-loading-spinner-overlay';

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
      'signInForm',
      'signUpForm',
      'typer',
      'loading',
      'authUser',
    ]);

  render() {
    const { gameState } = this.props;

    const {
      gameON,
      gameStandby,
      gamePaused,
      material,
      user,
      signInForm,
      signUpForm,
      loading,
      authUser,
    } = gameState;

    //if (!loading && !authUser) return <SignIn />;

    return (
      <View>
        {loading ? (
          <Section flex={1} justify="center" align="center">
            <Spinner
              visible={loading}
              color="#444"
              animation="slide"
              children={null}
              textContent="Checking last game..."
            />
            {/*  <Text style={theme.title}>Checking last game...</Text> */}
          </Section>
        ) : authUser ? (
          <Section padding={0} flex={1}>
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
          </Section>
        ) : (
          <SignIn />
        )}
      </View>
    );
  }
}

const Memo = memo(p => <Game {...p} />);

export default withState(Memo);
