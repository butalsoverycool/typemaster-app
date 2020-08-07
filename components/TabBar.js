import React from 'react';
import { TabBarIOS, View, Text, TouchableOpacity, Image } from 'react-native';
import * as PRESET from '../constants/preset';
import keyboardIcon from '../assets/keyboard.png';
import settingsIcon from '../assets/settings.png';

function TabBar({ state, descriptors, navigation, ...props }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const icon = PRESET.navIcons[route.name];

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Image source={icon} style={{ height: 60, width: 60 }} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
