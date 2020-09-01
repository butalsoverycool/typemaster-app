import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import styles from './styles';
import theme from '../../constants/theme';
import { propsChanged, playSound } from '../../constants/helperFuncs';
import { IconPreset } from '../../constants/preset';

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

    this.handleStop = this.handleStop.bind(this);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameStandby',
      'gameON',
      'gamePaused',
    ]);

  handleStop() {
    const { gameState, gameSetters } = this.props;
    const { typed } = gameState;

    gameSetters.playSound('pop');

    const finished = typed.output && typed.output !== '';

    gameSetters.endGame({ gameFinished: finished });
  }

  render() {
    const { gameState, gameSetters } = this.props;
    const { gameStandby, gameON, gamePaused } = gameState;
    const { togglePauseGame, endGame } = gameSetters;

    return (
      <Section row justify="space-around" fillW>
        {(gameON || gamePaused) && (
          <Icon
            brand={gamePaused ? IconPreset.play.brand : IconPreset.pause.brand}
            name={gamePaused ? IconPreset.play.name : IconPreset.pause.name}
            onPress={togglePauseGame}
            label={gamePaused ? 'continue' : 'pause'}
          />
        )}

        <Icon
          brand={gameON ? IconPreset.stop.brand : IconPreset.back.brand}
          name={gameON ? IconPreset.stop.name : IconPreset.back.name}
          onPress={this.handleStop}
          label={gameON ? 'stop' : 'back'}
        />
      </Section>
    );
  }
}

const Memo = memo(p => <CancelGame {...p} />);

export default withState(Memo);
