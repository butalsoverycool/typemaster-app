import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  section: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 0,
    paddingBottom: 0,
    padding: 10,
    /* flex: 1, */
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: { marginTop: 5 },
  badge: { padding: 10 },
  badgeStyle: { height: 30, width: 90, marginLeft: 5, marginRight: 5 },

  label: {
    width: 50,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default styles;
