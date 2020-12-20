import React, { Component, memo } from 'react';
import { StyleSheet } from 'react-native';
import { withState } from '../GameState';
import { propsChanged } from '../../utils/helperFuncs';
import { IconPreset } from '../../constants/preset';
import { Section, Text, Icon } from '../Elements';

const styles = StyleSheet.create({
  msg: { fontSize: 12, fontStyle: 'italic', color: '#444' },
});

class Msg extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, ['msg']);

  render() {
    const { gameState } = this.props;

    if (!gameState) return null;

    const { msg } = gameState;

    if (!msg || !msg.length || msg === '') return null;

    const msgArr = Array.isArray(msg) ? msg : msg.split();

    const list = msgArr.map((msg, nth) => ({
      msg,
      icon: <Icon brand="custom" name="info" size={20} />,
    }));

    return (
      <Section margin>
        {list.map((item, nth) => (
          <Section key={nth} row fillW h={30} justify="center">
            <Section w={40} justify="center">
              {item.icon}
            </Section>
            <Section flex={1} h={30} align="flex-start" justify="center">
              <Text style={styles.msg}>{item.msg}</Text>
            </Section>
          </Section>
        ))}
      </Section>
    );
  }
}

const Memo = memo(p => <Msg {...p} />);

export default withState(Memo);
