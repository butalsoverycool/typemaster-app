import { Asset, useAssets } from 'expo-asset';
import { Image } from 'react-native';
import { arrToObjectLookup } from './helperFuncs';
import imgs from '../lib/imgs';

const loadImg = async ({ name, file: required }) => {
  // webImg or local asset
  const webImg = typeof file === 'string';

  const file = webImg
    ? await Image.prefetch(required)
    : Asset.fromModule(required); //Image.resolveAssetSource(file).uri;

  return {
    name,
    file,
  };
};

export default async () => {
  const imgPromises = imgs.map(loadImg);
  const imgArr = await Promise.all(imgPromises);
  const lookup = arrToObjectLookup(imgArr);

  return lookup;
};
