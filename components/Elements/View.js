import React from 'react';
import { StyleSheet, View } from 'react-native';

export default ({ style: customStyle, row, justify, align, ...props }) => {
  const flexOverride = {
    flexDirection: row ? 'row' : 'column',
    justifyContent: justify ? justify : 'flex-start',
    alignItems: align ? align : 'center',
  };

  return <View style={[styles.view, flexOverride, customStyle]} {...props} />;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#eee',
  },
});
