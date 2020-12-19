import React from 'react';
import { withState } from '../GameState';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';
import Section from './Section';
import Text from './Text';
import { font } from '../../constants/theme';
import { mathRandInc } from '../../constants/helperFuncs';

const Btn = ({
  w,
  h,
  fillW,
  fillH,
  color,
  bg,
  fontSize,
  buttonStyle,
  textStyle,
  margin,
  padding,
  spaceTop,
  spaceBottom,
  content,
  outline,
  textAlign,
  children,
  fontFamily = font.regular,
  logStyle,
  gameState: { imgs = {} },
  bgImg = null,
  ...props
}) => {
  const img = imgs?.get(bgImg) || null;

  const buttonOverride = {
    ...styles.button,
    width: w || styles.button.width,
    height: h || styles.button.height,

    minWidth: w || styles.button.width,
    maxWidth: w || styles.button.width,
    minHeight: h || styles.button.height,
    maxHeight: h || styles.button.height,

    /* backgroundColor: outline
      ? color || '#eee'
      : bg || styles.button.backgroundColor, */

    padding: padding != null ? padding : styles.button.padding,
    margin: margin != null ? margin : styles.button.margin,
    marginTop: spaceTop
      ? typeof spaceTop === 'number'
        ? spaceTop
        : 20
      : styles.button.margin,
    marginBottom: spaceBottom ? spaceBottom || 20 : styles.button.margin,
    /* borderColor: '#444',
    borderWidth: outline ? 2 : 0, */
  };

  const textOverride = {
    color: outline ? bg || '#444' : color || styles.text.color,
    fontSize: fontSize || styles.text.fontSize,
    textAlign: textAlign || styles.text.textAlign,
    fontFamily,
  };

  const child = children ? (
    children
  ) : typeof content === 'string' ? (
    <Text style={[styles.text, textOverride, textStyle]}>{content}</Text>
  ) : (
    content
  );

  if (logStyle) {
    console.log(`${logStyle} style:`, {
      btn: { ...buttonOverride, ...buttonStyle },
      conentContainer: styles.contentContainer,
    });
  }

  return (
    <TouchableHighlight
      style={[buttonOverride, buttonStyle]}
      {...props}
      underlayColor={null}
    >
      <Section style={styles.contentContainer}>
        {/* <Section fillW fillH position="absolute" style={{ zIndex: 0 }}> */}
        <Image
          source={img}
          alt="button_underlay"
          resizeMode="contain"
          style={{
            position: 'absolute',
            zIndex: 0,
            width: '100%',
            height: '100%',
          }}
        />
        {/* </Section> */}
        {child}
      </Section>
    </TouchableHighlight>
  );
};

export default withState(Btn);

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    padding: 0,
    margin: 10,
    overflow: 'visible',
    /* backgroundColor: '#444', */
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
    overflow: 'visible',
  },
  text: {
    color: '#eee',
    fontSize: 40,
    textAlign: 'center',
  },
});
