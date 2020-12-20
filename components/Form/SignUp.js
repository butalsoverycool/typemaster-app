import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withState } from '../GameState';
import { View, Modal, Section, Text, Input, Btn } from '../Elements';
import theme from '../../constants/theme';
import { timeStamp } from '../../utils/helperFuncs';

const INITIAL_STATE = {
  username: '',
  email: '',
  pwd1: '',
  pwd2: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();

    const { email, pwd1, isAdmin } = this.state;

    const roles = ['typer'];
    if (isAdmin) roles.push('admin');

    this.props.firebase
      .createUser(email, pwd1)
      .then(authUser => {
        // temp name
        const tempName = email.substring(0, email.indexOf('@'));

        // Create a user in your Firebase realtime database
        this.props.firebase.setTyper(
          authUser.user.uid,
          {
            email,
            highscore: {
              points: 0,
              timeStamp: timeStamp(),
            },
            lastLogin: timeStamp(),
            name: tempName,
            uid: authUser.uid,
          },
          err => {
            if (err) console.log('Err when setting typer', err);
          }
        );

        return this.setState(ps => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onChangeCheckbox = event => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  };

  render() {
    const { username, email, pwd1, pwd2, isAdmin, error } = this.state;

    const { setGameState } = this.props.gameSetters;

    const pwValidation = (pw1, pw2) => {
      if ((pw1.length === 0 && pw2.length === 0) || pw2.length === 0) {
        return '';
      }
      if (pw2.length < 6) {
        return 'ditt lösenord är kortare än 6 bokstäver';
      }
      if (pw1.length >= 6 && pw2.length >= 6 && pw1 !== pw2) {
        return 'dina lösenord är inte identiska';
      }
    };

    return (
      <Section>
        <Text style={theme.subtitle}>SIGN UP</Text>

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
            on={{
              onChangeText: pwd1 => this.setState({ pwd1 }),
            }}
          />
        </Section>

        <Section>
          <Text>Confirm Password</Text>
          <Input
            secureTextEntry={true}
            /* value={this.state.password} */
            on={{
              onChangeText: pwd2 => this.setState({ pwd2 }),
            }}
          />
        </Section>

        <Section>
          <Btn content="Sign Up!" onPress={this.onSubmit} />
        </Section>

        <Text style={theme.subtitle}>OR</Text>

        <Section>
          <Btn
            outline
            content="Sign in?"
            onPress={() => setGameState({ form: 'SignIn' })}
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

export default withFirebase(withState(SignUpFormBase));
