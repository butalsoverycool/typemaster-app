import React, { Component, memo } from 'react';
import { withState } from '../../GameState';
import { Dimensions } from 'react-native';
import { propsChanged } from '../../../constants/helperFuncs';
import Constants from 'expo-constants';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from 'react-native-chart-kit';

import { Section, Text } from '../../Elements';

const dimensions = Dimensions.get('window');

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(np) {
    return np.scoreStatus !== this.props.scoreStatus;
  }

  render() {
    const { scoreStatus } = this.props;

    let labels = [''];
    let dataset = [0];

    if (scoreStatus.length > 0) {
      const newLabels = scoreStatus.map(item => '');

      const newData = scoreStatus.map(item => item.speed);

      labels = newLabels;
      dataset = newData;

      /* if (labels.length > 50) {
        labels = labels.slice(-50);
        dataset = dataset.slice(-50);
      } */
    }

    return (
      <Section style={{ fontFamily: 'CutiveMono_400Regular' }}>
        <Text
          style={{
            position: 'relative',
            top: 3,
          }}
        >
          Correct input speed
        </Text>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: dataset,
                strokeWidth: 1,
              },
            ],
          }}
          withDots={false}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withHorizontalLabels={true}
          withVerticalLabels={true}
          fromZero={true}
          width={dimensions.width} // from react-native
          height={150}
          chartConfig={{
            backgroundColor: '#eee',
            backgroundGradientFrom: '#eee',
            backgroundGradientTo: '#eee',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `#444`,
            style: {
              borderRadius: 0,
            },
            propsForLabels: {
              fontStyle: 'italic',
              //fontFamily: 'Inter_900Black',
              fontWeight: '100',
              color: '#444',
              fontSize: 10,
            },
          }}
          bezier={true}
          style={{
            marginVertical: 8,
          }}
          yAxisInterval="2"
        />
      </Section>
    );
  }
}

export default withState(Chart);
