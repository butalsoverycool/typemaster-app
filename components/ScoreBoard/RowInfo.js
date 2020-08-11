import React, { useState } from 'react';
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

const NameInput = ({
  gameState: { gameFinished, settings },
  gameSetters: { setTyper },
  visible,
}) => {
  const [newTyper, setNewTyper] = useState('');

  return (
    <Modal visible={visible}>
      <View style={theme.section}>
        <Text style={theme.title}>Type your name for the scoreboard!</Text>
      </View>

      <View style={theme.section}>
        <Input placeholder="Unknown" onChangeText={setNewTyper} />
      </View>

      <View style={[theme.section, { justifyContent: 'flex-start' }]}>
        <TouchableHighlight
          style={{
            ...styles.openButton,
            backgroundColor: '#444',
            marginTop: 30,
          }}
          onPress={() => {
            if (newTyper !== '') {
              setTyper({ typer: newTyper });
            }
          }}
        >
          <Text style={styles.textStyle}>Save</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={{
            ...styles.openButton,
            backgroundColor: 'red',
            marginTop: 50,
          }}
          onPress={() => setTyper({ typer: 'Unknown' })}
        >
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

export default withState(NameInput);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
