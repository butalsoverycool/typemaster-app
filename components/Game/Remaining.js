import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import StatusData from './StatusData';
import { propsChanged } from '../../constants/helperFuncs';

class Remaining extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'typed',
      'gameStandby',
      'gameON',
    ]);

  render() {
    const {
      typed: { remaining = 0 },
      gameStandby,
      gameON,
    } = this.props.gameState;

    const status = remaining.length < 5 ? 'warning' : 'primary';

    return (
      <StatusData
        label="To go"
        index={3}
        data={gameStandby || gameON ? remaining.length : ''}
        status={status}
      />
    );
  }
}

const Memo = memo(p => <Remaining {...p} />);

export default withState(Memo);
