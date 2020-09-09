import React, { memo } from 'react';

import { withState } from '../../GameState';
import { Section, Text } from '../../Elements';
import Time from './Time';
import Points from './Points';
import TypoCount from './TypoCount';
import Remaining from './Remaining';
import Speed from './Speed';
import Chart from './Chart';

const Status = ({ gameState: { gameFinished, scoreStatus } }) => {
  return (
    <Section align="center" fillW>
      <Section row wrap="wrap" spaceTop={10} justify="flex-start">
        <Time />

        <Points />

        <TypoCount />

        {/*  <Speed /> */}

        {/*  : <Remaining /> */}
      </Section>

      {gameFinished && <Chart scoreStatus={scoreStatus} />}
    </Section>
  );
};

const Memo = memo(p => <Status {...p} />);

export default withState(Memo);
