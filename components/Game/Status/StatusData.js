import React, { Component, memo } from 'react';
import { Dimensions, Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { withState } from '../../GameState';
import { Text, Section } from '../../Elements';
import { Badge } from 'react-native-elements';
import { propsChanged } from '../../../utils/helperFuncs';
import { font } from '../../../constants/theme';

class StatusData extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props, np, [
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
      bgImg,
      statusColor = '#444',
      containerProps = {},
      badgeProps = {},
      gameState: { imgs = {} },
    } = this.props;

    const containerW = Dimensions.get('window').width / 3 - 10;

    return (
      <Section
        justify="space-between"
        align="center"
        w={containerW}
        style={[
          styles.container,
          {
            ...containerProps.style,
          },
        ]}
      >
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <Section position="relative" h={30} justify="center">
          <Image
            source={imgs[bgImg]}
            style={styles.underlay}
            alt="background_underlay_image"
            resizeMode="contain"
          />
          <Text>{data}</Text>
        </Section>

        {/* <Badge
          value={data || ''}
          badgeStyle={[
            styles.badge,
            badgeProps.badgeStyle,
            { borderColor: '#444', borderWidth: 1 },
          ]}
          textStyle={{
            fontSize: 14,
            fontFamily: font.regular,
            margin: 0,
            color: statusColor,
            ...badgeProps.textStyle,
          }}
        /> */}
      </Section>
    );
  }
}

const Memo = memo(p => <StatusData {...p} />);

export default withState(Memo);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 3 - 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: font.regular,
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
    backgroundColor: null,
  },
  underlay: {
    width: Dimensions.get('window').width / 3 - 10,
    height: 30,
    position: 'absolute',
    zIndex: 0,
  },
});
