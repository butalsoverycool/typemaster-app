import React, { memo } from 'react';
import { withState } from '../GameState';
import Time from './Time';
import Points from './Points';
import TypoCount from './TypoCount';
import Remaining from './Remaining';
import { Section } from '../Elements';

const Status = () => {
  return (
    <Section row wrap="wrap">
      <Time />

      <Points />

      <TypoCount />

      <Remaining />
    </Section>
  );
};

const Memo = memo(p => <Status {...p} />);

export default withState(Memo);
