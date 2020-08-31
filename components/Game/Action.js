import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import { propsChanged } from '../../constants/helperFuncs';
import { Section, Btn } from '../Elements';

class Action extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameON,',
      'gameStandby',
      'gamePaused',
      'gameFinished',
    ]);

  render() {
    const { gameState, gameSetters } = this.props;
    if (!gameState || !gameSetters) return null;

    const { gameStandby, gameON, gamePaused, gameFinished } = gameState;
    const { prepareGame, endGame } = gameSetters;

    return (
      <Section row justify="center" align="center">
        {!gameStandby && !gamePaused /*  || gameON */ && (
          <Btn
            content={gameFinished ? 'Again' : !gameON ? 'Play' : 'Stop'}
            type="outline"
            w="80%"
            h={100}
            onPress={!gameON ? prepareGame : endGame}
          />
        )}
      </Section>
    );
  }
}

const Memo = memo(p => <Action {...p} />);

export default withState(Memo);
