import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as RNECard, Input as RNEInput } from 'react-native-elements';

export default StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
  },
  section: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 5,
  },
  box: {
    marginTop: 20,
  },
  fillW: { width: '100%' },
  fullH: { height: '100%' },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    width: '100%',
    minWidth: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '100%',
    minWidth: '100%',
  },
});

const cardStyle = StyleSheet.create({
  container: {},
  wrapper: {},
});

export const Card = props => (
  <RNECard
    containerStyle={cardStyle.container}
    wrapperStyle={cardStyle.wrapper}
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

export const Input = props => (
  <RNEInput
    inputContainerStyle={[inputStyle.container, props.containerStyle]}
    inputStyle={[inputStyle.input, props.style]}
    {...props}
  />
);
