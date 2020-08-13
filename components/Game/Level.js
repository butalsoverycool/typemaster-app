import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { withState } from '../GameState';
import { ButtonGroup, TouchableHighlight } from 'react-native-elements';
import * as OPTIONS from '../../constants/options';
import styles from './styles';
import theme, { buttonGroupStyle } from '../../constants/theme';
import { propsChanged } from '../../constants/helperFuncs';
import { Section } from '../Elements';

// About typemaster Stella: https://www.pond5.com/stock-footage/item/75268195-miss-stella-pajunas-worlds-fast-typist-types-ibm-electric-ty
class Level extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, ['settings']);

  render() {
    const {
      gameState: { settings },
      gameSetters: { setLevel },
    } = this.props;

    return (
      <Section>
        <Text style={theme.subtitle}>Level</Text>
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
      </Section>
    );
  }
}

export default withState(Level);
