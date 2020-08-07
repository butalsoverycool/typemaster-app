import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { withState } from '../GameState';
import { ButtonGroup } from 'react-native-elements';
import { printStr } from '../../constants/helperFuncs';
import * as OPTIONS from '../../constants/options';
import styles, { buttonGroupStyle } from './styles';

const CaseSens = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    settings: { caseSensitive },
  } = gameState;
  const { setCaseSens } = gameSetters;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.groupLabel}>Case sensitive</Text>
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
        onPress={setCaseSens}
        selectedIndex={caseSensitive ? 0 : 1}
        buttons={OPTIONS.caseSensitive.map(opt => String(opt))}
      />
    </View>
  );
};

export default withState(CaseSens);
