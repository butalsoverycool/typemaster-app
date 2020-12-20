import React, { useState, useEffect } from 'react';
import Section from './Section';
import Text from './Text';
import { usePrev } from '../../utils/helperFuncs';
import Spinner from 'react-native-loading-spinner-overlay';
import { hide } from 'expo-splash-screen';

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

  const [display, setDisplay] = useState(false);
  const [delay, setDelay] = useState(null);

  const prevVisible = usePrev(visible);

  // to let elems behind finish render
  const hideWithDelay = () => {
    setDelay(
      setTimeout(() => {
        setDisplay(false);
      }, 200)
    );
  };

  useEffect(() => {
    if (!prevVisible && visible) {
      setDisplay(true);
    }

    if (prevVisible && !visible) {
      hideWithDelay();
    }

    return () => {
      clearTimeout(delay);
    };
  }, [visible, prevVisible]);

  return (
    <Section justify="center" align="center">
      <Spinner {...props} {...overridables} visible={display} />
      {children}
    </Section>
  );
};
