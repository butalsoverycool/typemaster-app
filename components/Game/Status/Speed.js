import React, { Component, memo } from 'react';
import { withState } from '../../GameState';
import * as PRESET from '../../../constants/preset';
import StatusData from './StatusData';
import { getTime } from '../../../constants/helperFuncs';

class Speed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.gameState) return null;

    const { gameState } = this.props;

    const { time, typed, level } = gameState;

    const { CCPS } = getTime(time, typed.output);

    const statusColor =
      CCPS <= PRESET.speedStandard[level] / 2
        ? 'red'
        : CCPS < PRESET.speedStandard[level]
        ? 'gold'
        : '#444';

    const speed = Math.round(CCPS * 100) / 100;

    return (
      <StatusData
        label="Speed"
        index={3}
        data={speed && speed !== Infinity ? speed : '00:00:00:00'}
        statusColor={statusColor}
      />
    );
  }
}

export default withState(Speed);
