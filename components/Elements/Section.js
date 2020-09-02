import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/theme';

const VIEW = ({
  style: customStyle,
  row,
  justify,
  align,
  fillW,
  fillH,
  w,
  h,
  bg,
  flex,
  wrap,
  spaceTop,
  spaceBottom,
  children,
  position,
  padding,
  margin,
  logStyle,
  ...props
}) => {
  const flexOverride = {
    flexDirection: row ? 'row' : 'column',
    justifyContent: justify ? justify : 'flex-start',
    alignItems: align ? align : 'center',
    minWidth: fillW ? '100%' : null,
    minHeight: fillH ? '100%' : null,
    backgroundColor: bg ? bg : styles.section.backgroundColor,
    marginTop: !spaceTop ? 0 : typeof spaceTop === 'number' ? spaceTop : 20,
    marginBottom: !spaceBottom
      ? 0
      : typeof spaceBottom === 'number'
      ? spaceBottom
      : 20,
    width: w ? w : '100%',
    height: h ? h : 'auto',
    flex,
    flexWrap: wrap,
    position: position || null,
    padding: padding || styles.section.padding,
    margin: margin || styles.section.margin,
  };

  if (logStyle) {
    console.log(`${logStyle} style:`, {
      ...styles.section,
      ...flexOverride,
      ...customStyle,
    });
  }

  return (
    <View style={[styles.section, flexOverride, customStyle]} {...props}>
      {children}
    </View>
  );
};

export default VIEW;

const styles = StyleSheet.create({
  section: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    backgroundColor: colors.light,
  },
});
