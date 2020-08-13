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
  spaceTop,
  spaceBottom,
  content,
  children,
  ...props
}) => {
  const buttonOverride = {
    width: w || styles.button.width,
    height: h || styles.button.height,
    backgroundColor: bg || styles.button.backgroundColor,
    marginTop: spaceTop
      ? typeof spaceTop === 'number'
        ? spaceTop
        : 20
      : styles.button.margin,
    marginBottom: spaceBottom ? spaceBottom || 20 : styles.button.margin,
  };

  const textOverride = {
    color: color || styles.text.color,
    fontSize: fontSize || styles.text.fontSize,
  };

  const child = children ? (
    children
  ) : typeof content === 'string' ? (
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
    width: '80%',
    height: 100,
    borderRadius: 10,
    padding: 5,
    margin: 10,
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
