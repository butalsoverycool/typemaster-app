import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { withState } from '../GameState';
import styles from './styles';
import theme, { Input } from '../../constants/theme';

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
        onChangeText={value => setTyper(value)}
      />
    </View>
  );
};

export default withState(Typer);
