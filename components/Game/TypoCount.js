import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { withState } from '../GameState';
import * as PRESET from '../../constants/preset';
import styles from './styles';
import StatusData from './StatusData';

const TypoCount = ({
  gameState: {
    typed: { typoCount },
  },
  ...props
}) => {
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
      data={typoCount || '0'}
      status={status}
    />
  );
};

export default withState(TypoCount);
