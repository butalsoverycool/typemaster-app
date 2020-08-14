import { StyleSheet } from 'react-native';

export const colors = {
  light: '#eee',
  dark: '#444',
};

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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '100%',
    minWidth: '100%',
  },
  label: {
    fontWeight: 'bold',
  },
});

export const buttonGroupStyle = StyleSheet.create({
  containerStyle: { borderWidth: 0 },
  buttonContainerStyle: { backgroundColor: '#eee' },
  buttonStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
  innerBorderStyle: { width: 0 },
  selectedButtonStyle: {
    backgroundColor: '#444',
    marginRight: 5,
  },
  textStyle: { fontSize: 12, textAlign: 'center' },
  selectedTextStyle: {
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
});
