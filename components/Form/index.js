import React, { Component, memo } from 'react';
import { withState } from '../GameState';
import { View, Section } from '../Elements';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { propsChanged } from '../../constants/helperFuncs';
import ScorePreview from '../ScoreBoard/ScorePreview';

const Types = {
  SignIn: <SignIn />,
  SignUp: <SignUp />,
  ScorePreview: <ScorePreview />,
};

class Form extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np => this.props.type !== np.type;

  render() {
    const { type } = this.props;

    return type ? Types[type] : null;
  }
}

const Memo = memo(p => <Form {...p} />);

export default withState(Memo);
