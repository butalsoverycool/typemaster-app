import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: { alignItems: 'center', marginTop: 20, marginBottom: 20 },

  groupLabel: {
    margin: 10,

    width: 100,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  inputContainerStyle: { borderBottomWidth: 0 },
  inputStyle: {
    height: 50,
    backgroundColor: '#ddd',
    textAlign: 'center',
    borderBottomWidth: 0,
  },

  sectionContentContainer: { marginTop: 10 },
});

export default styles;

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
