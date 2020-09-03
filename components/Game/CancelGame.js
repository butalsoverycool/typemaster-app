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
    this.handleAgain = this.handleAgain.bind(this);
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

  handleAgain() {
    this.props.gameSetters.endGame({
      cb: () => {
        this.props.gameSetters.prepareGame();
      },
    });
  }

  render() {
    const { gameState, gameSetters } = this.props;
    const { gameStandby, gameON, gamePaused } = gameState;
    const { togglePauseGame, prepareGame } = gameSetters;

    return (
      <Section row justify="space-around" fillW spaceTop={10} flex={1}>
        {(gameON || gamePaused) && (
          <>
            <Icon
              anim
              brand="custom"
              name={gamePaused ? 'play' : 'pause'}
              onPress={togglePauseGame}
              label={gamePaused ? 'continue' : 'pause'}
            />

            <Icon
              anim
              brand="custom"
              name="again"
              onPress={this.handleAgain}
              label="again"
            />
          </>
        )}

        <Icon
          anim
          brand="custom"
          name={gameON ? 'stop' : 'back'}
          onPress={this.handleStop}
          label={gameON ? 'stop' : 'back'}
        />
      </Section>
    );
  }
}

const Memo = memo(p => <CancelGame {...p} />);

export default withState(Memo);
