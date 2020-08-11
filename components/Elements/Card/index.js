import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

export default ({ wrapperStyle, containerStyle, row, children, ...props }) => {
  const flexOverride = {
    flexDirection: row ? 'row' : 'column',
  };

  return (
    <Card
      containerStyle={[styles.container, containerStyle]}
      wrapperStyle={[styles.wrapper, flexOverride, wrapperStyle]}
      {...props}
    >
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {},
});
