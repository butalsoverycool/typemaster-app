import React from 'react';
import { View } from 'react-native';
import { withState } from '../GameState';
import styles from './styles';
import Time from './Time';
import Points from './Points';
import TypoCount from './TypoCount';
import Remaining from './Remaining';
import theme from '../../constants/theme';
import Card from '../Elements/Card';

const Status = props => {
  return (
    <View style={theme.section}>
      <Card
        containerStyle={styles.card}
        wrapperStyle={[styles.cardWrapper, { flexWrap: 'wrap' }]}
      >
        <Time />

        <Points />

        <TypoCount />

        <Remaining />
      </Card>
    </View>
  );
};

export default withState(Status);
