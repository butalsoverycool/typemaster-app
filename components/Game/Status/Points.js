import React, { Component, memo } from 'react';
import { withState } from '../../GameState';
import StatusData from './StatusData';
import { propsChanged, getTime } from '../../../constants/helperFuncs';

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
      'time',
    ]);

  render() {
    const { points, time, typed } = this.props.gameState;

    const { CCPS } = getTime(time, typed.output);

    const status =
      points < 0
        ? 'error'
        : points < 5
        ? 'warning'
        : points < 10
        ? 'primary'
        : 'success';

    const POINTS = Math.round(CCPS * points * 100) / 100;

    return (
      <StatusData
        label="Points"
        index={1}
        data={POINTS && POINTS !== Infinity ? POINTS : '0'}
        status={status}
      />
    );
  }
}

const Memo = memo(p => <Points {...p} />);

export default withState(Memo);
