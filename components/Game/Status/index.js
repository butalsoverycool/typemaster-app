import React, { memo } from 'react';
import { withState } from '../../GameState';
import { Section } from '../../Elements';
import Time from './Time';
import Points from './Points';
import TypoCount from './TypoCount';
import Remaining from './Remaining';
import Speed from './Speed';

const Status = ({ gameState: { gameFinished } }) => {
  return (
    <Section row wrap="wrap" spaceTop={10} justify="flex-start">
      <Time />

      <Points />

      <TypoCount />

      <Speed />

      {/*  : <Remaining /> */}
    </Section>
  );
};

const Memo = memo(p => <Status {...p} />);

export default withState(Memo);
