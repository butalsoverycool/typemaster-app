import React, { Component, memo } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { Section, Input } from '../Elements';

class Typer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.authUser.name || '',
    };
  }

  //shouldComponentUpdate = np => this.props.gameState.name !== np.gameState.name;

  render() {
    const { authUser } = this.props;

    const { updateTyper } = this.props.gameSetters;

    return (
      <Section>
        <Text style={[theme.subtitle, { textAlign: 'center' }]}>Typer</Text>
        <Input
          value={authUser.name}
          placeholder="unknown"
          on={{
            onChangeText: name => this.setState({ name }),

            onBlur: () =>
              updateTyper(authUser.uid, { name: this.state.name }, err => {
                console.log(err ? err : 'Typer successfully updated!');
              }),
          }}
        />
      </Section>
    );
  }
}

const Memo = memo(p => <Typer {...p} />);

export default withState(Memo);
