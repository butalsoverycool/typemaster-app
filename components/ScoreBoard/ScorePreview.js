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

  render() {
    const {
      gameState: { authUser, gameFinished, newHighscore },
      gameSetters: { setGameState, prepareGame },
      visible,
      typerExists,
      ...props
    } = this.props;

    const nameTitle = typerExists
      ? 'Same player? Otherwise change name'
      : 'Now type your name for the scoreboard!';

    const confirm = typerExists && !this.state.newTyper ? 'Yes' : 'Save';

    const highscoreMsg = newHighscore
      ? 'New personal record!'
      : randOfArr(dynamicMsg.noHighscore) + ' ' + randOfArr(sadFace);

    return (
      <Section justify="space-between" flex={1}>
        <Section>
          <Text style={theme.title}>YOUR SCORE</Text>

          <Section spaceTop>
            <Status />
          </Section>
        </Section>

        <Section spaceTop fullW>
          <Text
            style={[
              theme.subtitle,
              { color: newHighscore ? 'green' : '#444', fontSize: 14 },
            ]}
          >
            {highscoreMsg}
          </Text>
        </Section>

        <Section justify="center">
          <Btn
            h={50}
            w="80%"
            outline
            onPress={
              () =>
                setGameState({
                  pushNav: 'Game',
                  gameFinished: false,
                  material: {},
                })
              /* setGameState(
                {
                  typer: '',
                },
                () => {
                  createLatestScore(saveScore);
                }
              ) */
            }
          >
            <Text style={styles.textStyle}>Pick text</Text>
          </Btn>

          <Btn
            h={50}
            w="80%"
            outline
            onPress={
              () => setGameState({ pushNav: 'ScoreBoard', gameFinished: false })
              /* setGameState(
                {
                  typer: '',
                },
                () => {
                  createLatestScore(saveScore);
                }
              ) */
            }
          >
            <Text style={styles.textStyle}>Scoreboard</Text>
          </Btn>

          <Btn
            outline
            w="80%"
            onPress={() => {
              prepareGame();
              /* if (typerExists || this.state.newTyper !== '') {
                setGameState(
                  {
                    typer: this.state.newTyper || authUser.name,
                  },
                  () => {
                    createLatestScore(() => {
                      saveScore(() => {
                        this.setState({ newTyper: '' });
                      });
                    });
                  }
                );
              } */
            }}
          >
            <Text style={[styles.textStyle, { fontSize: 30 }]}>Again</Text>
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
