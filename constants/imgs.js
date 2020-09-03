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
};

const load = async (file, cb) => {
  let img = null;
  // web img
  if (typeof file === 'string') {
    img = Image.prefetch(file);
  }
  // local uri required
  else {
    img = Asset.fromModule(file);
    await img.downloadAsync();
  }

  cb(img);
};

export default ({ cb }) => {
  const res = {};

  Object.entries(imgs).forEach(([name, file]) => {
    load(file, img => {
      res[name] = img;
    });
  });

  return cb(res);
};
