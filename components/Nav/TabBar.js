import React, { Component, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import * as PRESET from '../../constants/preset';
import { usePrev, propsChanged } from '../../constants/helperFuncs';
import { withState } from '../GameState';
import { Icon } from '../Elements';

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props, np, ['state', 'descriptors', 'navigation']) ||
    this.props.gameState.pushNav !== np.gameState.pushNav;

  componentDidUpdate(pp) {
    const { pushNav: prevPushNav } = pp.gameState;
    const { pushNav } = this.props.gameState;

    if (prevPushNav !== pushNav) {
      if (pushNav && typeof pushNav === 'string') {
        this.props.navigation.navigate(pushNav);

        this.props.gameSetters.setPushNav(false);
      }
    }
  }

  render() {
    const { state, descriptors, navigation, ...props } = this.props;

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
                <Icon
                  name={PRESET.navIcons[route.name]}
                  type="IconOutline"
                  color={isFocused ? '#666' : '#444'}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default withState(TabBar);
