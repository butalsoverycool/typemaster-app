import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import * as PRESET from '../../constants/preset';
import { usePrev } from '../../constants/helperFuncs';
import { withState } from '../GameState';

function TabBar({
  state,
  descriptors,
  navigation,
  gameState: { pushNav },
  gameSetters: { setPushNav },
  ...props
}) {
  const prevPushNav = usePrev(pushNav);

  /* if (pushNav && typeof pushNav === 'string') {
    setPushNav(pushNav);
    navigation.navigate(force);

    if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
  } */

  useEffect(() => {
    if (prevPushNav !== pushNav) {
      if (pushNav && typeof pushNav === 'string') {
        navigation.navigate(pushNav);
        setPushNav(false);

        return;
      }
    }
  }, [pushNav]);

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

        const preFocused = state.index - 1 === index;
        const postFocused = state.index + 1 === index;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: isFocused ? '#eee' : '#f7f7f7',
              height: '100%',
              borderTopRightRadius: preFocused ? 10 : 0,
              borderTopLeftRadius: postFocused ? 10 : 0,
              shadowOffset: {
                height: 10,
                width: preFocused ? 1 : postFocused ? -1 : 0,
              },
              shadowColor: preFocused || postFocused ? '#ddd' : null,
              shadowOpacity: postFocused || preFocused ? 1 : 0,
              position: 'relative',
              zIndex: preFocused || postFocused ? 99 : 1,
              shadowRadius: 1,
            }}
          >
            <View style={{ height: '100%', paddingTop: 10 }}>
              {PRESET.navIcons[route.name](isFocused)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default withState(TabBar);