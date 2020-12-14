import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import { Asset } from 'expo-asset';

export default props => {
  const [splash, setSplash] = useState(null);

  const x = useRef(new Animated.Value(200)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const enter = cb => {
    //console.log('entering splash anim....');
    Animated.parallel([
      Animated.timing(x, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bezier(0, 0, 0, 1),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (typeof props.enterCallback === 'function') props.enterCallback();
    });
  };

  const exit = cb => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (typeof cb === 'function') cb();
    });
  };

  const onLoad = () => {
    enter();
  };

  const loadSplash = () => {
    const img = Asset.fromModule(
      require('../../assets/imgs/typemaster_splash.png')
    ).uri;
    setSplash(img);
  };

  useEffect(() => {
    loadSplash();
  }, []);

  useEffect(() => {
    if (props.exitOn) {
      exit(() => {
        if (typeof props.exitCallback === 'function') props.exitCallback();
      });
    }
  }, [props.exitOn]);

  if (!splash) return null;

  return (
    <Animated.View {...props} style={{ backgroundColor: '#fff' }}>
      <Animated.Image
        source={{ uri: splash }}
        onLoad={onLoad}
        style={{
          opacity,
          transform: [
            {
              translateX: x,
            },
          ],
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#fff',
        }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};
