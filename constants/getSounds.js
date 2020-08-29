import { Audio } from 'expo-av';

const files = {
  ding: require('../assets/audio/ding.wav'),
  fail: require('../assets/audio/fail.mp3'),
  success: require('../assets/audio/success.mp3'),

  confirm1: require('../assets/audio/confirm1.wav'),
  confirm2: require('../assets/audio/confirm2.wav'),
  confirm3: require('../assets/audio/confirm3.wav'),
  confirm4: require('../assets/audio/confirm4.wav'),

  type1: require('../assets/audio/type1.wav'),
  type2: require('../assets/audio/type2.wav'),
  type3: require('../assets/audio/type3.wav'),
  type4: require('../assets/audio/type4.wav'),
  type5: require('../assets/audio/type5.wav'),
  type6: require('../assets/audio/type6.wav'),
  type7: require('../assets/audio/type7.wav'),
  type8: require('../assets/audio/type8.wav'),
  type9: require('../assets/audio/type9.wav'),
  type10: require('../assets/audio/type10.wav'),
  type11: require('../assets/audio/type11.wav'),
  type12: require('../assets/audio/type12.wav'),
  type13: require('../assets/audio/type13.wav'),
  type14: require('../assets/audio/type14.wav'),
  type15: require('../assets/audio/type15.wav'),
  type16: require('../assets/audio/type16.wav'),
  type17: require('../assets/audio/type17.wav'),
  type18: require('../assets/audio/type18.wav'),
  type19: require('../assets/audio/type19.wav'),
  type20: require('../assets/audio/type20.wav'),
};

export default cb => {
  const sounds = {};
  //const names = Object.keys(files);

  const load = async name => {
    const sound = new Audio.Sound();
    await sound.loadAsync(files[name]);
    sounds[name] = sound;
  };

  Object.keys(files).forEach(name => load(name));

  return cb(sounds);
};
