import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { withState } from '../GameState';
import * as PRESET from '../../constants/preset';
import styles from './styles';
import StatusData from './StatusData';

const Remaining = ({
  gameState: {
    typed: { remaining },
  },
  ...props
}) => {
  const status = remaining.length < 5 ? 'warning' : 'primary';

  return (
    <StatusData
      label="To go"
      index={3}
      data={remaining.length || '0'}
      status={status}
    />
  );
};

export default withState(Remaining);
