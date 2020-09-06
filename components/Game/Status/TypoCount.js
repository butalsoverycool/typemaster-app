import React, { Component, memo } from 'react';
import { withState } from '../../GameState';
import StatusData from './StatusData';
import { propsChanged } from '../../../constants/helperFuncs';

class TypoCount extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'typed',
      'gameStandby',
      'gameON',
      'latestScore',
    ]);

  render() {
    console.log('Rendering <TypoCount />');

    const {
      typed: { typoCount, input },
      gameStandby,
      gameON,
      latestScore,
    } = this.props.gameState;

    const status = typoCount < 5 ? '#444' : typoCount < 10 ? 'orange' : 'red';

    return (
      <StatusData
        label="Errors"
        data={
          gameStandby || gameON
            ? typoCount || '0'
            : latestScore
            ? String(latestScore.typos)
            : '0'
        }
        statusColor={status}
      />
    );
  }
}

const Memo = memo(p => <TypoCount {...p} />);

export default withState(Memo);
