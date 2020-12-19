import React, { useRef, useEffect } from 'react';
import library from './library';
import { Audio } from 'expo-av';

export const getTime = (time, typedString = '') => {
  const units = {
    m: Math.floor(((time / 10) % 3600) / 60),
    s: Math.floor(time / 10) % 60,
    ds: Math.floor(time % 10),
    sTot: time / 10,
  };

  return {
    ...units,

    // formatted
    mStr: units.m >= 10 ? units.m : '0' + units.m,
    sStr: units.s >= 10 ? units.s : '0' + units.s,

    // speed (correct chars per sec)
    CCPS: typedString.length / units.sTot || null,
  };
};

export const compareTwo = (a, b) => {
  return a < b ? 'a' : a > b ? 'b' : 'same';
};

export const timeStampToString = stamp => ({
  date: stamp.date.replace(/\//g, ''),
  time: stamp.time.replace(/:/g, ''),
});

export const timeStamp = (tag = null) => {
  const d = new Date();

  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString();

  const obj = {
    year: d.getFullYear(),
    month: d.getMonth(),
    date: d.getDate(),
    weekday: d.getDay() === 0 ? 6 : d.getDay() === 1 ? 0 : d.getDay(),
    min: d.getMinutes(),
    sec: d.getSeconds(),
  };

  let res = {
    date,
    time,
    obj,
  };

  if (tag && typeof tag === 'string') {
    res.tag = tag;
  }

  return res;
};

export const pointCalc = (points, ccps) => {
  const res = Math.round((points + ccps) * 100) / 100;
  return res && res !== Infinity ? res : 0;
};

export const usePrev = val => {
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
};

export const deepEqual = (x, y, propName) => {
  if (x === y) {
    return true;
  } else if (
    typeof x == 'object' &&
    x != null &&
    typeof y == 'object' &&
    y != null
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop], prop)) return false;
      } else return false;
    }

    return true;
  } else return false;
};

export const propsChanged = (a, b, keys) => {
  let x = {};
  let y = {};

  if (typeof keys === 'string') {
    x[keys] = a[keys];
    y[keys] = b[keys];
  } else if (Array.isArray(keys)) {
    keys.forEach(key => {
      x[key] = a[key];
      y[key] = b[key];
    });
  } else if (!keys) {
    x = a;
    y = b;
  }

  return !deepEqual(x, y);
};

export const mathRandInc = (...args) => {
  let min, max;

  if (typeof args[0] === 'number' && typeof args[1] === 'number') {
    min = args[0];
    max = args[1];
  } else if (typeof args[0] === 'number') {
    min = 0;
    max = args[0];
  } else if (typeof args[0] === 'object') {
    min = Math.ceil(args[0].min) || 0;
    max = Math.floor(args[0].max);
  } else {
    return 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randOfArr = arr => arr[mathRandInc(arr.length - 1)];

export const pickMaterial = () =>
  library[mathRandInc({ max: library.length - 1 })];

export const printStr = item =>
  typeof item === 'string' ? item : String(item);

export const formatAuth = auth => {
  const { uid, email, displayName, providerData } = auth;
  const {
    displayName: name,
    phoneNumber: phone,
    photoURL: photo,
    providerId: authMethod,
  } = providerData[0];

  // merge auth and db user
  return {
    uid,
    email,
    name,
    photo,
    phone,
    authMethod,
    emailVerified: auth.emailVerified,
    roles: auth.roles,
    lastLogin: timeStamp(),
  };
};

export const clone = (obj, keyName) => {
  // if level bottom or key is 'ref' return val
  if (obj === null || typeof obj !== 'object' || keyName === 'ref') {
    return obj;
  }

  const copy = obj.constructor();

  for (var key in obj) {
    copy[key] = clone(obj[key], key);
  }
  return copy;
};

export const getRefSize = ref => {
  let res = {
    w: undefined,
    h: undefined,
  };

  if (ref) {
    if (ref.current) {
      res.w = ref.current.clientWidth;
      res.h = ref.current.clientHeight;
    }
  }

  return res;
};

export const firstCap = word => {
  return word[0].toUpperCase() + word.substring(1);
};

export const loadSound = async ({ sound, name, ext = 'wav', cb }) => {
  /* try {
    const path = '../assets/audio/' + name + '.wav';
    const file = require(path);
    await sound.loadAsync(file);

    cb({ sound, name, err: null });
  } catch (err) {
    cb({ err });
  } */
};

export const loadSounds = async ({ src, cb }) => {
  let sounds = {};

  const confirm = ({ err, name, sound }) => {
    if (err) {
      const errMsg = `Err when loading sound ${name} (${err})`;
      console.log(errMsg);
      return cb({ err: errMsg });
    }

    sounds[name] = sound;
    //console.log(`Sound ${name} loaded.`);

    if (Object.keys(sounds).length >= src.length) {
      console.log('ALL SOUNDS LOADED');
      cb({ sounds, err: null });
    }
  };

  src.forEach(item => {
    loadSound({
      name: item.name,
      ext: item.type,
      sound: item.sound,
      cb: confirm,
    });
  });
};

export const tryCallback = (cb, args = null) => {
  if (typeof cb === 'function') cb(args);
};

export const replay = async ({ sound, props, cb }) => {
  try {
    await sound.replayAsync();
    tryCallback(cb, { sound });
  } catch (err) {
    const errMsg = `Sound fail (${props.name}): ${err}`;
    console.log(errMsg);
  }
};

export const playSound = async (props, cb) => {
  /// bail if
  // muted mode
  if (props.muted) return;

  // if sound provided, just play
  if (props.sound) {
    if (props.vol) {
      await props.sound.setVolumeAsync(props.vol);
    }

    replay({ sound: props.sound, props, cb: props.cb });

    return tryCallback(cb, { sound });
  }

  // no sounds available
  if (!props.sounds) return console.log('Sounds not loaded yet');

  // pick out props
  let name = typeof props === 'object' ? props.name : props;
  let index = typeof props === 'object' ? props.index : null;

  // bail if no sound selected
  if (!name) return console.log('no sound name provided');

  //console.log(`playSound()... (${name})`);

  //let sound = props.sounds[name];
  let sound = props.sound;

  // located 1 level deep? pick index
  if (Array.isArray(sound)) {
    sound = sound[index || mathRandInc(0, sound.length - 1)];
  }

  // on playback status change
  const onStatusChange = status => {
    if (!status.isLoaded) {
      // not loaded
      if (status.error) {
        console.log(
          `Encountered a fatal error during playback: ${status.error}`
        );
      }
    } else {
      // loaded
      if (status.isPlaying) {
        // is playing
      } else {
        tryCallback(props.onStop, { sound });
        // stopped/paused
      }

      if (status.isBuffering) {
        // Update your UI for the buffering state
      }

      if (status.didJustFinish && !status.isLooping) {
        // on finish
        tryCallback(props.onFinish, { sound });
      }
    }
  };

  if (typeof sound.setOnPlaybackStatusUpdate === 'function') {
    try {
      sound.setOnPlaybackStatusUpdate(onStatusChange);
    } catch (err) {
      console.log('Sound status change cb-error:', err);
    }
  }

  if (props.vol && typeof props.vol === 'number') {
    await sound.setVolumeAsync(props.vol);
  }

  replay({ sound, props, cb });
};

export const arrToMap = arr => {
  const lookup = new Map();

  const writeToMap = value => {
    const isArr = Array.isArray(value);
    const name = isArr ? value[0].name : value.name;
    const file = isArr ? value.map(v => v.file) : value.file;

    lookup.set(name, file);
  };

  arr.forEach(writeToMap);

  return lookup;
};
