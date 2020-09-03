import React, { Component, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../Elements';
import { Badge } from 'react-native-elements';
import { propsChanged } from '../../../constants/helperFuncs';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    width: 50,
    marginLeft: 0,
    marginRight: 0,
    color: '#444',
  },
  badge: {
    height: 30,
    width: 100,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#eee',
  },
});

class StatusData extends Component {
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

    const width = '42%';
    const pos = index % 2 === 0 ? 'left' : 'right';
    const marginTop = index > 1 ? 15 : 0;

    return (
      <View
        style={[
          styles.container,
          {
            width,
            textAlign: pos,
            marginTop,

            ...containerProps.style,
          },
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
            { borderColor: '#444', borderWidth: 1 },
          ]}
          textStyle={{
            fontSize: 14,
            fontFamily: 'CutiveMono_400Regular',
            margin: 0,
            color: statusColor,
            ...badgeProps.textStyle,
          }}
        />

        {pos === 'right' && (
          <Text
            style={[
              styles.label,
              { textAlign: pos, color: '#444' },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    );
  }
}

export default memo(p => <StatusData {...p} />);
