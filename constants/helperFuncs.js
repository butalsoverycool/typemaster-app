import React, { useRef, useEffect } from 'react';
import library from './library';

export const usePrev = val => {
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
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

export const timestamp = (tag = null) => {
  const d = new Date();
  const date = d.toLocaleDateString(),
    time = d.toLocaleTimeString();

  const weekday = d.getDay() === 0 ? 6 : d.getDay() === 1 ? 0 : d.getDay();

  let res = {
    date,
    time,
  };

  if (tag && typeof tag === 'string') {
    res.tag = tag;
  }

  return res;
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
