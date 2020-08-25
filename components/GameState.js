import React, { Component, createContext } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { clone, randOfArr, timeStamp } from '../constants/helperFuncs';
import { dynamicMsg } from '../constants/preset';
import { withFirebase } from './Firebase';
import * as ScreenOrientation from 'expo-screen-orientation';

const Ctx = createContext();

const newGameState = (ps, override = null) => ({
  gameStandby: false,
  gameON: false,
  gamePaused: false,
  gameFinished: false,

  time: null,

  points: 0,

  msg: [],

  typed: {
    index: 0,
    input: '',
    output: '',
    remaining: ps.material.text,
    typoCount: 0,
  },
  ...override,
});

const endGameState = {
  gameStandby: false,
  gameON: false,
  gamePaused: false,
};

const initialState = {
  loading: false,
  authUser: null,

  orientation: null,

  scoreboard: [],
  gameStandby: false,
  gameON: false,
  gamePaused: false,
  gameFinished: false,

  time: null,

  points: 0,

  msg: [],

  material: {},

  timeStamp: {},

  typed: {
    index: 0,
    input: '',
    output: '',
    remaining: '',
    typoCount: 0,
  },

  level: 0,

  latestScore: null,
  latestQualified: false,

  pushNav: false,

  highscore: 0,

  form: null,

  nav: null,
};

class GameState extends Component {
  constructor(props) {
    super(props);

    this.state = clone(initialState);

    this.setGameState = this.setGameState.bind(this);

    this.resetGame = this.resetGame.bind(this);
    this.prepareGame = this.prepareGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.togglePauseGame = this.togglePauseGame.bind(this);

    this.addTick = this.addTick.bind(this);
    this.setMaterial = this.setMaterial.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.setPushNav = this.setPushNav.bind(this);

    this.loadAsyncStorage = this.loadAsyncStorage.bind(this);
    this.saveAsyncStorage = this.saveAsyncStorage.bind(this);
    this.createLatestScore = this.createLatestScore.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.clearScore = this.clearScore.bind(this);
    this.tryCallback = this.tryCallback.bind(this);

    this.updateTyper = this.updateTyper.bind(this);
    this.loadScoreBoard = this.loadScoreBoard.bind(this);

    this.lockOrientation = this.lockOrientation.bind(this);
    this.switchUser = this.switchUser.bind(this);

    this.getAuth = this.getAuth.bind(this);

    this.setters = {
      setGameState: this.setGameState,

      resetGame: this.resetGame,
      prepareGame: this.prepareGame,
      startGame: this.startGame,
      endGame: this.endGame,
      togglePauseGame: this.togglePauseGame,

      addTick: this.addTick,
      setMaterial: this.setMaterial,

      inputHandler: this.inputHandler,
      setPushNav: this.setPushNav,

      createLatestScore: this.createLatestScore,
      saveScore: this.saveScore,
      clearScore: this.clearScore,

      updateTyper: this.updateTyper,
      loadScoreBoard: this.loadScoreBoard,

      switchUser: this.switchUser,
    };
  }

  componentDidMount() {
    /// listen
    // scoreboard-changes
    this.props.firebase.scoreBoardListener(this.loadScoreBoard);

    /// get
    // scoreboard
    this.loadScoreBoard();

    this.setState({ loading: true }, this.getAuth);

    /// set
    // orientation
    this.lockOrientation('portrait');
  }

  componentWillUnmount() {}

  getAuth() {
    console.log('getting auth');

    const onSuccess = authUser => {
      console.log('Auth user found in db!');

      this.setState(
        {
          authUser,
          form: null,
          loading: false,
        },
        () => {
          console.log('AuthUser set in game state');

          // get typer...***
        }
      );
    };

    const onFail = () => {
      console.log('Auth user not found in db...');

      // signin/signup...
      this.setState({
        form: 'SignIn',
        loading: false,
      });
    };

    this.listener = this.props.firebase.onAuthUserListener(onSuccess, onFail);
  }

  switchUser() {
    this.props.firebase.signOut(() => {
      console.log('Signed out');
    });
  }

  async lockOrientation(input = 'portrait') {
    const {
      lockAsync,
      OrientationLock,
      getOrientationAsync,
    } = ScreenOrientation;

    const orientation = OrientationLock[input.toUpperCase()];

    if (!orientation) {
      return console.log(
        'Desired orientation lock',
        orientation,
        'could not be applied.'
      );
    }

    // lock
    await lockAsync(OrientationLock.PORTRAIT_UP);

    // get new orientation to confirm
    const code = await getOrientationAsync();
    const newOrientation =
      code >= 3 ? 'LANDSCAPE' : code >= 1 ? 'PORTRAIT' : 'UNKNOWN';

    this.setState({ orientation: newOrientation }, () =>
      console.log('Orientation locked to', this.state.orientation)
    );
  }

  setGameState = (keyVal, cb) => {
    this.setState({ ...keyVal }, () => {
      this.tryCallback(cb);
    });
  };

  loadScoreBoard(changes) {
    this.props.firebase
      .typers()
      .once('value')
      .then(snap => {
        const typers = snap.val();

        this.setState({
          scoreboard: Object.values(typers).map(
            ({ email, lastLogin, ...props }) => props
          ),
        });
      });
  }

  updateTyper(uid, payload, cb) {
    this.props.firebase.update('typers', uid, payload, err => {
      if (err) console.log('Err when updating typer:', err);

      this.setState(ps => ({ authUser: { ...ps.authUser, ...payload } }), cb);
    });
  }

  async loadAsyncStorage({ key, cb, onSuccess, onFail }) {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('typemaster_' + key));

      if (!value) {
        console.log('Fail:', key, 'could not be loaded');

        const param = onFail ? onFail : cb;
        this.tryCallback(param);
        return;
      }

      this.setState({ [key]: value }, () => {
        const param = onSuccess || cb;
        this.tryCallback(param);
      });
    } catch (error) {
      Alert('Oh no', 'Failed to load ' + key, {
        text: 'Ok',
        style: 'cancel',
      });
    }
  }

  async saveAsyncStorage(key, val, cb) {
    try {
      const saved = await AsyncStorage.setItem(
        'typemaster_' + key,
        JSON.stringify(val)
      );

      if (saved !== null) console.log(key, 'was saved!');

      this.tryCallback(cb);
    } catch (error) {
      Alert('Oh no', 'Failed to save ' + key, {
        text: 'Ok',
        style: 'cancel',
      });
    }
  }

  createLatestScore(cb) {
    console.log('creating latest...');
    // curr score
    const {
      level,
      time,
      points,
      material: { title },
      typed: { typoCount },
      authUser,
    } = this.state;

    const latestScore = {
      typer: this.state.authUser.name || 'Unknown',
      level,
      time: time / 10,
      score: {
        points,
        timeStamp: timeStamp(),
      },
      text: title,
      typos: typoCount,
    };

    this.setState({ latestScore }, () => {
      // new highscore?
      if (true /* points > authUser.highscore.points */) this.saveScore();

      this.tryCallback(cb);
    });
  }

  saveScore(cb) {
    const { latestScore, authUser } = this.state;

    console.log('saving', latestScore);

    if (!latestScore) return this.createLatestScore(this.saveScore);

    // new highscore!
    this.props.firebase.update(
      'typers',
      this.state.authUser.uid,
      {
        highscore: latestScore.score,
      },
      () => {
        console.log('highscore saved to db!');

        this.loadScoreBoard();

        this.setState(
          ps => ({
            ...ps,
            ...endGameState,
            gameFinished: false,
          }),
          () => {
            this.tryCallback(cb);
          }
        );
      }
    );

    const unsorted = clone(this.state.scoreboard);

    // append new score
    unsorted.push(latestScore);

    // sort scores
    const sorted = unsorted.sort((a, b) =>
      a.points > b.points
        ? -1
        : a.time < b.time
        ? -1
        : a.level > b.level
        ? -1
        : 1
    );

    // limit to top 5
    const newBoard = sorted.length <= 5 ? sorted : sorted.slice(0, 5);

    // save
    // this.saveAsyncStorage('scoreboard', newBoard);
    this.setState(
      ps => ({
        ...ps,
        ...endGameState,
        gameFinished: false,
        scoreboard: newBoard,
      }),
      () => {
        this.tryCallback(cb);
      }
    );
  }

  async clearScore() {
    try {
      await AsyncStorage.removeItem('scoreboard', () => {
        this.loadAsyncStorage({ key: 'scoreboard' });
      });
    } catch (error) {
      Alert('Oh no', 'Failed to clear score', { text: 'Ok', style: 'cancel' });
    }
  }

  tryCallback(cb, args = null) {
    if (typeof cb === 'function') cb(args);
  }

  setMaterial = (material = {}) => {
    material = this.setState({
      material,
      typed: { ...clone(initialState.typed), remaining: material.text },
    });
  };

  inputHandler({ pointsToAdd = 0, typedProps = {} }) {
    let { index, input, output, remaining, ...typedRest } = typedProps;

    if (this.state.points + pointsToAdd < -10) {
      const res = randOfArr(dynamicMsg.gameOverText);

      return Alert.alert('Game Over', 'Points dropped below -10', [
        {
          text: 'I can do better ' + res.emoji,
          style: 'cancel',
        },
      ]);
    }

    if (typedProps.index) {
      if (!input) return console.log('Missing input to update typed-state');

      output = output || this.state.material.text.substring(0, index);
      remaining = remaining || this.state.material.text.substring(index);
    }

    const typed = typedProps.index
      ? { ...typedRest, index, output, remaining }
      : this.state.typed;

    this.setState(ps => ({
      points: Math.round((ps.points + pointsToAdd) * 100) / 100,
      typed,
    }));
  }

  addTick() {
    this.setState(ps => ({ time: ps.time + 1 }));
  }

  setPushNav(pushNav = false) {
    this.setState({ pushNav });
  }

  resetGame({ override = null, cb }) {
    console.log('resetGame()');
    this.setState({ ...clone(initialState), ...override }, () => {
      this.tryCallback(cb);
    });
  }

  prepareGame() {
    console.log('prepareGame()');
    if (this.state.gameON || this.state.gameStandby) return;

    this.setState(ps => ({
      ...newGameState(this.state),
      msg: ['When you are ready, just start typing...'],
      pushNav: 'Game',
      gamePaused: false,
      gameStandby: true,
    }));
  }

  startGame() {
    console.log('startGame()');
    if (this.state.gameON || !this.state.gameStandby) return;

    this.setState({ gameON: true, msg: 'Game is ON!' });
  }

  endGame({ override, ...props }) {
    console.log('endGame()');
    if (!this.state.gameON && !this.state.gameStandby && !this.state.gamePaused)
      return;

    this.setState(ps => ({
      ...ps,
      ...endGameState,
      gameFinished: override.gameFinished,
      pushNav: override.gameFinished ? 'ScoreBoard' : false,
      msg: override.gameFinished ? 'Game finished' : 'Game ended',
      ...override,
    }));
  }

  togglePauseGame() {
    console.log('togglePauseGame()');
    if (!this.state.gameON && !this.state.gameStandby) return;

    const msg = this.state.gamePaused
      ? 'To continue, just start typing...'
      : 'Game paused';

    this.setState(ps => ({
      msg,
      gameStandby: !ps.gameStandby,
      gamePaused: !ps.gamePaused,
      gameON: ps.gamePaused ? false : true,
    }));
  }

  render() {
    return (
      <Ctx.Provider
        value={{
          gameState: this.state,
          gameSetters: this.setters,
          authUser: this.state.authUser,
          loading: this.state.loading,
        }}
      >
        {this.props.children}
      </Ctx.Provider>
    );
  }
}

export default withFirebase(GameState);

export const withState = Component => props => (
  <Ctx.Consumer>
    {({ gameState, gameSetters, authUser, loading }) => (
      <Component
        {...props}
        gameState={gameState}
        gameSetters={gameSetters}
        authUser={authUser}
        loading={loading}
      />
    )}
  </Ctx.Consumer>
);
