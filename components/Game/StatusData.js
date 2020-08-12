import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { propsChanged } from '../../constants/helperFuncs';
import { withState } from '../GameState';
import * as PRESET from '../../constants/preset';
//import styles from './styles';
import theme from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  badge: { height: 30, width: 90, marginLeft: 5, marginRight: 5 },
});

export default class StatusData extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props, np, [
      'index',
      'data',
      'label',
      'labelStyle',
      'status',
      'statusColor',
      'containerProps',
      'badgeProps',
    ]);

  render() {
    const {
      index,
      data,
      label,
      labelStyle,
      status,
      statusColor = '#444',
      containerProps = {},
      badgeProps = {},
    } = this.props;

    const width = '50%';
    const pos = index % 2 === 0 ? 'left' : 'right';
    const marginTop = index > 1 ? 10 : 0;

    return (
      <View
        style={[
          styles.container,
          { width, textAlign: pos, marginTop, ...containerProps.style },
        ]}
      >
        {pos === 'left' && (
          <Text style={[styles.label, { textAlign: pos }, labelStyle]}>
            {label}
          </Text>
        )}

        <Badge
          value={data || ''}
          badgeStyle={[
            styles.badge,
            badgeProps.badgeStyle,
            { backgroundColor: statusColor },
          ]}
          textStyle={{ fontSize: 20, ...badgeProps.textStyle }}
        />

        {pos === 'right' && (
          <Text style={[styles.label, { textAlign: pos }, labelStyle]}>
            {label}
          </Text>
        )}
      </View>
    );
  }
}
