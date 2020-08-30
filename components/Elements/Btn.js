import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Section from './Section';
import Text from './Text';

export default ({
  w,
  h,
  fillW,
  fillH,
  color,
  bg,
  fontSize,
  buttonStyle,
  textStyle,
  spaceTop,
  spaceBottom,
  content,
  outline,
  textAlign,
  children,
  fontFamily,
  ...props
}) => {
  const buttonOverride = {
    ...styles.button,
    width: w || styles.button.width,
    height: h || styles.button.height,

    minWidth: w || styles.button.width,
    maxWidth: w || styles.button.width,
    minHeight: h || styles.button.height,
    maxHeight: h || styles.button.height,

    backgroundColor: outline
      ? color || '#eee'
      : bg || styles.button.backgroundColor,
    marginTop: spaceTop
      ? typeof spaceTop === 'number'
        ? spaceTop
        : 20
      : styles.button.margin,
    marginBottom: spaceBottom ? spaceBottom || 20 : styles.button.margin,
    borderColor: '#444',
    borderWidth: outline ? 2 : 0,
  };

  const textOverride = {
    color: outline ? bg || '#444' : color || styles.text.color,
    fontSize: fontSize || styles.text.fontSize,
    textAlign: textAlign || styles.text.textAlign,
    fontFamily: fontFamily || 'CutiveMono_400Regular',
  };

  const child = children ? (
    children
  ) : typeof content === 'string' ? (
    <Text style={[styles.text, textOverride, textStyle]}>{content}</Text>
  ) : (
    content
  );

  return (
    <TouchableHighlight style={[buttonOverride, buttonStyle]} {...props}>
      <Section padding={0} style={styles.contentContainer}>
        {child}
      </Section>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    padding: 0,
    margin: 10,
    overflow: 'hidden',
    backgroundColor: '#444',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  text: {
    color: '#eee',
    fontSize: 40,
    textAlign: 'center',
  },
});
