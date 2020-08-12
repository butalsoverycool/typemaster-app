import React, { Component } from 'react';
import { withState } from '../GameState';
import StatusData from './StatusData';
import { propsChanged } from '../../constants/helperFuncs';

class Remaining extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, ['typed']);

  render() {
    const { remaining } = this.props.gameState.typed;

    const status = remaining.length < 5 ? 'warning' : 'primary';

    return (
      <StatusData
        label="To go"
        index={3}
        data={remaining.length || '0'}
        status={status}
      />
    );
  }
}
export default withState(Remaining);
