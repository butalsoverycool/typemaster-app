import { Audio } from 'expo-av';
import { arrToObjectLookup } from './helperFuncs';
import sounds from '../lib/sounds';

const vol = {
  low: 0.2,
  medium: 0.5,
  high: 0.8,
};

const volPreset = [
  {
    vol: vol.low,
    sounds: ['confirm', 'main', 'erase', 'type', 'success', 'gasp'],
  },
  {
    vo: vol.medium,
    sounds: [],
  },
  {
    vol: vol.high,
    sounds: [],
  },
];

const getVol = name =>
  volPreset.reduce((initial, preset) => {
    const shouldSetVol = preset.sounds.some(s => s === name);
    return shouldSetVol ? preset.vol : initial;
  }, 1);

const soundStatus = {
  shouldPlay: false,
  rate: 1.0,
  shouldCorrectPitch: false,
  volume: 1,
  isMuted: false,
};

export const createAudio = async ({ file: source, name }) => {
  const sound = new Audio.Sound();

  const initialStatus = { ...soundStatus, volume: getVol(name) };

  await sound.loadAsync(source, initialStatus, true);

  return {
    name,
    file: sound,
  };
};

export const loadSound = async ({ name, file }) => {
  const isArr = Array.isArray(file);

  if (isArr) {
    const promiseArray = file.map(
      async f => await createAudio({ name, file: f })
    );

    return await Promise.all(promiseArray);
  }

  return await createAudio({ name, file });
};

export default async () => {
  const soundPromises = sounds.map(loadSound);
  const soundArr = await Promise.all(soundPromises);
  const lookup = arrToObjectLookup(soundArr);

  return lookup;
};
