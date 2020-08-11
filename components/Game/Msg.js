import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import { withState } from '../GameState';
import lightIcon from '../../assets/lightbulb.png';
import styles from './styles';
import theme from '../../constants/theme';
import Icon from '../Icon';
import Card from '../Elements/Card';
import Section from '../Elements/Section';

const localStyles = StyleSheet.create({
  container: {},
  card: {
    padding: 0,
  },
  cardWrapper: {
    flexDirection: 'column',
  },
  line: { fontSize: 12, fontStyle: 'italic', height: 15, marginBottom: 0 },
  icon: { width: 20, height: 20, color: 'black' },
});

const iconStyle = { color: 'grey', width: 30, height: 30 };

const Msg = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { msg, gameStandby, gameON } = gameState;

  if (!msg || !msg.length || msg === '') return null;

  const msgArr = Array.isArray(msg) ? msg : msg.split();

  const list = msgArr.map((title, nth) => ({
    title,
    icon: <Icon type="IconOutline" name="info-circle" color="#444" size={20} />,
  }));

  return (
    <Section>
      <Card
        containerStyle={[styles.card, localStyles.card]}
        wrapperStyle={[styles.cardWrapper, localStyles.cardWrapper]}
      >
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
      </Card>
    </Section>
  );
};

export default withState(Msg);
