import React from 'react';
import Section from './Section';
import Text from './Text';
import Spinner from 'react-native-loading-spinner-overlay';

export default ({
  visible,
  textContent,
  textStyle,
  overlayColor,
  color,
  animation,
  cancelable,
  children = null,
  ...props
}) => {
  const overridables = {
    visible: visible || true,
    textContent: textContent || 'Loading',
    textStyle: {
      color: '#eee',
      ...(textStyle || null),
    },
    overlayColor: overlayColor || '#444',
    color: color || '#eee',
    animation: animation || 'fade',
    cancelable: cancelable || false,
  };

  return (
    <Section justify="center" align="center">
      <Spinner {...props} {...overridables} />
      {children}
    </Section>
  );
};
