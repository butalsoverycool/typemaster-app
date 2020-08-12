import React, { Component, useState } from 'react';
import { withState } from '../GameState';
import { propsChanged } from '../../constants/helperFuncs';
import UserInput from './UserInput';
import styles from './styles';
import Teleprompter from './Teleprompter';
import Preview from './Preview';
import TextList from './TextList';
import { View, Section, Card } from '../Elements';

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
        <Card
          containerStyle={styles.card}
          wrapperStyle={[
            styles.cardWrapper,
            {
              alignItems: 'flex-start',
            },
          ]}
        >
          <View>
            {gamePaused ? null : gameStandby || gameON ? (
              <Teleprompter />
            ) : title && text ? (
              <Preview />
            ) : (
              <TextList />
            )}
          </View>
        </Card>
        <UserInput />
      </Section>
    );
  }
}

export default withState(Material);
