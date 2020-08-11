import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

export default ({ wrapperStyle, containerStyle, row, ...props }) => {
  const flexOverride = {
    flexDirection: row ? 'row' : 'column',
  };

  return (
    <Card
      containerStyle={[styles.container, containerStyle]}
      wrapperStyle={[styles.wrapper, flexOverride, wrapperStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {},
});
