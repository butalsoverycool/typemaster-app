import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import styles from './styles';
import theme from '../../constants/theme';
import { propsChanged } from '../../constants/helperFuncs';

import { Section, Icon } from '../Elements';

const localStyles = {
  section: {
    maxHeight: 60,
  },
  button: (props = {}) => ({
    color: props.color || 'red',
  }),

  TouchableOpacityStyle: {
    position: 'absolute',
    width: '100%',
    height: 50,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    left: 0,
    top: -30,
    flex: 1,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
};

class CancelGame extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameStandby',
      'gameON',
      'gamePaused',
    ]);

  render() {
    const { gameState, gameSetters } = this.props;
    const { gameStandby, gameON, gamePaused } = gameState;
    const { togglePauseGame, endGame } = gameSetters;

    return (
      <Section row justify="space-around" fillW>
        {(gameON || gamePaused) && (
          <Icon
            size={50}
            name={gamePaused ? 'play-circle' : 'pause-circle'}
            type="IconOutline"
            color="#444"
            onPress={togglePauseGame}
            label={gamePaused ? 'continue' : 'pause'}
          />
        )}

        <Icon
          name="close-circle"
          type="IconOutline"
          size={50}
          color="#444"
          onPress={endGame}
          label={gameON ? 'stop' : 'back'}
        />
      </Section>
    );
  }
}

const Memo = memo(p => <CancelGame {...p} />);

export default withState(Memo);
