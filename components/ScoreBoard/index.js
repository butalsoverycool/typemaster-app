import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withState } from '../GameState';
import theme from '../../constants/theme';

const ScoreBoard = ({ gameState, ...props }) => {
  return (
    <View style={theme.view}>
      <View style={theme.section}>
        <Text style={theme.title}>SCOREBOARDDDDD</Text>
      </View>
    </View>
  );
};

export default withState(ScoreBoard);
