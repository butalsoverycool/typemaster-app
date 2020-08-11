import React from 'react';
import { StyleSheet, View } from 'react-native';

const VIEW = ({
  style: customStyle,
  row,
  justify,
  align,
  children,
  ...props
}) => {
  const flexOverride = {
    flexDirection: row ? 'row' : 'column',
    justifyContent: justify ? justify : 'flex-start',
    alignItems: align ? align : 'center',
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
  },
});
