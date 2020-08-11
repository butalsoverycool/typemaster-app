import React, { Component, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Modal from '../Elements/Modal';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import Input from '../Elements/Input';

class NameInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTyper: '',
    };
  }

  shouldComponentUpdate(np, ns) {
    return this.props.visible !== np.visible ||
      this.props.typerExists !== np.typerExists ||
      this.props.gameState.settings.typer !== np.gameState.settings.typer
      ? true
      : false;
  }

  render() {
    const {
      gameState: {
        settings: { typer },
      },
      gameSetters: { setTyper, saveScore },
      visible,
      typerExists,
      ...props
    } = this.props;

    // const [newTyper, setNewTyper] = useState('');

    const title = typerExists
      ? 'Same name for the Scoreboard?'
      : 'Now type your name for the scoreboard!';

    const confirm = typerExists && this.state.newTyper === '' ? 'Yes' : 'Save';

    return (
      <Modal visible={visible}>
        <View style={theme.section}>
          <Text style={theme.title}>{title}</Text>
        </View>

        <View style={theme.section}>
          <Input
            placeholder={typerExists ? typer : 'Unknown'}
            onChangeText={newTyper => this.setState({ newTyper })}
          />
        </View>

        <View style={[theme.section, { justifyContent: 'flex-start' }]}>
          <TouchableHighlight
            style={{
              ...styles.openButton,
              backgroundColor: '#444',
              marginTop: 30,
            }}
            onPress={() => {
              if (typerExists || this.state.newTyper !== '') {
                setTyper({
                  typer: this.state.newTyper || typer,
                  callback: () => {
                    saveScore();
                    this.setState({ newTyper: '' });
                  },
                });
              }
            }}
          >
            <Text style={styles.textStyle}>{confirm}</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              ...styles.openButton,
              backgroundColor: 'red',
              marginTop: 50,
            }}
            onPress={() => setTyper({ typer: '', callback: () => saveScore() })}
          >
            <Text style={styles.textStyle}>No name</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

export default withState(NameInput);

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
