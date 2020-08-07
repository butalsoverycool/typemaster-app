import React from 'react';
import library from './library';

export const pickMaterial = () => {
  const rand = Math.floor(Math.random() * (library.length - 1 + 1));

  return library[rand];
};

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
