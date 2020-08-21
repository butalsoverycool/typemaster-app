import React, { Component } from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Section from '../Section';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(np, ns) {
    return this.props.visible !== np.visible ? true : false;
  }

  render() {
    console.log('Modal render');

    const {
      bg,
      bgModal,
      bgContent,
      flex,
      justify,
      align,
      w,
      h,
      padding,
      paddingModal,
      paddingContent,
      shadow,
    } = this.props;

    const bgOverride = {
      ...styles.background,
      backgroundColor: bg || styles.background.backgroundColor,
      padding: padding || styles.background.padding,
    };

    const modalOverride = {
      ...styles.modal,
      backgroundColor: bgModal || styles.modal.backgroundColor,
      justifyContent: justify || styles.modal.justifyContent,
      alignItems: align || styles.modal.alignItems,
      width: w || styles.modal.width,
      height: h || styles.modal.height,
      padding: paddingModal || styles.modal.padding,
    };

    const contentOverride = {
      ...styles.content,
      backgroundColor: bgContent || styles.content.backgroundColor,
      padding: paddingContent || styles.content.padding,
      shadowColor: shadow ? styles.content.shadowColor : null,
      shadowOffset: shadow ? styles.content.shadowOffset : null,
      shadowOpacity: shadow ? styles.content.shadowOpacity : null,
      shadowRadius: shadow ? styles.content.shadowRadius : null,
    };

    return (
      <RNModal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={null}
      >
        <SafeAreaView style={bgOverride}>
          <ScrollView contentContainerStyle={modalOverride}>
            <Section style={contentOverride}>{this.props.children}</Section>
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
    padding: 0,
    backgroundColor: '#eee',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    padding: 0,
    backgroundColor: '#eee',
  },
  content: {
    width: '100%',

    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee',
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
    padding: 0,
  },
});

export default Modal;
