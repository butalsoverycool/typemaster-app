import { Asset } from 'expo-asset';
import { Image } from 'react-native';
import { arrToMap } from './helperFuncs';

const imgs = [
  { name: 'info', file: require('../assets/imgs/btns/info.png') },
  { name: 'users', file: require('../assets/imgs/btns/users.png') },
  { name: 'sound', file: require('../assets/imgs/btns/sound.png') },
  { name: 'muted', file: require('../assets/imgs/btns/muted.png') },
  { name: 'back', file: require('../assets/imgs/btns/back.png') },
  { name: 'stop', file: require('../assets/imgs/btns/stop.png') },
  { name: 'pause', file: require('../assets/imgs/btns/pause.png') },
  { name: 'play', file: require('../assets/imgs/btns/play.png') },
  { name: 'again', file: require('../assets/imgs/btns/again.png') },

  { name: 'Game', file: require('../assets/imgs/btns/Game.png') },
  { name: 'ScoreBoard', file: require('../assets/imgs/btns/ScoreBoard.png') },
  { name: 'About', file: require('../assets/imgs/btns/About.png') },

  {
    name: 'BtnUnderlay1',
    file: require('../assets/imgs/btns/btn_underlay1.png'),
  },
  {
    name: 'BtnUnderlay2',
    file: require('../assets/imgs/btns/btn_underlay2.png'),
  },
  {
    name: 'BtnUnderlay3',
    file: require('../assets/imgs/btns/btn_underlay3.png'),
  },
  {
    name: 'BtnUnderlay4',
    file: require('../assets/imgs/btns/btn_underlay4.png'),
  },
  {
    name: 'BtnUnderlay5',
    file: require('../assets/imgs/btns/btn_underlay5.png'),
  },
  {
    name: 'BtnUnderlay6',
    file: require('../assets/imgs/btns/btn_underlay6.png'),
  },
  {
    name: 'BtnUnderlay7',
    file: require('../assets/imgs/btns/btn_underlay7.png'),
  },
];

const loadImg = async ({ name, file }) => {
  // webImg or local uri
  const webImg = typeof file === 'string';
  const img = webImg
    ? await Image.prefetch(file)
    : await Asset.fromModule(file).downloadAsync();

  return {
    name,
    file: img,
  };
};

export default async () => {
  console.log('IMG RENDER');

  const imgArr = await Promise.all(imgs.map(loadImg));

  return arrToMap(imgArr);
};
