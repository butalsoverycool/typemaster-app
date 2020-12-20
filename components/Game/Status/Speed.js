import React, { Component, memo } from 'react';
import { withState } from '../../GameState';
import * as PRESET from '../../../constants/preset';
import StatusData from './StatusData';
import { getTime } from '../../../utils/helperFuncs';

class Speed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.gameState) return null;

    const { gameState } = this.props;

    const { time, typed, level, gameON, gameP } = gameState;

    const { CCPS } = getTime(time, typed.output);

    const statusColor =
      typed.input.length < 1
        ? '#444'
        : CCPS <= PRESET.speedStandard.bad
        ? 'red'
        : CCPS < PRESET.speedStandard.warning
        ? 'orange'
        : '#444';

    const speed = Math.round(CCPS * 100) / 100;

    return (
      <StatusData
        label="Speed"
        index={3}
        data={speed && speed !== Infinity ? speed : '0'}
        statusColor={statusColor}
      />
    );
  }
}

export default withState(Speed);
