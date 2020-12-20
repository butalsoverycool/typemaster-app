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
    sounds: [
      'tab1',
      'tab2',
      'tab3',
      'confirm',
      'main',
      'erase',
      'type',
      'success',
      'gasp',
    ],
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

const setVol = async (name, sound) => {
  volPreset.forEach(async preset => {
    const shouldSetVol = preset.sounds.some(s => s === name);

    shouldSetVol && (await sound.setVolumeAsync(preset.vol));
  });
};

export const createAudio = async ({ file, name }) => {
  const sound = new Audio.Sound();

  await sound.loadAsync(file);

  await setVol(name, sound);

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
