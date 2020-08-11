import React, { Component, useState } from 'react';
import {
  Alert,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { pure } from 'recompose';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(np, ns) {
    return this.props.visible !== np.visible ? true : false;
  }

  render() {
    console.log('Modal render');

    return (
      <RNModal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={null}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{this.props.children}</View>
        </View>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '95%',
    height: '60%',
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
    borderRadius: 20,
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

export default Modal;
