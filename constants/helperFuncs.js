import React, { useRef, useEffect } from 'react';
import library from './library';
import { Audio } from 'expo-av';

const tryCallBack = (cb, args = null) => {
  if (typeof cb === 'function') cb(args);
};

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
  //console.log('comparing', a, b);
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
    console.log(`Sound ${name} loaded.`);

    console.log(
      'src.len',
      src.length,
      'sounds.len',
      Object.keys(sounds).length
    );
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

export const playSound = async (src, cb) => {
  try {
    await src.sound.replayAsync();
    tryCallBack(cb);
  } catch (err) {
    const errMsg = 'Failed to play sound: ' + err;
    console.log(errMsg);
    tryCallBack(cb, { err: errMsg });
  }
};

export const stopSound = async ({ sound, cb }) => {
  try {
    await sound.stopAsync()();
    cb();
  } catch (err) {
    const errMsg = 'Failed to stop sound: ' + err;
    console.log(errMsg);
    cb({ err: errMsg });
  }
};
