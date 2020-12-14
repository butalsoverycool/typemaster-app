import React, { Component, memo } from 'react';
import { withState } from '../../GameState';
import { Dimensions } from 'react-native';
import { font } from '../../../constants/theme';
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

      const newData = scoreStatus.map(item => Math.round(item.speed));

      labels = newLabels;
      dataset = newData;

      /* if (labels.length > 50) {
        labels = labels.slice(-50);
        dataset = dataset.slice(-50);
      } */
    }

    return (
      <Section spaceTop={10} style={{ fontFamily: font.regular }}>
        <Text>Correct character / second</Text>
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
          /* yAxisInterval={1} */
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
              color: '#444',
              fontSize: 10,
            },
          }}
          bezier={true}
          style={{
            marginVertical: 8,
          }}
        />
      </Section>
    );
  }
}

export default withState(Chart);
