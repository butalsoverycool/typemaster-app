import React, { Component, createRef } from 'react';
import { StyleSheet } from 'react-native';
import { Input as RNEInput } from 'react-native-elements';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
  }

  componentDidMount() {
    if (this.props.focus && !this.ref.current.isFocused()) {
      this.ref.current.focus();
    }
  }

  componentDidUpdate(pp) {
    if (pp.triggerUpdate !== this.props.triggerUpdate) {
      if (this.props.focus && !this.ref.current.isFocused()) {
        this.ref.current.focus();
      }
    }
  }

  render() {
    const {
      w,
      h,
      fontSize,
      bg,
      color,
      triggerUpdate,
      focus = false,
      onChangeText,
      onKeyPress,
      value,
      on,
      ...props
    } = this.props;

    const propRes = {};

    Object.keys(this.props).forEach(key => {
      if (this.props[key]) {
        propRes[key] = this.props[key];
      }
    });

    return (
      <RNEInput
        ref={this.ref}
        focus={focus}
        inputContainerStyle={[inputStyle.container, props.containerStyle]}
        inputStyle={[inputStyle.input, props.style]}
        defaultValue={value}
        {...on}
        {...props}
      />
    );
  }
}

const inputStyle = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    alignSelf: 'center',
    width: '80%',
    height: 50,
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 0,
    color: '#444',
  },
});
