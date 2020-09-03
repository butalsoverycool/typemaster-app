import React, { Component, memo } from 'react';
import { Icon } from '../Elements';
import { withState } from '../GameState';
import { IconPreset } from '../../constants/preset';

class Audio extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(np) {
    return this.props.gameState.muted !== np.gameState.muted;
  }

  render() {
    const {
      gameState: { muted },
      gameSetters: { setGameState },
      ...props
    } = this.props;

    return (
      <Icon
        brand="custom"
        name={muted ? 'muted' : 'sound'}
        label="Sound"
        size={40}
        onPress={() => setGameState({ muted: !muted })}
      />
    );
  }
}

const Injected = withState(Audio);

export default memo(p => <Injected {...p} />);
