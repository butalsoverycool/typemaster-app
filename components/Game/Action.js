import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import { propsChanged } from '../../utils/helperFuncs';
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
      <Section row align="center" padding={0}>
        {!gameStandby && !gamePaused /*  || gameON */ && (
          <Btn
            outline
            content={!gameON ? 'Play' : 'Stop'}
            type="outline"
            w="80%"
            h={100}
            onPress={!gameON ? prepareGame : endGame}
            bgImg="BtnUnderlay1"
          />
        )}
      </Section>
    );
  }
}

const Memo = memo(p => <Action {...p} />);

export default withState(Memo);
