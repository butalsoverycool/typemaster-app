import { Audio } from 'expo-av';
import { arrToMap } from './helperFuncs';

/* const files = {
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
}; */

const files = [
  { name: 'main', file: require('../assets/audio/main.mp3') },
  { name: 'ding', file: require('../assets/audio/ding.wav') },
  { name: 'fail', file: require('../assets/audio/fail.mp3') },
  { name: 'success', file: require('../assets/audio/success.mp3') },
  { name: 'back', file: require('../assets/audio/success.mp3') },

  {
    name: 'confirm',
    file: [
      require('../assets/audio/confirm1.wav'),
      require('../assets/audio/confirm2.wav'),
      require('../assets/audio/confirm3.wav'),
      require('../assets/audio/confirm4.wav'),
      require('../assets/audio/confirm5.wav'),
    ],
  },

  {
    name: 'type',
    file: [
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
  },

  {
    name: 'erase',
    file: [
      require('../assets/audio/erase01.wav'),
      require('../assets/audio/erase02.wav'),
      require('../assets/audio/erase03.wav'),
      require('../assets/audio/erase04.wav'),
      require('../assets/audio/erase05.wav'),
    ],
  },

  {
    name: 'gasp',
    file: [
      require('../assets/audio/gasp1.wav'),
      require('../assets/audio/gasp2.wav'),
      require('../assets/audio/gasp4.wav'),
      require('../assets/audio/gasp5.wav'),
      require('../assets/audio/gasp6.wav'),
      require('../assets/audio/gasp7.wav'),
      require('../assets/audio/gasp8.wav'),
      require('../assets/audio/gasp3.wav'),
    ],
  },

  { name: 'tension', file: require('../assets/audio/tension.mp3') },

  { name: 'tab1', file: require('../assets/audio/tab1.mp3') },
  { name: 'tab2', file: require('../assets/audio/tab2.mp3') },
  { name: 'tab3', file: require('../assets/audio/tab3.mp3') },

  {
    name: 'pop',
    file: [
      require('../assets/audio/pop01.wav'),
      require('../assets/audio/pop02.wav'),

      require('../assets/audio/pop03.wav'),

      require('../assets/audio/pop04.wav'),
    ],
  },

  { name: 'nice', file: require('../assets/audio/nice.mp3') },
  { name: 'pianoRoll', file: require('../assets/audio/pianoRoll.mp3') },
  { name: 'waitForIt', file: require('../assets/audio/waitForIt.mp3') },

  { name: 'blipBlop1', file: require('../assets/audio/blipBlop1.mp3') },
  { name: 'blipBlop2', file: require('../assets/audio/blipBlop2.mp3') },
];

// const soundCount = files.reduce((tot, next) => {
//   if (Array.isArray(next.file)) {
//     return tot + next.file.length;
//   }

//   return tot + 1;
// }, 0);

// console.log('COUNT', soundCount);

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

const ajustVolume = async (name, sound) => {
  volPreset.forEach(async preset => {
    const shouldSetVol = preset.sounds.some(s => s === name);
    if (shouldSetVol) await sound.setVolumeAsync(preset.vol);
  });
};

export const loadSound = async ({ file, name }, cb) => {
  const sound = new Audio.Sound();

  await sound.loadAsync(file);

  await ajustVolume(name, sound);

  return {
    name,
    file: sound,
  };
};

const loadSounds = async ({ name, file }) => {
  if (Array.isArray(file)) {
    const promiseArray = file.map(
      async f => await loadSound({ name, file: f })
    );

    return await Promise.all(promiseArray);
  }

  return await loadSound({ name, file });
};

export default async () => {
  const soundArr = await Promise.all(files.map(loadSounds));

  return arrToMap(soundArr);
};

/* 
import { Audio } from 'expo-av';
import { useEffect } from 'react';



const soundCount = files.reduce((tot, next) => {
  if (Array.isArray(next.file)) {
    return tot + next.file.length;
  } else {
    return tot + 1;
  }
}, 0);

console.log('soundCount', soundCount);

const vol = {
  low: 0.2,
  medium: 0.5,
  high: 0.8,
};

const volumePreset = [
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
    vol: vol.medium,
    sounds: [],
  },
  {
    vol: vol.high,
    sounds: [],
  },
];

const adjustVolume = (name, sound, next) => {
  volumePreset.forEach(async preset => {
    const shouldSetVol = preset.sounds.some(soundName => soundName === name);
    if (shouldSetVol) {
      await sound.setVolumeAsync(preset.vol);
    }
    next(sound);
  });
};

export const loadSound = async ({ name, file }, cb) => {
  const sound = new Audio.Sound();

  await sound.loadAsync(file);

  adjustVolume(name, sound, withVolume => {
    cb(withVolume);
  });
};

export default cb => {
  console.log('SOUND RENDER');
  const sounds = {};
  let promises = [];
  let loaded = 0;

  const count = name => {
    loaded += 1;
    // console.log(loaded, name, 'loaded');
  };

  const loadOrLoop = (name, file) => {
    if (Array.isArray(file)) {
      // const soundArray = [];
      sounds[name] = [];

      file.forEach((file, index) => {
        const p = new Promise((resolve, reject) => {
          loadSound({ name, file }, sound => {
            count(name, +'-' + index);
            sounds[name].push(sound);
            resolve(name);
          });
        });

        promises.push(p);
      });
    } else {
      const p = new Promise((resolve, reject) => {
        loadSound({ name, file }, sound => {
          count(name);
          sounds[name] = sound;
          resolve(name);
        });
      });

      promises.push(p);
    }
  };

  files.forEach(({ name, file }, index) => {
    loadOrLoop(name, file);
    /* , sound => {
      sounds[name] = sound; */

// console.log(name,'loaded');
/* if (promises.length === loaded) {
        console.log('SOUNDS LOADED');
        cb([files[0].file]);
      }} 

    console.log('count', loaded);
  });

  // console.log('returning sounds...');
  //return cb(sounds);
}; */
