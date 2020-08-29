import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Text } from '../Elements';
import { loadSounds, playSound } from '../../constants/helperFuncs';
import { soundList } from '../../constants/preset';

console.log('list', soundList);

export default props => {
  const [sounds, setSounds] = useState(null);

  const onLoad = ({ err, sounds }) => {
    if (err) return;

    setSounds(sounds);
  };

  useEffect(() => {
    loadSounds({ src: soundList, cb: onLoad });
  }, []);

  return (
    <View>
      <Text>AUDIO</Text>
      {soundList.map((item, nth) => (
        <Button
          key={nth}
          title={item.name}
          onPress={() => playSound({ src: item })}
        ></Button>
      ))}
      <Text>{sounds ? 'ready to play' : 'loading'}</Text>
    </View>
  );
};

//https://freesound.org/people/AmeAngelofSin/sounds/369469/

/* 
in gamestate:
1. init all sounds and save them to state (memo-risky)
2. create func in gameSetters to play soudn by its name from anywhere
*/
