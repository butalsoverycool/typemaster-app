import React from 'react';
import { StyleSheet, View } from 'react-native';

export default ({ style: customStyle, row, justify, align, ...props }) => {
  const flexOverride = {
    flexDirection: row ? 'row' : 'column',
    justifyContent: justify ? justify : 'flex-start',
    alignItems: align ? align : 'center',
  };

  return (
    <View style={[styles.section, flexOverride, customStyle]} {...props} />
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 5,
  },
});
