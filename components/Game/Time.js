import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { withState } from '../GameState';
import * as PRESET from '../../constants/preset';
import styles from './styles';

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

  /* componentDidMount = () => {
    this.tickingMs = 100;

  } */

  componentDidUpdate = (pp, ps) => {
    const {
      gameON: prevGameON,
      gamePaused: prevGamePaused,
      time: prevTime,
    } = pp.gameState;
    const { timer, tickingMs } = this.state;

    const {
      gameON,
      gamePaused,
      time,
      settings: { level },
    } = this.props.gameState;

    const { setPoints } = this.props.gameSetters;

    // run once at game start
    // start ticking-interval
    if (!prevGameON && gameON) {
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
      setPoints(withdrawal);
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

    const { time } = gameState;

    //const timeConvert = () => {
    //const h = Math.floor(time / 10 / 3600);
    const m = Math.floor(((time / 10) % 3600) / 60);
    const s = Math.floor(time / 10) % 60;
    const ds = Math.floor(time % 10);

    const mStr = m >= 10 ? m : '0' + m;
    const sStr = s >= 10 ? s : '0' + s;

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Time</Text>
        <Badge
          value={`${mStr}:${sStr}:${ds}` || '00:00:00:00'}
          status="primary"
          badgeStyle={styles.badgeStyle}
          textStyle={{ fontSize: 20 }}
        />
      </View>
    );
  }
}

export default withState(Time);
