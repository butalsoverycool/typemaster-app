import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, ListItem, Badge } from 'react-native-elements';
import { withState } from '../GameState';
import lightIcon from '../../assets/lightbulb.png';
import styles from './styles';

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
    icon: <Image key={nth} source={lightIcon} style={styles.icon} />,
  }));

  return (
    <View style={(styles.section, {})}>
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
    </View>
  );
};

export default withState(Msg);
