import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

export default ({
  w,
  h,
  color,
  bg,
  fontSize,
  buttonStyle,
  textStyle,
  content,
  ...props
}) => {
  const buttonOverride = {
    width: w || styles.button.width,
    height: h || 'auto',
    backgroundColor: bg || styles.button.backgroundColor,
  };

  const textOverride = {
    color: color || styles.text.color,
    fontSize: fontSize || styles.text.fontSize,
  };

  const child =
    typeof content === 'string' ? (
      <Text style={[styles.text, textOverride, textStyle]}>{content}</Text>
    ) : (
      content
    );

  return (
    <TouchableHighlight
      style={[styles.button, buttonOverride, buttonStyle]}
      {...props}
    >
      <View style={styles.contentContainer}>{child}</View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#444',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#eee',
    fontSize: 40,
  },
});
