import React from 'react';
import { StyleSheet, View } from 'react-native';

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
  spaceTop,
  spaceBottom,
  children,
  ...props
}) => {
  const flexOverride = {
    flexDirection: row ? 'row' : 'column',
    justifyContent: justify ? justify : 'flex-start',
    alignItems: align ? align : 'center',
    minWidth: fillW ? '100%' : null,
    minHeight: fillH ? '100%' : null,
    backgroundColor: bg ? bg : styles.section.backgroundColor,
    marginTop: spaceTop ? spaceTop || 20 : 0,
    marginBottom: spaceBottom ? spaceBottom || 20 : 0,
    width: w ? w : '100%',
    height: h ? h : 'auto',
    flex,
  };

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
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
