import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';
import Game from '../Game';
import Settings from '../Settings';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: { width: '100%', flex: 1, backgroundColor: '#eee' },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Game" component={Game} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </View>
  );
}
