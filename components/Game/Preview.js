import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { withState } from '../GameState';
import { levels } from '../../constants/options';
import theme from '../../constants/theme';
import { propsChanged } from '../../constants/helperFuncs';

const localStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },

  label: {
    marginTop: 5,
    marginBottom: 0,

    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    minWidth: '100%',
  },

  text: {
    width: '100%',
    minWidth: '100%',
    textAlign: 'center',
    marginBottom: 5,
  },
});

class Preview extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, ['material, settings']);

  render() {
    const {
      settings,
      material: { title, text },
    } = this.props.gameState;

    return (
      <View style={theme.section}>
        <View style={localStyles.container}>
          <Text style={[localStyles.label, { fontSize: 22 }]}>
            Text to type
          </Text>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'black',
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <Text style={localStyles.label}>Title</Text>
            <Text style={localStyles.text}>{title}</Text>
            <Text style={localStyles.label}>Length</Text>
            <Text style={localStyles.text}>{text.length}</Text>
            <Text style={localStyles.label}>Level</Text>
            <Text style={localStyles.text}>{levels[settings.level]}</Text>
          </View>

          <Button
            buttonStyle={{
              marginTop: 5,
              borderRadius: 5,
              backgroundColor: '#444',
            }}
            titleStyle={{ color: 'whitesmoke' }}
            title="change text"
            onPress={() => setMaterial()}
          />
        </View>
      </View>
    );
  }
}
export default withState(Preview);
