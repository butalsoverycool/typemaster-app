import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import FormInput from '../FormInput/FormInput';

const InputWrap = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;

const Input = styled.input`
  background-color: #e2dddd;
  outline: none;
  height: 3em;
  width: 90%;
  font-size: 1.2em;
  font-weight: 500;
  border-radius: 0 4px 4px 0;
  border: 1px solid lightgray;
  color: black;
  padding-left: 15px;
  font-family: 'Avenir';
`;

const Placeholder = styled.span`
  background: rgba(36, 132, 10, 0.6);
  color: white;
  border-radius: 4px 0 0 4px;
  height: 3em;
  width: 10em;
  font-size: 1.2em;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 55%;
  min-width: 320px;
  height: 200px;
  /*   padding: 100px; */
  display: flex;
  flex-direction: column;
  min-height: 150px;
  display: flex;
  justify-content: center;
`;
const SubmitButton = styled.button`
  padding: 12px;
  background-color: rgba(36, 132, 10, 0.6);
  border-radius: 4px;
  color: white;
  font-weight: 500;
  font-size: 1.2em;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: -20px;
  border: none;
  width: 30%;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Heading = styled.h1``;

const Wrapper = styled.div``;

const PasswordForgetPage = () => (
  <Wrapper>
    <PasswordForgetForm />
  </Wrapper>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Heading>Återställ lösenord</Heading>
        <InputWrap>
          <Placeholder>E-postadress</Placeholder>
          <Input
            name="email"
            value={this.state.email}
            on={{ onChangeText: this.onChange }}
            type="text"
          />
        </InputWrap>
        <ButtonWrap>
          <SubmitButton disabled={isInvalid} type="submit">
            Återställ lösenord
          </SubmitButton>
        </ButtonWrap>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET} style={{ color: 'rgb(36, 132, 10)' }}>
      Glömt lösenord?
    </Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
