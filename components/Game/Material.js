import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import { propsChanged } from '../../constants/helperFuncs';
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

    /* const typed = text.substring(0, charIndex);
  const notTyped = text.substring(charIndex); */

    const clickHandler = () => {
      alert('Sorry, game ended');
      endGame();
    };

    return (
      <Section>
        {gamePaused ? null : gameStandby || gameON ? (
          <Teleprompter />
        ) : title && text ? (
          <Preview />
        ) : (
          <TextList />
        )}
        <UserInput />
      </Section>
    );
  }
}

const Memo = memo(p => <Material {...p} />);

export default withState(Memo);
