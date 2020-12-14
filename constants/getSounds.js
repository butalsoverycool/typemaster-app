import { Audio } from 'expo-av';

const files = {
  main: require('../assets/audio/main.mp3'),
  ding: require('../assets/audio/ding.wav'),
  fail: require('../assets/audio/fail.mp3'),
  success: require('../assets/audio/success.mp3'),
  back: require('../assets/audio/success.mp3'),

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

  tab1: require('../assets/audio/tab1.mp3'),
  tab2: require('../assets/audio/tab2.mp3'),
  tab3: require('../assets/audio/tab3.mp3'),

  pop: [
    require('../assets/audio/pop01.wav'),
    require('../assets/audio/pop02.wav'),

    require('../assets/audio/pop03.wav'),

    require('../assets/audio/pop04.wav'),
  ],

  nice: require('../assets/audio/nice.mp3'),
  pianoRoll: require('../assets/audio/pianoRoll.mp3'),
  waitForIt: require('../assets/audio/waitForIt.mp3'),

  blipBlop1: require('../assets/audio/blipBlop1.mp3'),
  blipBlop2: require('../assets/audio/blipBlop2.mp3'),
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
  'gasp'
    ],
    
  },
  {
    vo: vol.medium,
    sounds: [],
  },
{
  vol: vol.high,
  sounds: [],
}
]

const ajustVolume = (name, sound) => {
  volPreset.forEach(preset => {
    const shouldSetVol = preset.sounds.some(s => s === name);
    if(shouldSetVol) await sound.setVolumeAsync(preset.vol)
  })
}

export const loadSound = async ({ file, name }, cb) => {
  const sound = new Audio.Sound();
  
  await sound.loadAsync(file);

  const vol = {
    low: 0.2, medium: 0.5, high: 0.8
  }

  ajustVolume(name, sound)


  cb(sound);
};

export default cb => {
  const sounds = {};
  //const names = Object.keys(files);

  const loadOrLoop = (src, name, cb) => {
    if (Array.isArray(src[name])) {
      const subSounds = [];

      src[name].forEach((file, nth) => {
        loadSound({ file, name }, sound => {
          subSounds.push(sound);
        });
      });

      cb(subSounds);
    } else {
      loadSound({ file: src[name], name }, sound => {
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
