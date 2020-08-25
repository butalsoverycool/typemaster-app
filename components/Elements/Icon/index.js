import React from 'react';
import * as ICON from '@ant-design/icons-react-native';
import { StyleSheet, View, Text } from 'react-native';
import Section from '../Section';

export default ({
  type = 'IconFill',
  size = 50,
  label,
  labelPos = 'bottom',
  ...props
}) => {
  const Component = ICON[type];

  return (
    <Section
      style={{
        width: size,
        height: size + (label ? 15 : 0),
        padding: 0,
        flex: 1,
      }}
    >
      {label && labelPos === 'top' && <Text style={styles.label}>{label}</Text>}
      <Component size={size} {...props} />
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
