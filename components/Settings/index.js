import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { withState } from '../GameState';
import { printStr } from '../../constants/helperFuncs';
import Level from './Level';
import CaseSens from './CaseSens';
import Typer from './Typer';
import theme from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#eee',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

const Settings = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const { settings } = gameState;

  return (
    <View style={theme.view}>
      <Text style={theme.title}>SETTINGS</Text>

      <Typer />

      <Level />
      {/* <CaseSens /> */}
    </View>
  );
};

export default withState(Settings);
