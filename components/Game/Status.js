import React from 'react';
import { View } from 'react-native';
import { withState } from '../GameState';
import styles from './styles';
import Time from './Time';
import Points from './Points';
import TypoCount from './TypoCount';
import Remaining from './Remaining';
import theme from '../../constants/theme';
import { Section, Card } from '../Elements';

const Status = props => {
  return (
    <Section>
      <Card
        containerStyle={styles.card}
        wrapperStyle={[styles.cardWrapper, { flexWrap: 'wrap' }]}
      >
        <Time />

        <Points />

        <TypoCount />

        <Remaining />
      </Card>
    </Section>
  );
};

export default withState(Status);
