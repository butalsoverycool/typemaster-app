import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, ListItem, Badge } from 'react-native-elements';
import { withState } from './GameState';
import lightIcon from '../assets/lightbulb.png';

const styles = StyleSheet.create({
  container: {},
  line: { fontSize: 12, fontStyle: 'italic', height: 15, marginBottom: 0 },
  icon: { width: 20, height: 20 },
});

const iconStyle = { color: 'grey', width: 30, height: 30 };

const Msg = ({ gameState, ...props }) => {
  if (!gameState) return null;

  const { msg, gameReady, gameON } = gameState;

  if (!msg || !msg.length || msg === '') return null;

  const msgArr = Array.isArray(msg) ? msg : msg.split();

  const list = msgArr.map((line, nth) => ({
    title: line,
    icon: <Image source={lightIcon} style={styles.icon} />,
  }));

  return (
    <View style={{ paddingTop: 15 }}>
      {list.map((item, nth) => (
        <View key={nth} style={{ justifyContent: 'flex-end' }}>
          <ListItem
            containerStyle={{ height: 10 }}
            title={item.title}
            leftIcon={item.icon}
            titleStyle={styles.line}
          />
        </View>
      ))}
    </View>
  );
};

export default withState(Msg);
