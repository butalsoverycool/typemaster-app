import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { propsChanged } from '../../utils/helperFuncs';
import { withState } from '../GameState';
import { Icon } from '../Elements';

class TabBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });

    const {
      state: { routes, index },
      gameState: { nav },
      gameSetters: { setGameState },
    } = this.props;

    // set starting route name
    if (routes[index].name === 'Game') {
      setGameState({ nav: routes[index].name });
    }
  }

  shouldComponentUpdate = (np, ns) =>
    propsChanged(this.props, np, ['state', 'descriptors', 'navigation']) ||
    propsChanged(this.props.gameState, np.gameState, ['pushNav', 'nav']) ||
    propsChanged(this.state, ns);

  componentDidUpdate(pp) {
    const {
      state: { index: prevIndex },
    } = pp;

    const { pushNav: prevPushNav } = pp.gameState;

    const {
      state: { index, routes },
      gameState,
      gameSetters,
      navigation,
    } = this.props;

    const { pushNav } = gameState;
    const { setGameState, setPushNav } = gameSetters;

    if (prevPushNav !== pushNav) {
      if (pushNav && typeof pushNav === 'string') {
        navigation.navigate(pushNav);

        setPushNav(false);
      }
    }

    if (prevIndex !== index) {
      setGameState({ nav: routes[index].name });
    }
  }

  render() {
    const {
      state,
      descriptors,
      navigation,
      gameSetters: { playSound },
      ...props
    } = this.props;

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
            const { setGameState } = this.props.gameSetters;

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);

              playSound({ name: `tab${index + 1}` });
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
              <View
                style={{
                  height: '100%',
                  paddingTop: 10,
                }}
              >
                <Icon
                  brand="custom"
                  name={route.name}
                  size={40}
                  onPress={onPress}
                  bg={isFocused ? '#eee' : '#f7f7f7'}
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
