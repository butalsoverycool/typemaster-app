import React from 'react';
import { StyleSheet, ScrollView as RNScrollView } from 'react-native';

export default props => (
  <RNScrollView contentContainerStyle={[styles.scrollView, props.style]}>
    {props.children}
  </RNScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
