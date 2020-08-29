import React from 'react';
import { Icon } from '../Elements';
import { withState } from '../GameState';
import { IconPreset } from '../../constants/preset';

const Audio = ({
  gameState: { muted },
  gameSetters: { setGameState },
  ...props
}) => {
  return (
    <Icon
      brand={muted ? IconPreset.mute.brand : IconPreset.sound.brand}
      name={muted ? IconPreset.mute.name : IconPreset.sound.name}
      label="Sound"
      color={muted ? 'red' : '#444'}
      size={40}
      onPress={() => setGameState({ muted: !muted })}
    />
  );
};

export default withState(Audio);
