import React from 'react';
import { AsyncStorage } from 'react-native';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { withState } from '../GameState';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        authUser: null,
      };

      this.listener = this.listener.bind(this);

      this.getAuthUser = this.getAuthUser.bind(this);
    }

    componentDidMount() {
      // start get auth-sequence
      this.props.gameSetters.setGameState({ loading: true }, this.getAuthUser);
    }

    componentWillUnmount() {
      this.listener();
    }

    listener() {
      //...
    }

    getAuthUser() {
      console.log('getting auth');

      const onSuccess = authUser => {
        console.log('Auth user found in db!');

        this.props.gameSetters.setGameState(
          { authUser, form: null, loading: false },
          () => {
            console.log('AuthUser set in game state');

            // get typer...***
          }
        );
      };

      onFail = () => {
        console.log('Auth user not found in db');

        this.props.gameSetters.setGameState({
          authUser: null,
          form: 'SignIn',
          loading: false,
        });

        // signin/signup...
      };

      this.listener = this.props.firebase.onAuthUserListener(onSuccess, onFail);
    }

    async save(key, val) {
      await AsyncStorage.setItem('typemaster_' + key, JSON.stringify(val));
      console.log('Auth user backed up in storage');
    }

    async load(key, cb) {
      res = JSON.parse(await AsyncStorage.getItem('typemaster_' + key));
      console.log('Auth user loaded from storage');

      if (res) {
        return cb(await res);
      }

      return cd(false);
    }

    async remove(key) {
      await AsyncStorage.removeItem('typemaster_' + key);
      console.log('Auth user removed from storage');
    }

    render() {
      return (
        <AuthUserContext.Provider
          value={{
            authUser: this.state.authUser,
            loadingAuth: this.state.loading,
          }}
        >
          <Component
            {...this.props}
            authUser={this.state.authUser || false}
            loadingAuth={this.state.loading}
          />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(withState(WithAuthentication));
};

export default withAuthentication;
