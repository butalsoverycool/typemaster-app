import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { withState } from '../GameState';
import * as PRESET from '../../constants/preset';
import styles from './styles';

const tickingMs = 100;

const getTime = time => {
  const d = Number(input);
  const h = Math.floor(d / 10 / 3600);
  const m = Math.floor(((d / 10) % 3600) / 60);
  const s = Math.floor(((d / 10) % 3600) % 60);
  const cs = Math.floor(d % 10);

  const obj = {
    h: h > 0 ? (h >= 10 ? h : '0' + h) : '00',
    m: m > 0 ? (m >= 10 ? m : '0' + m) : '00',
    s: s > 0 ? (s >= 10 ? s : '0' + s) : '00',
    cs: cs > 0 ? (cs >= 10 ? cs : '0' + cs) : '00',
  };

  return {
    str: `${obj.h}:${obj.m}:${obj.s}:${obj.cs}`,
    obj,
  };
};

const Time = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    gameON,
    gamePaused,
    time,
    settings: { level },
  } = gameState;

  const { addTick, setPoints } = gameSetters;

  const [timer, setTimer] = useState(null);

  const tick = () => {
    addTick();

    // point withdrawal
    /* if ((newTime / 6) % 100 === 0) {
      const newPoints = Math.round(PRESET.levelWithdrawal[level] * 10) / 10;
      setPoints(newPoints);
    } */
  };

  useEffect(() => {
    if (gameON && !gamePaused) {
      let ticking = setInterval(tick, tickingMs);
      setTimer(ticking);
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }, [gameON, gamePaused]);

  //const timeConvert = () => {

  //const h = Math.floor(time / 10 / 3600);
  const m = Math.floor(((time / 10) % 3600) / 60);
  const s = Math.floor(time / 10) % 60;
  const ds = Math.floor(time % 10);

  /* const timeObj = {
    /* h: h > 0 ? (h >= 10 ? h : '0' + h) : '00', 
    m: m > 0 ? (m >= 10 ? m : '0' + m) : '00',
    s: s > 0 ? (s >= 10 ? s : '0' + s) : '00',
    cs: cs > 0 ? (cs >= 10 ? cs : '0' + cs) : '00', 
  }; */

  //const timeStr = `${timeObj.m}:${timeObj.s}:${timeObj.ds}`;
  //}

  const mStr = m >= 10 ? m : '0' + m;
  const sStr = s >= 10 ? s : '0' + s;
  //const dsStr = ds >= 10 ? ds : '0' + ds;

  const withdrawal = PRESET.levelWithdrawal[level];

  useEffect(() => {
    if (!gameON) return;

    setPoints(withdrawal);
  }, [ds]);

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
};

export default withState(Time);
