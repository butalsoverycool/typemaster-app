import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import StatusData from './StatusData';
import { propsChanged } from '../../constants/helperFuncs';

class Points extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'points',
      'gameStandby',
      'gameON',
      'latestScore',
    ]);

  render() {
    const { points, gameStandby, gameON, latestScore } = this.props.gameState;

    const status =
      points < 0
        ? 'error'
        : points < 5
        ? 'warning'
        : points < 10
        ? 'primary'
        : 'success';

    return (
      <StatusData
        label="Points"
        index={1}
        data={
          gameStandby || gameON
            ? points || '0'
            : latestScore
            ? latestScore.points
            : ''
        }
        status={status}
      />
    );
  }
}

const Memo = memo(p => <Points {...p} />);

export default withState(Memo);
