import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

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

    this.scoreBoardListener = this.scoreBoardListener.bind(this);
    this.getAuth = this.getAuth.bind(this);
  }

  scoreBoardListener(cb) {
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

  createUser = (email, password, displayName) => {
    try {
      this.auth.createUserWithEmailAndPassword(email, password).then(res => {
        if (displayName) {
          this.updateUserProfile({ displayName });
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  signInFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  signInTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  SignOut = props => {
    this.auth.signOut().then(() => {
      //console.log(window.location, window.location.href, window.location.hostname);
      window.location.href = window.location.origin;

      //props.history.push(ROUTES.LANDING);
    });
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

  getAuth(authUser, cb) {
    this.typer(authUser.uid)
      .once('value')
      .then(snapshot => {
        const existingTyper = snapshot.val() || null;

        const newTyper = {
          uid: authUser.uid,
          name: authUser.providerData[0].displayName,
          email: authUser.email,
          highscore: 0,
        };

        // if no typer in db, create new
        if (!existingTyper) {
          console.log('Saving new typer to db');
          this.write('typers', authUser.uid, newTyper);
        }

        const typer = existingTyper || newTyper;

        // merge auth and db user
        authUser = {
          ...typer,
          roles: typer.roles,
          emailVerified: authUser.emailVerified,
          providerData: authUser.providerData,
        };

        cb(authUser);
      });
  }

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (onSuccess, onFail) =>
    this.auth.onAuthStateChanged(auth => {
      if (!auth) return onFail();

      this.getAuth(auth, onSuccess);
    });

  // *** User API ***

  typer = uid => this.db.ref(`typers/${uid}`);

  typers = () => this.db.ref('typers');
}

export default Firebase;
