import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

export default props => (
  <Input
    inputContainerStyle={[inputStyle.container, props.containerStyle]}
    inputStyle={[inputStyle.input, props.style]}
    {...props}
  />
);

const inputStyle = StyleSheet.create({
  container: { borderBottomWidth: 0, alignSelf: 'flex-start' },
  input: {
    width: '100%',
    minWidth: '100%',
    height: 50,
    backgroundColor: '#ddd',
    textAlign: 'center',
    borderBottomWidth: 0,
  },
});
