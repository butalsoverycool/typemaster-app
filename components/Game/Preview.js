import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { withState } from '../GameState';
import { levels } from '../../constants/options';
import theme from '../../constants/theme';
import { propsChanged } from '../../constants/helperFuncs';
import { Section } from '../Elements';

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

    const { setMaterial } = this.props.gameSetters;

    return (
      <Section spaceTop={0}>
        <Text style={theme.subtitle}>Text to type</Text>

        <Section row>
          <Section align="space-around" flex={1}>
            <Text style={theme.label}>Title</Text>
            <Text style={theme.label}>Length</Text>
            <Text style={theme.label}>Level</Text>
          </Section>
          <Section align="flex-start" flex={1}>
            <Text>{title}</Text>
            <Text>{text.length}</Text>
            <Text>{levels[settings.level]}</Text>
          </Section>
        </Section>

        <Button
          buttonStyle={{
            marginTop: 5,
            borderRadius: 5,
            backgroundColor: '#444',
          }}
          titleStyle={{ color: 'whitesmoke' }}
          title="change text"
          onPress={setMaterial}
        />
      </Section>
    );
  }
}
export default withState(Preview);
