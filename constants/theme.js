import React from 'react';
import { StyleSheet } from 'react-native';

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
