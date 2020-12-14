import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Section, Text, Btn } from '../Elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { propsChanged, randOfArr } from '../../constants/helperFuncs';
import { dynamicMsg, sadFace } from '../../constants/preset';

import Status from '../Game/Status';

class NameInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTyper: '',
      msg: '',
    };
  }

  /* shouldComponentUpdate = (np, ns) =>
    propsChanged(this.props, np, ['visible', 'typerExists']) ||
    propsChanged(this.props.gameState, np.gameState, [
      'gameFinished',
      'newHighscore',
    ]) ||
    this.props.gameState.authUser.name !== np.gameState.authUser.name ||
    this.state.newTyper !== ns.newTyper; */

  componentDidUpdate(pp) {
    // set game msg
    console.log('preview update...');
    if (
      !pp.gameState.gameStandby &&
      this.props.gameState.gameStandby &&
      this.state.msg !== ''
    ) {
      this.setState({ msg: '' });
    }

    if (this.props.gameState.gameFinished && this.state.msg === '') {
      console.log('setting msg');
      this.setState({
        msg: this.props.gameState.newHighscore
          ? 'New personal record!'
          : randOfArr(dynamicMsg.noHighscore) + ' ' + randOfArr(sadFace),
      });
    }
  }

  render() {
    const {
      gameState: { authUser, gameFinished, newHighscore, material },
      gameSetters: { setGameState, prepareGame },
      visible,
      typerExists,
      ...props
    } = this.props;

    const nameTitle = typerExists
      ? 'Same player? Otherwise change name'
      : 'Now type your name for the scoreboard!';

    const confirm = typerExists && !this.state.newTyper ? 'Yes' : 'Save';

    /* const highscoreMsg = newHighscore
      ? 'New personal record!'
      : randOfArr(dynamicMsg.noHighscore) + ' ' + randOfArr(sadFace); */

    return (
      <Section justify="space-between" flex={1}>
        <Section>
          <Text style={[theme.title, { marginBottom: 0 }]}>YOUR SCORE</Text>
          <Text style={[theme.label, { marginBottom: 10 }]}>
            on {material.title}
          </Text>

          <Section>
            <Status />
          </Section>
        </Section>

        <Section fullW>
          <Text
            style={[
              theme.subtitle,
              { color: newHighscore ? 'green' : '#444', fontSize: 14 },
            ]}
          >
            {this.state.msg}
          </Text>
        </Section>

        <Section justify="center">
          <Btn
            h={50}
            w="80%"
            outline
            onPress={() =>
              setGameState({
                pushNav: 'Game',
                gameFinished: false,
                material: {},
              })
            }
            bgImg="BtnUnderlay3"
          >
            <Text style={styles.textStyle}>Pick another text</Text>
          </Btn>

          <Btn
            h={50}
            w="80%"
            outline
            onPress={() =>
              setGameState({ pushNav: 'ScoreBoard', gameFinished: false })
            }
            bgImg="BtnUnderlay4"
          >
            <Text style={styles.textStyle}>View scoreboard</Text>
          </Btn>

          <Btn
            outline
            w="80%"
            onPress={() => {
              prepareGame();
            }}
            bgImg="BtnUnderlay1"
          >
            <Text style={[styles.textStyle, { fontSize: 30 }]}>Play</Text>
          </Btn>
        </Section>
      </Section>
    );
  }
}

export default withState(NameInput);

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
