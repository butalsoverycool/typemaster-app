import React, { Component, memo } from 'react';
import { StyleSheet, Image } from 'react-native';
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

import Spinner from 'react-native-loading-spinner-overlay';

import { View, Section, Anim, Loading, Text } from '../Elements';

import Form from '../Form';

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
      'typer',
      'loading',
      'authUser',
      'form',
      'nav',
    ]);

  render() {
    const {
      gameON,
      gameStandby,
      gamePaused,
      loading,
      authUser,
      form,
      material,
      nav,
    } = this.props.gameState;

    return (
      <View>
        {/* <Image
          source={this.props.gameState.imgs.About}
          style={{ width: 50, height: 50 }}
        /> */}
        <Anim
          enterOn={!loading && nav === 'Game'}
          hideOnExit={true}
          duration={{ in: 300, out: 200 }}
          easing={{ in: 'ease-out', out: 'ease' }}
          anim={{
            opacity: {
              fromValue: 0,
              toValue: 1,
            },
          }}
        >
          {/*  <Loading visible={loading === true} textContent="Loading..." /> */}
          {/* <Section justify="center" align="center">
            <Spinner
              visible={loading}
              color="#eee"
              overlayColor="#444"
              textStyle={{ color: '#eee' }}
              animation="fade"
              children={null}
              textContent="Checking last game..."
              cancelable={false}
            />
          </Section> */}

          <Anim
            enterOn={form !== null && form !== '' && !loading}
            exitOn={form === null || form === '' || loading}
            rerunOnChange={form}
            hideOnExit={true}
            duration={{ in: 700, out: 200 }}
            easing={{ in: 'bounce', out: 'ease' }}
            anim={{
              opacity: {
                fromValue: 0,
                toValue: 1,
              },
              transform: [
                {
                  key: 'translateY',
                  fromValue: 250,
                  toValue: 0,
                },
              ],
            }}
          >
            <Section flex={1} justify="center">
              <Form type={form} />
            </Section>
          </Anim>

          {authUser && (
            <Section flex={1} fillH fillW justify="space-between">
              {/* <Msg /> */}

              {(gameStandby || gameON || gamePaused) && <Status />}

              {(gameStandby || gameON || gamePaused) && <CancelGame />}

              {!gameStandby && !gameON && <Typer />}

              {/* {!gameStandby && !gameON && <Level />} */}

              {!gamePaused && <Material />}

              {material.title && (
                <Section flex={1} justify="center">
                  <Action />
                </Section>
              )}
            </Section>
          )}
        </Anim>
      </View>
    );
  }
}

const Memo = memo(p => <Game {...p} />);

export default withState(Memo);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#eee',
  },
});
