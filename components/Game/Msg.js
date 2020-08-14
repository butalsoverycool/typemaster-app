import React, { Component, memo } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withState } from '../GameState';
import { propsChanged } from '../../constants/helperFuncs';
import { Section, Icon } from '../Elements';

const localStyles = StyleSheet.create({
  container: {},
  line: { fontSize: 12, fontStyle: 'italic', height: 15, marginBottom: 0 },
  icon: { width: 20, height: 20, color: 'black' },
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

    const list = msgArr.map((title, nth) => ({
      title,
      icon: (
        <Icon type="IconOutline" name="info-circle" color="#444" size={20} />
      ),
    }));

    return (
      <Section>
        {list.map((item, nth) => (
          <ListItem
            key={nth}
            containerStyle={{
              height: 40,
              backgroundColor: '#eee',
              width: '100%',
              minWidth: '100%',
            }}
            title={item.title}
            leftIcon={item.icon}
            titleStyle={localStyles.line}
          />
        ))}
      </Section>
    );
  }
}

const Memo = memo(p => <Msg {...p} />);

export default withState(Memo);
