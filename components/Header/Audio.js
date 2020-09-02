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
      brand="custom"
      name={muted ? 'muted' : 'sound'}
      label="Sound"
      size={40}
      onPress={() => setGameState({ muted: !muted })}
    />
  );
};

export default withState(Audio);
