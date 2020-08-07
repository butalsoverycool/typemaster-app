import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GameState from './components/GameState';
import Header from './components/Header';
import Status from './components/Status';
import Material from './components/Material';
import Action from './components/Action';
import Msg from './components/Msg';
import Footer from './components/Footer';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './components/Main';
import Settings from './components/Settings';
import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabBarContainer: { width: '100%', flex: 1 },
});

export default function App() {
  return (
    <NavigationContainer>
      <GameState>
        <View style={styles.container}>
          <Header />

          <View style={styles.tabBarContainer}>
            <Tab.Navigator tabBar={props => <TabBar {...props} />}>
              <Tab.Screen name="Main" component={Main} />
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          </View>
        </View>
      </GameState>
    </NavigationContainer>
  );
}
