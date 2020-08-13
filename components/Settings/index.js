import React from 'react';
import { View, Text } from 'react-native';
import Level from '../Game/Level';
import Typer from '../Game/Typer';
import theme from '../../constants/theme';

const Settings = props => {
  return (
    <View style={theme.view}>
      <Text style={theme.title}>SETTINGS</Text>

      <Typer />

      <Level />
    </View>
  );
};

export default Settings;
