import React, { memo } from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import * as ICONS from '@expo/vector-icons';
import { withState } from '../GameState';
import Section from './Section';
import Text from './Text';
import { font } from '../../constants/theme';

const Conventional = ({ brand, name, size, color, ...props }) => {
  const Component = ICONS[brand];

  if (!Component) return null;

  return <Component name={name} size={size} color={color} {...props} />;
};

class custom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: false,
      once: true,
    };
  }

  /* componentDidMount() {
    this.setState({ fadeIn: true });
  } */

  shouldComponentUpdate(np, ns) {
    return (
      this.props.gameState.imgs !==
      np.gameState.imgs /* ||
      this.state.fadeIn !== ns.fadeIn */
    );
  }

  render() {
    const {
      name,
      size,
      gameState: { imgs },
      anim,
      ...props
    } = this.props;

    const { fadeIn, once } = this.state;

    const img = imgs.get(name);

    if (!props.anim) {
      return (
        <Image
          onLoad={() => this.setState({ fadeIn: true })}
          source={img}
          style={{ width: size, height: size }}
          resizeMode="contain"
          {...props}
        />
      );
    }

    return (
      <Anim
        /* autoStart */
        enterOn={fadeIn}
        duration={{ in: 300, out: 300 }}
        easing={{ in: 'ease-out', out: 'ease' }}
        anim={{
          opacity: {
            fromValue: 0,
            toValue: 1,
          },
        }}
        style={{ opacity: 0 }}
        enterCallback={() => this.setState({ fadeIn: false })}
      >
        <Image
          onLoad={() => this.setState({ fadeIn: true })}
          source={imgs}
          style={{ width: size, height: size }}
          resizeMode="contain"
          {...props}
        />
      </Anim>
    );
  }
}

const Cust = withState(custom);

const Custom = memo(p => <Cust {...p} />);

export default ({
  brand = 'AntDesign',
  name,
  size = 50,
  color = '#444',
  label,
  labelPos = 'bottom',
  bg,
  on,
  onPress,
  anim,
  ...props
}) => {
  const customImage = brand === 'custom';

  const Icon = () =>
    customImage ? (
      <Custom name={name} size={size} anim={anim} {...props} />
    ) : (
      <Conventional
        brand={brand}
        name={name}
        size={size}
        color={color}
        {...props}
      />
    );

  if (props.logOn) {
    console.log(props.logOn, 'ON props', on);
  }

  return (
    <Section
      justify="center"
      w={size}
      h={size + (label ? 15 : 0)}
      flex={1}
      bg={bg || null}
    >
      <TouchableHighlight {...on} onPress={onPress} activeOpacity={1}>
        <Section bg={bg || null}>
          {label && labelPos === 'top' && (
            <Text style={styles.label}>{label}</Text>
          )}

          <Icon />
          {label && labelPos === 'bottom' && (
            <Text style={styles.label}>{label}</Text>
          )}
        </Section>
      </TouchableHighlight>
    </Section>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: font.regular,
  },
});
