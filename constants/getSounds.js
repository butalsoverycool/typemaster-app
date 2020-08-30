import { Audio } from 'expo-av';

const files = {
  ding: require('../assets/audio/ding.wav'),
  fail: require('../assets/audio/fail.mp3'),
  success: require('../assets/audio/success.mp3'),

  confirm: [
    require('../assets/audio/confirm1.wav'),
    require('../assets/audio/confirm2.wav'),
    require('../assets/audio/confirm3.wav'),
    require('../assets/audio/confirm4.wav'),
    require('../assets/audio/confirm5.wav'),
  ],

  type: [
    require('../assets/audio/type1.wav'),
    require('../assets/audio/type2.wav'),
    require('../assets/audio/type3.wav'),
    require('../assets/audio/type4.wav'),
    require('../assets/audio/type5.wav'),
    require('../assets/audio/type6.wav'),
    require('../assets/audio/type7.wav'),
    require('../assets/audio/type8.wav'),
    require('../assets/audio/type9.wav'),
    require('../assets/audio/type10.wav'),
    require('../assets/audio/type11.wav'),
    require('../assets/audio/type12.wav'),
    require('../assets/audio/type13.wav'),
    require('../assets/audio/type14.wav'),
    require('../assets/audio/type15.wav'),
    require('../assets/audio/type16.wav'),
    require('../assets/audio/type17.wav'),
    require('../assets/audio/type18.wav'),
    require('../assets/audio/type19.wav'),
    require('../assets/audio/type20.wav'),
  ],

  erase: [
    require('../assets/audio/erase01.wav'),
    require('../assets/audio/erase02.wav'),
    require('../assets/audio/erase03.wav'),
    require('../assets/audio/erase04.wav'),
    require('../assets/audio/erase05.wav'),
  ],

  gasp: [
    require('../assets/audio/gasp1.wav'),
    require('../assets/audio/gasp2.wav'),
    require('../assets/audio/gasp3.wav'),
    require('../assets/audio/gasp4.wav'),
    require('../assets/audio/gasp5.wav'),
    require('../assets/audio/gasp6.wav'),
    require('../assets/audio/gasp7.wav'),
    require('../assets/audio/gasp8.wav'),
  ],

  tension: require('../assets/audio/tension.mp3'),
  darkMajor3: require('../assets/audio/darkMajor3.mp3'),
  dark4: require('../assets/audio/dark4.mp3'),
  darkAug4: require('../assets/audio/darkAug4.mp3'),
  dark5: require('../assets/audio/dark5.mp3'),
};

export default cb => {
  const sounds = {};
  //const names = Object.keys(files);

  const load = async (file, cb) => {
    const sound = new Audio.Sound();
    await sound.loadAsync(file);
    cb(sound);
  };

  const loadOrLoop = (src, name, cb) => {
    if (Array.isArray(src[name])) {
      const subSounds = [];

      src[name].forEach((item, nth) => {
        load(item, sound => {
          subSounds.push(sound);
        });
      });

      cb(subSounds);
    } else {
      load(src[name], sound => {
        cb(sound);
      });
    }
  };

  Object.keys(files).forEach(name => {
    loadOrLoop(files, name, sound => {
      sounds[name] = sound;
    });
  });

  return cb(sounds);
};
