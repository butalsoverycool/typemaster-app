import React from 'react';
import { withState } from '../GameState';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';
import Game from '../Game';
import ScoreBoard from '../ScoreBoard';
import About from '../About';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: { width: '100%', flex: 1, backgroundColor: '#eee' },
});

const Nav = ({ authUser, ...props }) => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Game"
        tabBar={props => <TabBar {...props} />}
      >
        <Tab.Screen name="Game" component={Game} />
        {authUser && <Tab.Screen name="ScoreBoard" component={ScoreBoard} />}
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </View>
  );
};

export default withState(Nav);
