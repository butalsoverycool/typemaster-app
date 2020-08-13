import React, { Component } from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';

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
        <SafeAreaView style={styles.background}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.content}>{this.props.children}</View>
          </ScrollView>
        </SafeAreaView>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  content: {
    width: '100%',

    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,

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
