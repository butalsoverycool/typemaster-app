import React from 'react';
import * as ICON from '@ant-design/icons-react-native';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});

const Icon = ({
  type = 'IconFill',
  size = 50,
  label,
  labelPos = 'bottom',
  ...props
}) => {
  const Component = ICON[type];

  return (
    <View style={{ width: size, height: size }}>
      {label && labelPos === 'top' && <Text style={styles.label}>{label}</Text>}
      <Component size={size} {...props} />
      {label && labelPos === 'bottom' && (
        <Text style={styles.label}>{label}</Text>
      )}
    </View>
  );
};

export default Icon;
