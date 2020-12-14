import React, { Component, memo } from 'react';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { withState } from '../../GameState';
import StatusData from './StatusData';
import {
  propsChanged,
  getTime,
  pointCalc,
} from '../../../constants/helperFuncs';
import { Section } from '../../Elements';

class Points extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successAnim: false,
    };
  }
  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'points',
      'gameStandby',
      'gameON',
      'latestScore',
      'time',
      'sounding',
    ]);

  componentDidUpdate(pp) {
    const { sounding: prevSounding = [] } = pp.gameState;
    const { sounding = [] } = this.props.gameState;

    if (prevSounding.length !== sounding.length) {
      const wasPlaying = prevSounding.some(sound => sound.name === 'nice');
      const nicePlaying = sounding.some(sound => sound.name === 'nice');

      if (!wasPlaying && nicePlaying) {
        this.setState({ successAnim: true });
      } else if (wasPlaying && !nicePlaying) {
        this.setState({ successAnim: false });
      }
    }
  }

  render() {
    const { points, time, typed } = this.props.gameState;

    const { CCPS } = getTime(time, typed.output);

    const status = points < 0 ? 'red' : '#444';

    let POINTS = pointCalc(points, CCPS);

    POINTS = POINTS === Infinity || POINTS === 0 || !POINTS ? '0' : POINTS;

    return (
      <Section w={Dimensions.get('window').width / 3 - 5}>
        {this.state.successAnim && (
          <Image
            source={require('../../../assets/gifs/confetti.gif')}
            style={{
              width: 100,
              height: 100,
              position: 'absolute',
              zIndex: 2,
            }}
            resizeMode="contain"
          />
        )}
        <StatusData
          label="Points"
          data={POINTS}
          statusColor={status}
          bgImg="BtnUnderlay6"
        />
      </Section>
    );
  }
}

const Memo = memo(p => <Points {...p} />);

export default withState(Memo);
