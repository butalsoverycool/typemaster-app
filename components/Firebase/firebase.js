import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { AsyncStorage } from 'react-native';
import { timeStamp } from '../../constants/helperFuncs';

import getENV from '../../env';

const { firebaseConfig } = getENV();

var initialized = false;

class Firebase {
  constructor() {
    this.state = {
      typers: null,
    };

    if (!firebase.apps.length && !initialized) {
      //console.log('firebase apps', firebase.apps);
      firebase.initializeApp(firebaseConfig);
      initialized = true;
    }

    /* Helper */

    this.serverValue = firebase.database.ServerValue;
    //this.emailAuthProvider = firebase.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = firebase.auth();
    this.db = firebase.database();

    /* Social Sign In Method Provider */

    //this.googleProvider = new firebase.auth.GoogleAuthProvider();
    //this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    //this.twitterProvider = new firebase.auth.TwitterAuthProvider();

    this.typerListener = this.typerListener.bind(this);
    this.getAuthUser = this.getAuthUser.bind(this);

    this.loadAsync = this.loadAsync.bind(this);
    this.saveAsync = this.saveAsync.bind(this);

    this.pushUserToStorage = this.pushUserToStorage.bind(this);
    this.tryCallback = this.tryCallback.bind(this);
    this.createNewTyper = this.createNewTyper.bind(this);
  }

  typerListener(cb) {
    const ref = this.db.ref('typers');

    ref.on('child_changed', snap => {
      const changedTyper = snap.val();

      cb(changedTyper);
      //  this.setState({ typers });
    });
  }

  // *** Auth API ***

  updateUserProfile = payload => {
    if (!this.auth) return;

    this.auth.currentUser
      .updateProfile(payload)
      .then(function () {
        console.log('User profile successfully updated!');
      })
      .catch(function (error) {
        console.log('Failed to update User profile.');
      });
  };

  createUser = (email, password) => {
    try {
      this.auth.createUserWithEmailAndPassword(email, password).then(res => {
        /* 
        // skipping display name in form for now
        if (displayName) {
          this.updateUserProfile({ displayName });
        } */
      });
    } catch (err) {
      console.log(err);
    }
  };

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  signInFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  signInTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  signOut = cb => {
    this.auth.signOut().then(cb);

    /* .then(() => {
      this.tryCallback(cb);

      //console.log(window.location, window.location.href, window.location.hostname);
      // window.location.href = window.location.origin;

      //props.history.push(ROUTES.LANDING);
    }); */
  };

  restPwd = email => this.auth.sendPasswordResetEmail(email);

  updatePwd = password => this.auth.currentUser.updatePassword(password);

  sendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  //WRITE DATA
  write(collection, uid, data) {
    this.db.ref(collection + '/' + uid).set(data);
  }

  // UPDATE
  update(collection, uid, data, cb) {
    this.db.ref(collection + '/' + uid).update(data, err => {
      cb(err);
    });
  }

  createNewTyper = authUser => ({
    uid: authUser.uid,
    name: authUser.providerData[0].displayName,
    email: authUser.email,
    highscore: 0,
    lastLogin: timeStamp(),
  });

  getAuthUser(authUser, cb) {
    this.typer(authUser.uid)
      .once('value')
      .then(snapshot => {
        // define typer as new or existing
        const typer = snapshot.val() || this.createNewTyper(this.authUser);

        const typerExists = typer.lastLogin ? true : false;

        // update/set last login
        typer.lastLogin = timeStamp();

        // if no typer in db, create new
        if (!typerExists) {
          this.write('typers', authUser.uid, typer, () => {
            console.log('Saved new typer to db');
          });
        }
        // else update existing typer with lastLogin-prop
        else {
          this.update(
            'typers',
            authUser.uid,
            { lastLogin: typer.lastLogin },
            () => {
              console.log('Updated lastLogin in db.');
            }
          );
        }

        // other user data
        const {
          phoneNumber: phone,
          photoURL: photo,
          providerId: authMethod,
        } = authUser.providerData[0];

        // merge auth and db user
        const formattedAuth = {
          ...typer,
          data: {
            photo,
            phone,
            authMethod,
            emailVerified: authUser.emailVerified,
            roles: authUser.roles,
          },
        };

        this.pushUserToStorage(formattedAuth, () => {
          cb(formattedAuth);
        });
      });
  }

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (onSuccess, onFail) =>
    this.auth.onAuthStateChanged(auth => {
      console.log(`AuthUser change: ${auth ? 'logged in' : 'logget out'}`);
      if (!auth) return onFail();

      onSuccess(auth);
    });

  async loadAsync(key, cb) {
    const res = JSON.parse(await AsyncStorage.getItem('typemaster_' + key));
    this.tryCallback(cb, res);
  }

  async saveAsync(key, val, cb) {
    await AsyncStorage.setItem('typemaster_' + key, JSON.stringify(val));
    console.log('Saved ', key, 'to async storage.');
    this.tryCallback(cb);
  }

  async pushUserToStorage({ uid, name, email, lastLogin }, cb) {
    const user = {
      uid,
      name,
      email,
      lastLogin,
    };

    const users = (await this.loadAsync('users')) || [];

    let exists = false;

    // if already saved, replace
    users.map(item => {
      if (item.uid === user.uid) {
        exists = true;
        return user;
      }
      return item;
    });

    // if not already saved, prepend
    if (!exists) {
      users.unshift(user);
    }

    await this.saveAsync('users', users);

    this.tryCallback(cb, users);
  }

  tryCallback(cb, args = null) {
    if (typeof cb === 'function') cb(args);
  }

  // *** User API ***

  typer = uid => this.db.ref(`typers/${uid}`);

  typers = () => this.db.ref('typers');

  typerDoc = uid => this.db.collection('typers').doc(uid);
}

export default Firebase;
