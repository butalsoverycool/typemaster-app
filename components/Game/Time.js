import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import * as PRESET from '../../constants/preset';
import StatusData from './StatusData';
import { propsChanged } from '../../constants/helperFuncs';

class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickingMs: 100,
      timer: null,
      ticking: null,
    };

    this.tick = this.tick.bind(this);
  }

  /* shouldComponentUpdate = (np, ns) =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameStandby',
      'gameON,',
      'gamePaused',
      'time',
      'typed',
      'level',
      'latestScore',
    ]) || propsChanged(this.state, ns, ['timer', 'ticking']); */

  componentDidUpdate = (pp, ps) => {
    const {
      gameON: prevGameON,
      gamePaused: prevGamePaused,
      time: prevTime,
    } = pp.gameState;

    const { timer, tickingMs } = this.state;

    const { gameON, gamePaused, time, level } = this.props.gameState;

    const { inputHandler } = this.props.gameSetters;

    // run once at game start
    // start ticking-interval

    if (!prevGameON && gameON) {
      console.log('starting timer!!!!!!');
      let timer = setInterval(this.tick, tickingMs);
      this.setState({ timer });
    }

    // run once att game stop
    // clear ticking-interval
    else if ((prevGameON && !gameON) || (!prevGamePaused && gamePaused)) {
      clearInterval(timer);
      this.setState({ timer: null });
    }

    const withdrawal = PRESET.levelWithdrawal[level];

    // everytime time changes, update points
    if (gameON && prevTime !== time) {
      inputHandler({ pointsToAdd: withdrawal });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.state.timer);
  };

  tick = () => {
    this.props.gameSetters.addTick();
  };

  render() {
    if (!this.props.gameState) return null;

    const { gameState } = this.props;

    const { time, typed, level, gameStandby, gameON, latestScore } = gameState;

    //const timeConvert = () => {
    //const h = Math.floor(time / 10 / 3600);
    const m = Math.floor(((time / 10) % 3600) / 60);
    const s = Math.floor(time / 10) % 60;
    const ds = Math.floor(time % 10);

    const sTot = time / 10;

    const mStr = m >= 10 ? m : '0' + m;
    const sStr = s >= 10 ? s : '0' + s;

    // speed
    const TPS = typed.output.length / sTot;

    const statusColor =
      TPS <= PRESET.speedStandard[level] / 2
        ? 'red'
        : TPS < PRESET.speedStandard[level]
        ? 'gold'
        : '#444';

    return (
      <StatusData
        label="Time"
        index={0}
        data={
          gameStandby || gameON
            ? `${mStr}:${sStr}:${ds}` || '00:00:00:00'
            : latestScore
            ? String(latestScore.time)
            : '00:00:00:00'
        }
        statusColor={statusColor}
      />
    );
  }
}

export default withState(Time);
