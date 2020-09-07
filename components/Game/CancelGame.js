import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import { propsChanged } from '../../constants/helperFuncs';

import { Section, Icon } from '../Elements';
import { EntypoTriangleUp } from 'react-entypo-icons';

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

    gameSetters.endGame({ gameFinished: true });
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
      <Section
        row
        justify="space-around"
        fillW
        spaceTop={30}
        flex={1}
        style={{ maxHeight: 50 }}
      >
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
