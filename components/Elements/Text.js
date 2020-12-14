import React from 'react';
import { Text } from 'react-native';
import { font } from '../../constants/theme';

export default ({
  color = '#444',
  align = 'left',
  weight = 'normal',
  size = 14,
  padding = 0,
  fontFamily = font.regular,
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
