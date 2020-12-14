import React, { memo, Component, createRef } from 'react';
import { StyleSheet } from 'react-native';
import { Input as RNEInput } from 'react-native-elements';
import { font } from '../../constants/theme';
import { withState } from '../GameState';

class Input extends Component {
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

export default memo(p => <Input {...p} />);

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
    fontFamily: font.secondary,
    fontSize: 34,
  },
});
