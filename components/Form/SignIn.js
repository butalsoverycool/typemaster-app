import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withState } from '../GameState';
import { View, Modal, Section, Input, Btn, Form } from '../Elements';
import { Text } from 'react-native';
import theme from '../../constants/theme';

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

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  signIn = event => {
    const { email, password } = this.state;
    const { setGameState } = this.props.gameSetters;

    const firebaseSignIn = () => {
      this.props.firebase
        .signIn(email, password)
        .then(({ user: { uid, ...userProps }, ...props }) => {
          //if (!props) return console.log('User not found');

          if (!uid) {
            console.log('Login failed. User not found in firebase db');
          }
        })
        .catch(error => {
          this.setState({ error });
        });
    };

    setGameState(
      {
        loading: true,
      },
      () => firebaseSignIn()
    );

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const { setGameState } = this.props.gameSetters;

    const valid = password !== '' && email !== '';

    return (
      <Section>
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

export default withFirebase(withState(SignIn));

/* class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <SocialButtonWrap onSubmit={this.onSubmit}>
        <GoogleButton type="submit">
          {' '}
          <FcGoogle /> &nbsp; Logga in med Google
        </GoogleButton>

        {error && <p>{error.message}</p>}
      </SocialButtonWrap>
    );
  }
} */

/* class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <SocialButtonWrap onSubmit={this.onSubmit}>
        <FacebookButton type="submit">
          {' '}
          <FaFacebookF /> &nbsp; Logga in med Facebook
        </FacebookButton>

        {error && <p>{error.message}</p>}
      </SocialButtonWrap>
    );
  }
} */

/* class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div
        style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SocialButtonWrap onSubmit={this.onSubmit}>
          <TwitterButton type="submit">
            <FaTwitter /> &nbsp; Logga in med Twitter
          </TwitterButton>

          {error && <p>{error.message}</p>}
        </SocialButtonWrap>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <PasswordForgetLink />
          <SignUpLink />
        </div>
      </div>
    );
  }
} */

/* const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);

const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase); */

/* const SignInTwitter = compose(withRouter, withFirebase)(SignInTwitterBase); */
