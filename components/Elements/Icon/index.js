import React from 'react';
import * as antdIcons from '@ant-design/icons-react-native';
import * as ICONS from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Section from '../Section';
import Text from '../Text';

export default ({
  brand = 'AntDesign',
  size = 50,
  color = '#444',
  label,
  labelPos = 'bottom',
  bg,
  on,
  ...props
}) => {
  const Component = ICONS[brand];

  return (
    <Section
      justify="center"
      w={size}
      h={size + (label ? 15 : 0)}
      flex={1}
      bg={bg || null}
      {...on}
    >
      {label && labelPos === 'top' && <Text style={styles.label}>{label}</Text>}
      <Component size={size} color={color} {...props} />
      {label && labelPos === 'bottom' && (
        <Text style={styles.label}>{label}</Text>
      )}
    </Section>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});
