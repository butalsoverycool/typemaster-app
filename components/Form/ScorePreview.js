import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withState } from '../GameState';
import { View, Modal, Section, Input, Btn, Form } from '../Elements';
import { Text } from 'react-native';
import theme from '../../constants/theme';
import ScorePreview from '../ScoreBoard/ScorePreview';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  mounted: false,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class ScorePreview extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  render() {
    return (
      <Section bg="orange">
        <Text style={theme.subtitle}>SIGN IN TO SAVE SCORE</Text>

        <Section>
          <Text>Email</Text>
          <Input
            value={this.state.email}
            on={{ onChangeText: email => this.setState({ email }) }}
          />
        </Section>

        <Section>
          <Text>Password</Text>
          <Input
            secureTextEntry={true}
            /* value={this.state.password} */
            on={{ onChangeText: password => this.setState({ password }) }}
          />
        </Section>

        <Section>
          <Btn content="Sign in!" onPress={this.signIn} />
        </Section>

        <Text style={theme.subtitle}>OR</Text>

        <Section>
          <Btn
            outline
            content="Sign up"
            onPress={() => setGameState({ form: 'SignUp' })}
          />
        </Section>

        {error && (
          <Text style={{ fontSize: 12, color: 'red', fontStyle: 'italic' }}>
            {error.message}
          </Text>
        )}
      </Section>
    );
  }
}

export default withFirebase(withState(ScorePreview));
