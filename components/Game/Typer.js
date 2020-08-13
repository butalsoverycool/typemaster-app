import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { withState } from '../GameState';
import styles from '../Settings/styles';
import theme from '../../constants/theme';
import { Section, Input } from '../Elements';

class Typer extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    this.props.gameState.settings.typer !== np.gameState.settings.typer;

  render() {
    const {
      gameState: {
        settings: { typer },
      },
      gameSetters: { setTyper },
    } = this.props;

    return (
      <Section>
        <Text style={[theme.subtitle, { textAlign: 'center' }]}>Typer</Text>
        <Input
          value={typer}
          placeholder="unknown"
          onChangeText={typer => setTyper({ typer })}
        />
      </Section>
    );
  }
}

export default withState(Typer);
