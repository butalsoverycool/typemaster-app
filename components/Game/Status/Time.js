import React, { Component, memo } from 'react';
import { withState } from '../../GameState';
import * as PRESET from '../../../constants/preset';
import { getTime } from '../../../utils/helperFuncs';
import StatusData from './StatusData';

class Time extends Component {
  constructor(props) {
    super(props);

    /* this.state = {
      tickingMs: 100,
      timer: null,
      ticking: null,
    };

    this.tick = this.tick.bind(this); */
  }

  shouldComponentUpdate = np => this.props.gameState.time !== np.gameState.time;

  render() {
    const { gameState } = this.props;

    const { time, typed } = gameState;

    const { mStr, sStr, ds } = getTime(time, typed.output);

    return (
      <StatusData
        label="Time"
        data={`${mStr}:${sStr}.${ds}` || '00:00.0'}
        statusColor="#444"
        bgImg="BtnUnderlay5"
      />
    );
  }
}

export default withState(Time);
