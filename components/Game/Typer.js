import React, { Component, memo } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { withFirebase } from '../Firebase';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { Section, Input, Icon } from '../Elements';

class Typer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.switchUser = this.switchUser.bind(this);
  }

  shouldComponentUpdate(np, ns) {
    return this.state.name !== ns.name || this.props.authUser !== np.authUser;
  }

  componentDidMount() {
    this.setState({ name: this.props.authUser.name });
  }

  //shouldComponentUpdate = np => this.props.gameState.name !== np.gameState.name;

  switchUser() {
    const {
      firebase: { signOut },
      gameSetters,
    } = this.props;

    const { resetGame, setGameState } = gameSetters;

    resetGame({
      cb: () => {
        signOut();
      },
    });
  }

  render() {
    const { authUser } = this.props;

    const { updateTyper } = this.props.gameSetters;

    return (
      <Section row align="flex-start">
        <Section flex={2}>
          <Text style={[theme.subtitle, { textAlign: 'center' }]}>Typer</Text>
          <Input
            value={this.state.name}
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
        <Section flex={1}>
          <Icon
            name="user-switch"
            type="IconOutline"
            color="#444"
            label="switch user"
            onPress={this.switchUser}
          />
        </Section>
      </Section>
    );
  }
}

const Memo = memo(p => <Typer {...p} />);

export default withFirebase(withState(Memo));
