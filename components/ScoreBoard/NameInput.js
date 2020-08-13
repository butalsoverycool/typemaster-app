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

  shouldComponentUpdate = (np, ns) =>
    propsChanged(this.props, np, ['visible', 'typerExists']) ||
    this.props.gameState.settings.typer !== np.gameState.settings.typer ||
    this.state.newTyper !== ns.newTyper;

  render() {
    const {
      gameState: {
        settings: { typer },
      },

      gameSetters: { setTyper, createLatestScore, saveScore },
      visible,
      typerExists,
      ...props
    } = this.props;

    const nameTitle = typerExists
      ? 'Same player? Otherwise change name'
      : 'Now type your name for the scoreboard!';

    const confirm = typerExists && !this.state.newTyper ? 'Yes' : 'Save';

    return (
      <Modal visible={visible}>
        <Section>
          <Text style={theme.title}>SAVE YOUR SCORE</Text>

          <Section spaceTop>
            <Status />
          </Section>
        </Section>

        <Section spaceTop>
          <Text style={[theme.subtitle, { textAlign: 'center' }]}>
            {nameTitle}
          </Text>

          <Input
            focus={!typerExists}
            triggerUpdate={visible}
            placeholder={typerExists ? typer : 'Unknown'}
            onChangeText={newTyper => this.setState({ newTyper })}
          />
        </Section>

        <Section row justify="center">
          <Btn
            w="40%"
            bg="red"
            onPress={() =>
              setTyper({
                typer: '',
                callback: () => {
                  createLatestScore({
                    qualified: true,
                    cb: () => {
                      saveScore();
                    },
                  });
                },
              })
            }
          >
            <Text style={styles.textStyle}>No name</Text>
          </Btn>

          <Btn
            w="40%"
            onPress={() => {
              if (typerExists || this.state.newTyper !== '') {
                setTyper({
                  typer: this.state.newTyper || typer,
                  callback: () => {
                    createLatestScore({
                      qualified: true,
                      cb: () => {
                        saveScore();
                        this.setState({ newTyper: '' });
                      },
                    });
                  },
                });
              }
            }}
          >
            <Text style={[styles.textStyle, { fontSize: 30 }]}>Save</Text>
          </Btn>
        </Section>
      </Modal>
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
