import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Section, Input } from '../Elements';
import { Text } from 'react-native';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
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
  }

  onSubmit = event => {
    event.preventDefault();

    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = ['ADMIN'];

    if (isAdmin) {
      roles.push(roles);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });

        return this.setState({ ...INITIAL_STATE });
      })
      //      .then(() => {
      //        return this.props.firebase.doSendEmailVerification();
      //      })
      .then(() => {
        console.log('then 2');

        const destination = this.props.location.state.destination || '/newteam';

        console.log('dest', destination);

        const locationState = {
          buildStage: this.props.location.state.buildStage || null,
          newUser: true,
        };

        return this.props.history.push(destination, locationState);
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;
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
    const isPWInvalid =
      passwordTwo.length < 6 ||
      passwordOne !== passwordTwo ||
      passwordTwo.length < 6;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Section onSubmit={this.onSubmit}>
        <Heading>Skapa konto</Heading>
        <InputWrap>
          <Placeholder>Namn</Placeholder>
          <Input name="username" value={username} type="text" />
        </InputWrap>
        <InputWrap>
          <Placeholder>E-postadress</Placeholder>
          <Input
            name="email"
            value={email}
            on={{ onChangeText: this.onChange }}
            type="text"
          />
        </InputWrap>
        <InputWrap>
          <Placeholder>Lösenord</Placeholder>
          <Input
            name="passwordOne"
            value={passwordOne}
            on={{ onChangeText: this.onChange }}
            type="password"
          />
        </InputWrap>
        <InputWrap>
          <Placeholder>Lösenord igen</Placeholder>
          <Input
            name="passwordTwo"
            value={passwordTwo}
            on={{ onChangeText: this.onChange }}
            type="password"
          />
        </InputWrap>
        {/*                 <Admin>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </Admin> */}
        <ButtonWrap>
          <SubmitButton disabled={isInvalid} type="submit">
            Registrera
          </SubmitButton>
        </ButtonWrap>

        {/* {error && <p>{error.message}</p>} */}
      </Section>
    );
  }
}

const SignUpLink = () => (
  <p>
    Har du inget konto?{' '}
    <Link to={ROUTES.SIGN_UP} style={{ color: 'rgb(36, 132, 10)' }}>
      Registrera dig
    </Link>
  </p>
);

export default SignUpForm = withFirebase(SignUpFormBase);

export { SignUpLink };
