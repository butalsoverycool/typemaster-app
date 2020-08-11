import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { withState } from '../GameState';
import styles from './styles';
import theme from '../../constants/theme';
import Input from '../Elements/Input';

const Typer = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    settings: { typer },
  } = gameState;
  const { setTyper } = gameSetters;

  return (
    <View style={theme.section}>
      <Text style={[theme.subtitle, { textAlign: 'center' }]}>Typer</Text>
      <Input
        value={typer}
        placeholder="unknown"
        onChangeText={typer => setTyper({ typer })}
      />
    </View>
  );
};

export default withState(Typer);
