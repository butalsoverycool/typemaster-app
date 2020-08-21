import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import FormInput from '../FormInput/FormInput';
import styled from 'styled-components';
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

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

const InputWrap = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Form class="form" onSubmit={this.onSubmit}>
        <InputWrap>
          <Placeholder>Lösenord</Placeholder>
          <Input
            name="passwordOne"
            value={passwordOne}
            on={{ onChangeText: this.onChange }}
            type="password"
            label="Nytt lösenord"
          />
        </InputWrap>
        <InputWrap>
          <Placeholder>Lösenord igen</Placeholder>
          <Input
            name="passwordTwo"
            value={passwordTwo}
            on={{ onChangeText: this.onChange }}
            type="password"
            label="bekräfra nytt lösenord"
          />
        </InputWrap>
        <ButtonWrap>
          <SubmitButton disabled={isInvalid} type="submit">
            Ändra lösenord
          </SubmitButton>
        </ButtonWrap>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
