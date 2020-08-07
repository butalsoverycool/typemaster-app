import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { withState } from '../GameState';
import { Input } from 'react-native-elements';
import styles from './styles';

const Typer = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    settings: { typer },
  } = gameState;
  const { setTyper } = gameSetters;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.groupLabel}>Typer</Text>
      <Input
        inputContainerStyle={[
          styles.sectionContentContainer,
          styles.inputContainerStyle,
        ]}
        inputStyle={styles.inputStyle}
        value={typer}
        placeholder="unknown"
        onChangeText={value => setTyper(value)}
      />
    </View>
  );
};

export default withState(Typer);
