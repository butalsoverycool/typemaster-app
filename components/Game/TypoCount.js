import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { withState } from '../GameState';
import * as PRESET from '../../constants/preset';
import styles from './styles';
import StatusData from './StatusData';
import { propsChanged } from '../../constants/helperFuncs';

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
    const {
      typed: { typoCount },
      gameStandby,
      gameON,
      latestScore,
    } = this.props.gameState;

    const status =
      typoCount <= 0
        ? 'success'
        : typoCount <= 1
        ? 'primary'
        : typoCount <= 5
        ? 'warning'
        : 'error';

    return (
      <StatusData
        label="Errors"
        index={2}
        data={
          gameStandby || gameON
            ? typoCount || '0'
            : latestScore
            ? String(latestScore.typos)
            : '0'
        }
        status={status}
      />
    );
  }
}
export default withState(TypoCount);
