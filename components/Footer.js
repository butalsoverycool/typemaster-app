import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withState } from './GameState';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Settings from './Settings';
import Main from './Game';

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

const Footer = ({ gameState, ...props }) => {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Tab.Navigator
        barStyle={styles.container}
        initialRouteName="Settings"
        animated={true}
        backBehavior="history"
        inactiveColor="whitesmoke"
      >
        <Tab.Screen
          name="Play"
          component={Main}
          tabBarAccessibilityLabel="game-screen"
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          tabBarAccessibilityLabel="settings-screen"
        />
      </Tab.Navigator>
    </View>
  );
};

export default withState(Footer);
