import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import { ButtonGroup } from 'react-native-elements';
import * as OPTIONS from '../../constants/options';
import styles from './styles';
import theme, { buttonGroupStyle } from '../../constants/theme';
import { propsChanged } from '../../utils/helperFuncs';
import { Section, Text } from '../Elements';

// About typemaster Stella: https://www.pond5.com/stock-footage/item/75268195-miss-stella-pajunas-worlds-fast-typist-types-ibm-electric-ty
class Level extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, ['level']);

  render() {
    const {
      gameState: { level },
      gameSetters: { setGameState },
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
          onPress={level => setGameState({ level })}
          selectedIndex={level}
          buttons={OPTIONS.levels}
        />
      </Section>
    );
  }
}

const Memo = memo(p => <Level {...p} />);

export default withState(Memo);
