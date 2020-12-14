import { Asset } from 'expo-asset';
import { Image } from 'react-native';

const imgs = {
  info: require('../assets/imgs/btns/info.png'),
  users: require('../assets/imgs/btns/users.png'),
  sound: require('../assets/imgs/btns/sound.png'),
  muted: require('../assets/imgs/btns/muted.png'),
  back: require('../assets/imgs/btns/back.png'),
  stop: require('../assets/imgs/btns/stop.png'),
  pause: require('../assets/imgs/btns/pause.png'),
  play: require('../assets/imgs/btns/play.png'),
  again: require('../assets/imgs/btns/again.png'),

  Game: require('../assets/imgs/btns/Game.png'),
  ScoreBoard: require('../assets/imgs/btns/ScoreBoard.png'),
  About: require('../assets/imgs/btns/About.png'),

  BtnUnderlay1: require('../assets/imgs/btns/btn_underlay1.png'),
  BtnUnderlay2: require('../assets/imgs/btns/btn_underlay2.png'),
  BtnUnderlay3: require('../assets/imgs/btns/btn_underlay3.png'),
  BtnUnderlay4: require('../assets/imgs/btns/btn_underlay4.png'),
  BtnUnderlay5: require('../assets/imgs/btns/btn_underlay5.png'),
  BtnUnderlay6: require('../assets/imgs/btns/btn_underlay6.png'),
  BtnUnderlay7: require('../assets/imgs/btns/btn_underlay7.png'),
};

const load = async (file, cb) => {
  let img = null;
  // web img
  if (typeof file === 'string') {
    img = Image.prefetch(file);
  }
  // local uri required
  else {
    img = Asset.fromModule(file).downloadAsync();
  }

  return img;
};

export default async ({ cb }) => {
  const res = {};
  const imgArr = Object.entries(imgs);

  imgArr.forEach(async ([name, file], nth) => {
    res[name] = await load(file);

    console.log(`img ${nth + 1}/${imgArr.length} loaded`);

    if (nth + 1 === imgArr.length) {
      console.log('Imgs loaded successfully');

      cb(res);
    }
  });
};
