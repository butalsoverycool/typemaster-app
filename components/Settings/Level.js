import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { withState } from '../GameState';
import { ButtonGroup, TouchableHighlight } from 'react-native-elements';
import * as OPTIONS from '../../constants/options';
import styles, { buttonGroupStyle } from './styles';
import theme from '../../constants/theme';

// About typemaster Stella: https://www.pond5.com/stock-footage/item/75268195-miss-stella-pajunas-worlds-fast-typist-types-ibm-electric-ty
const Level = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const { settings } = gameState;
  const { setLevel } = gameSetters;

  return (
    <View style={theme.section}>
      <Text style={[theme.subtitle, { textAlign: 'center' }]}>Level</Text>
      <ButtonGroup
        containerStyle={[
          styles.sectionContentContainer,
          buttonGroupStyle.containerStyle,
        ]}
        buttonContainerStyle={buttonGroupStyle.buttonContainerStyle}
        buttonStyle={buttonGroupStyle.buttonStyle}
        selectedButtonStyle={buttonGroupStyle.selectedButtonStyle}
        innerBorderStyle={buttonGroupStyle.innerBorderStyle}
        textStyle={buttonGroupStyle.textStyle}
        onPress={setLevel}
        selectedIndex={settings.level}
        buttons={OPTIONS.levels}
      />
    </View>
  );
};

export default withState(Level);
