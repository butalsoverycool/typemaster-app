import React, { Component, memo } from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Section from './Section';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forceClose: false,
      forceOpen: true,
    };
  }

  /* shouldComponentUpdate(np, ns) {
    return (
      this.props.visible !== np.visible ||
      this.props.updateTrigger !== np.updateTrigger ||
      this.state.forceClose !== ns.forceClose ||
      this.state.forceOpen !== ns.forceOpen
    );
  } */

  componentDidMount() {
    this.setState({ forceOpen: false });
  }

  componentWillUnmount() {
    this.setState({ forceClose: true });
  }

  render() {
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
      visible,
      updateTrigger,
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
        visible={(visible || this.state.forceOpen) && !this.state.forceClose}
        animationType="slide"
        transparent={false}
        onShow={() => {}}
        onDismiss={() => this.setState({ forceClose: true })}
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
    backgroundColor: 'red', //'#eee',
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

/* const Memo = memo(p => <Modal {...p} />); */

export default Modal;
