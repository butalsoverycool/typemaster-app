import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Modal, Section, Input, Btn } from '../Elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { propsChanged } from '../../constants/helperFuncs';

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

    return (
      <Section>
        <Section>
          <Text style={theme.title}>YOUR SCORE</Text>

          <Section spaceTop>
            <Status />
          </Section>
        </Section>

        <Section spaceTop>
          <Text style={[theme.subtitle, { color: 'green' }]}>
            New personal highscore: {String(newHighscore)}
          </Text>
        </Section>

        <Section justify="center">
          <Btn
            w="80%"
            bg="orange"
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
            <Text style={styles.textStyle}>See scoreboard</Text>
          </Btn>

          <Btn
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
            <Text style={[styles.textStyle, { fontSize: 30 }]}>Play again</Text>
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
