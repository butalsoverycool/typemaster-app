import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import { propsChanged } from '../../utils/helperFuncs';
import UserInput from './UserInput';
import styles from './styles';
import Teleprompter from './Teleprompter';
import Preview from './Preview';
import TextList from './TextList';
import { Section } from '../Elements';

class Material extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameON,',
      'gameStandby',
      'gamePaused',
      'material',
    ]);

  render() {
    const { gameState, gameSetters } = this.props;

    if (!gameState) return null;

    const {
      gameON,
      gameStandby,
      gamePaused,
      material: { title = '', text = '' },
    } = gameState;
    const { endGame } = gameSetters;

    return (
      <Section flex={1} spaceTop={10} fullW>
        {gamePaused ? null : gameStandby || gameON ? (
          <Teleprompter />
        ) : title && text ? (
          <Preview />
        ) : (
          <TextList />
        )}

        {(gameStandby || gameON) && !gamePaused && <UserInput />}
      </Section>
    );
  }
}

const Memo = memo(p => <Material {...p} />);

export default withState(Memo);
