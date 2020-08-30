import React from 'react';
import { Text } from 'react-native';

export default ({
  color = '#444',
  align = 'left',
  weight = 'normal',
  size = 14,
  padding = 0,
  fontFamily = 'CutiveMono_400Regular',
  style,
  children,
  ...props
}) => {
  const override = {
    color,
    textAlign: align,
    fontWeight: weight,
    fontSize: size,
    padding,
    fontFamily,
  };

  return <Text style={[override, style]}>{children}</Text>;
};
