import React, { Component, createContext } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import {
  clone,
  randOfArr,
  mathRandInc,
  timeStamp,
  timeStampToString,
  compareTwo,
  getTime,
  propsChanged,
  formatAuth,
  pointCalc,
  playAudio,
} from '../utils/helperFuncs';
import { dynamicMsg, forbiddenAuthDiffs, bonus } from '../constants/preset';
import { withFirebase } from './Firebase';
import * as ScreenOrientation from 'expo-screen-orientation';

import Loading from './Elements/Loading';

import { Audio } from 'expo-av';

const Ctx = createContext();

const newGameState = (ps, override = null) => ({
  ...ps,
  gameStandby: false,
  gameON: false,
  gamePaused: false,
  gameFinished: false,

  time: 0,

  points: 0,

  scoreStatus: [],

  msg: [],

  typed: {
    index: 0,
    input: '',
    output: '',
    remaining: ps.material.text,
    typoCount: 0,
  },

  achievements: {
    chars: 0,
    charsInaRow: 0,
    countingWords: true,
    words: 0,
    wordsInaRow: 0,
  },

  newHighscore: false,
  ...override,
});

const endGameState = {
  gameStandby: false,
  gameON: false,
  gamePaused: false,
};

const initialState = {
  loading: true,
  authUser: null,
  authTyper: null,

  orientation: null,

  scoreboard: [],
  gameStandby: false,
  gameON: false,
  gamePaused: false,
  gameFinished: false,

  time: 0,

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

  achievements: {
    chars: 0,
    charsInaRow: 0,
    countingWords: true,
    words: 0,
    wordsInaRow: 0,
  },

  level: 0,

  scoreStatus: [],

  latestScore: null,
  latestQualified: false,

  pushNav: false,

  newHighscore: false,

  form: null,

  nav: null,

  muted: false,
  sounds: null,
  sounding: [],
  soloist: false,
  imgs: null,
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

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.setAuthTyper = this.setAuthTyper.bind(this);

    this.onTyperChange = this.onTyperChange.bind(this);
    this.handleAuthDiffs = this.handleAuthDiffs.bind(this);

    this.playSound = this.playSound.bind(this);
    this.soloSound = this.soloSound.bind(this);

    this.addScoreStatus = this.addScoreStatus.bind(this);

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

      playSound: this.playSound,
    };
  }

  componentDidUpdate(pp, ps) {
    const { sounds: prevSounds, imgs: prevImgs, appReady: prevReady } = pp;

    if (
      propsChanged(pp, this.props, ['appReady']) ||
      propsChanged(ps, this.state, ['authUser', 'authTyper, sounds, imgs'])
    ) {
      console.log('STATE IMGS', this.state.imgs, 'PROPS IMGS', this.props.imgs);
      const { appReady, sounds, imgs } = this.props;

      if (!pp.appReady && this.props.appReady) {
        console.log('Assets loaded.');
        this.setState({
          appReady,
          sounds,
          imgs,
        });
      }

      if (this.state.authUser) {
        if (
          this.props.appReady &&
          this.state.authUser.uid &&
          this.state.loading
        ) {
          console.log('Gamestate set.');
          this.setState({ loading: false });
        }
      }
    }
  }

  componentDidMount() {
    /// init

    // orientation
    this.lockOrientation('portrait');

    // sounds
    if (!this.state.sounds) {
      this.setState({
        sounds: this.props.sounds,
      });
    }

    if (!this.state.imgs) {
      this.setState({
        imgs: this.props.imgs,
      });
    }

    // auth-changes
    this.props.firebase.onAuthUserListener(this.onSignIn, this.onSignOut);

    // typer-changes
    this.props.firebase.typerListener(newTyper => this.onTyperChange(newTyper));
  }

  async soloSound() {
    const setSoloist = () =>
      new Promise(res => this.setState({ soloist: true }, res));

    await setSoloist();

    console.log('New soloist. Currently sounding:', this.state.sounding);

    const mute = async input => {
      if (Array.isArray(input.sound)) {
        return input.sound.forEach(s => mute({ name: input.name, sound: s }));
      }

      try {
        await input.sound.stopAsync();
        //console.log('STOPPED SOUND', playing[nth].name);
      } catch (err) {
        console.log('mute sound err:', input.name, err);
      }
    };

    this.state.sounding.forEach(mute);

    // for (let nth = 0; nth < playing.length; nth++) {}
  }

  async playSound(props, cb) {
    const playType = async sound => {
      // console.time('playType');
      try {
        await sound.setPositionAsync(0);
        await sound.playAsync();
      } catch (error) {
        console.log('play type err', error);
      }

      // console.timeEnd('inputToSoundStart');
      // console.timeEnd('playType');
    };

    if (this.state.muted) return;

    const name = typeof props === 'string' ? props : props.name;
    const file = this.state.sounds[name];
    const fileIndex = props.index || mathRandInc(0, file.length - 1);
    const isArr = Array.isArray(file);
    const sound = isArr ? file[fileIndex] : file;

    if (name === 'type' || name === 'gasp') return playType(sound);
    const onStart = () => {
      const alreadySounding = this.state.sounding.includes(name);
      // console.timeEnd('inputToSoundStart');

      !alreadySounding &&
        this.setState(ps => ({ sounding: [...ps.sounding, name] }));
    };

    const onStop = () => {
      //console.log('Sound', name, 'STOPPED');
    };

    const onFinish = () => {
      // console.log('Sound', name, 'FINISHED');

      props.solo && this.setState({ soloist: false });

      const removeIndex = this.state.sounding.indexOf(name);

      removeIndex > -1 &&
        this.setState(ps => {
          const sounding = [...ps.sounding];
          sounding.splice(removeIndex, 1);
          return { sounding };
        });
    };

    const onBuffer = () => {
      //console.log('Sound', name, 'IS BUFFERING...');
    };

    const onError = err => {
      console.log('Sound error:', err);
    };

    if (props.solo) {
      this.soloSound();
    }

    playAudio({
      ...props,
      name,
      sound,
      onStart,
      onStop,
      onFinish,
      onBuffer,
      onError,
    });
  }

  onTyperChange(newTyper) {
    console.log('onTyperChange()...');
    // correct auth diffs, update typer, load scoreboard
    this.handleAuthDiffs(
      this.state.authUser,
      newTyper,
      forbiddenAuthDiffs,
      () =>
        this.setAuthTyper(newTyper, () =>
          this.loadScoreBoard(() => {
            if (this.props.appReady) this.setState({ loading: false });
          })
        )
    );
  }

  // handle if typer-data is changed to not match auth
  handleAuthDiffs(user, typer, keys, cb) {
    //console.log('handleAuthDiffs()...');

    let resetPayload = {};
    let diff = false;

    // compare values, or obj 1 level down
    const compare = key => {
      let childDiff = false;

      if (typeof user[key] !== 'object') {
        childDiff = user[key] !== typer[key];
      }
      // obj
      else {
        childDiff = propsChanged(user[key], typer[key]);
      }

      if (childDiff) {
        diff = true;
        resetPayload[key] = this.state.authUser[key];
      }
    };

    keys.forEach(key => compare(key));

    if (diff) {
      console.log(
        `Spotted forbidden diff on user vs typer (${Object.keys(
          resetPayload
        )}). Resetting typer.`
      );

      return this.updateTyper(this.state.authUser.uid, resetPayload, () =>
        this.tryCallback(cb)
      );
    }

    this.tryCallback(cb);
  }

  setAuthTyper(typer, cb) {
    console.log('SetAuthTyper()...');

    if (!this.state.authUser) {
      return this.setState({ authTyper: null }, () => {
        this.tryCallback(cb);
      });
    }

    if (!typer) {
      return this.props.firebase.getTyper(this.state.authUser.uid, typer => {
        this.updateTyper(this.state.authUser.uid, {
          ...typer,
          lastLogin: this.state.authUser.lastLogin,
        });
      });
    }

    this.setState({ authTyper: typer }, () => this.tryCallback(cb));
  }

  updateTyper(uid, payload, cb) {
    console.log(`updateTyper()...(${Object.keys(payload)})`);

    this.props.firebase.updateTyper(uid, payload, err => {
      if (err) console.log('Err when updating typer:', err);

      this.setState(
        ps => ({ authTyper: { ...ps.authTyper, ...payload } }),
        () => {
          this.loadScoreBoard();
          this.tryCallback(cb);
        }
      );
    });
  }

  onSignIn(auth, cb) {
    const authUser = formatAuth(auth);
    //console.log('Auth last login:',authUser.lastLogin);

    this.setState(
      {
        authUser,
        form: null,
        loading: true,
      },
      () => {
        this.setAuthTyper(null, () => {
          this.loadScoreBoard(() => {
            if (this.props.appReady) this.setState({ loading: false });
          });
        });
      }
    );
  }

  onSignOut(cb) {
    // signin/signup...
    this.setState(
      {
        form: 'SignIn',
        authUser: null,
        loading: false,
      },
      () => this.tryCallback(cb)
    );
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
    if (typeof keyVal === 'function') {
      return this.setState(
        ps => {
          return keyVal(ps);
        },
        () => this.tryCallback(cb)
      );
    }

    //console.log('setGameState()', Object.entries(keyVal));
    this.setState({ ...keyVal }, () => {
      this.tryCallback(cb);
    });
  };

  loadScoreBoard(cb) {
    const tempTyper = this.state.authTyper || {};
    if (!tempTyper.highscore) {
      return this.tryCallback(cb);
    }

    console.log('LoadScoreBoard()...');
    this.props.firebase
      .typers()
      .once('value')
      .then(snap => {
        const typers = snap.val();

        let scoreboard = Object.values(typers).map(
          ({ email, lastLogin, ...props }) => props
        );

        // sort scores
        if (this.state.authUser && scoreboard.length > 0) {
          scoreboard.sort((a, b) => {
            if (!a.highscore || !b.highscore) return 0;

            const branchResult = {
              points:
                a.highscore.points > b.highscore.points
                  ? -1
                  : a.highscore.points < b.highscore.points
                  ? 1
                  : 0,
              date: (() => {
                const res = compareTwo(
                  timeStampToString(a.highscore.timeStamp).date,
                  timeStampToString(b.highscore.timeStamp).date
                );
                //console.log('compare two dates:', res);
                return res === 'a' ? -1 : res === 'b' ? 1 : 0;
              })(),
              time: (() => {
                const res = compareTwo(
                  timeStampToString(a.highscore.timeStamp).time,
                  timeStampToString(b.highscore.timeStamp).time
                );
                //console.log('compare two times:', res);
                return res === 'a' ? -1 : res === 'b' ? 1 : 0;
              })(),
            };

            const branchValues = Object.values(branchResult);

            let RES = 0;

            for (let nth = 0; nth < branchValues.length; nth++) {
              let val = branchValues[nth];

              if (val !== 0) {
                RES = val;
                break;
              }
            }
            return RES;
          });
        }

        const loading = this.props.appReady ? false : this.state.loading;

        // limit to top 5
        //const newBoard = sorted.length <= 5 ? sorted : sorted.slice(0, 5);
        this.setState(
          {
            scoreboard,
            loading,
          },
          () => this.tryCallback(cb)
        );
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
      typed: { typoCount, output },
      authUser,
      authTyper,
      achievements,
    } = this.state;

    const latestScore = {
      typer: this.state.authUser.name || 'Unknown',
      level,
      time: getTime(time, output),
      score: {
        points: pointCalc(points, getTime(time, output).CCPS),
        timeStamp: timeStamp(),
      },
      text: title,
      typos: typoCount,
      achievements: {
        chars: achievements.chars,
        words: achievements.words,
        charsInaRow: achievements.charsInaRow,
        wordsInaRow: achievements.wordsInaRow,
      },
    };

    this.setState({ latestScore }, () => {
      // new personal highscore?
      console.log('old', authTyper.highscore.points, 'new', points);
      if (latestScore.score.points > authTyper.highscore.points) {
        if (!this.state.muted) this.playSound('success');

        this.setState({ newHighscore: true }, () => {
          return this.saveScore(cb);
        });
      } else {
        if (!this.state.muted) this.playSound('pop');
      }

      this.tryCallback(cb);
    });
  }

  saveScore(cb) {
    const { latestScore, scoreStatus, authUser } = this.state;

    if (!latestScore) return this.createLatestScore(this.saveScore);

    // save new highscore!
    this.props.firebase.updateTyper(
      this.state.authUser.uid,
      {
        highscore: { ...latestScore.score, speed: scoreStatus },
      },
      err => {
        if (err) console.log('Err when updating typer (saveScore)', err);

        this.loadScoreBoard();

        this.setState(
          ps => ({
            ...ps,
            ...endGameState,
            newHighscore: true,
            authTyper: { ...ps.authTyper, highscore: latestScore.score },
          }),
          () => {
            this.tryCallback(cb);
          }
        );
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
    this.setState({
      material,
      typed: { ...clone(initialState.typed), remaining: material.text },
    });
  };

  inputHandler({ pointsToAdd = 0, typedProps = {}, char }) {
    const {
      index = this.state.typed.index,
      input,
      output = this.state.material.text.substring(
        0,
        typedProps.index || this.state.typed.index
      ),
      remaining = this.state.material.text.substring(
        typedProps.index || this.state.typed.index
      ),
      wasTypo,
      ...typedRest
    } = typedProps;

    if (this.state.points + pointsToAdd < -10) {
      const res = randOfArr(dynamicMsg.gameOverText);

      return Alert.alert('Game Over', 'Points dropped below -10', [
        {
          text: 'I can do better ' + res.emoji,
          style: 'cancel',
        },
      ]);
    }

    if (!input) return console.log('Missing input to update typed-state');

    /* if (wasTypo) {
      // if typo when 3+ words in a row, play pianoRoll -fail -sound
      if (this.state.achievements.words + 1 >= 3) {
        this.playSound({ name: 'pianoRoll', vol: 0.3 });
      }
    } */

    this.setState(
      ps => ({
        points: Math.round((ps.points + pointsToAdd) * 100) / 100,
        typed: typedProps,
        achievements: {
          ...ps.achievements,
          chars: !wasTypo ? ps.achievements.chars + 1 : 0,
          countingWords:
            (!wasTypo && ps.achievements.countingWords) || char === ' '
              ? true
              : false,
          words:
            wasTypo || !ps.achievements.countingWords
              ? 0
              : char !== ' ' &&
                (typedProps.remaining[0] === ' ' ||
                  typedProps.remaining.length < 1)
              ? ps.achievements.words + 1
              : ps.achievements.words,
        },
      }),
      () => {
        const { achievements, typed } = this.state;

        if (
          (this.state.typed.output[this.state.typed.output.length - 1] ===
            '.' ||
            this.state.typed.output[this.state.typed.output.length - 1] ===
              '!' ||
            this.state.typed.output[this.state.typed.output.length - 1] ===
              '?') &&
          this.state.typed.remaining[0] !== '.' &&
          this.state.typed.remaining[0] !== '!' &&
          this.state.typed.remaining[0] !== '?'
        ) {
          this.playSound({ name: 'ding', vol: 0.3 });
        }

        if (!wasTypo && typed.remaining[0] === ' ') {
          // (is actually on 3 and 6 words in a row)
          if (achievements.words >= 20 && achievements.words % 20 === 0) {
            this.playSound({ name: 'nice', vol: 0.1 }, ({ sound }) => {});
            this.setState(ps => ({ points: ps.points + bonus }));
          } else if (
            // on 4 & 12, on 24 & 32, on 44 & 52 etc...
            (achievements.words / 20 + 0.8) % 1 === 0 ||
            (achievements.words / 20 + 0.4) % 1 === 0
          ) {
            // on 8 & 16, on 28 & 36, on 48 & 56 etc...
            this.playSound({ name: 'blipBlop1', vol: 0.3 });
          } else if (
            (achievements.words / 20 + 0.6) % 1 === 0 ||
            (achievements.words / 20 + 0.2) % 1 === 0
          ) {
            this.playSound({ name: 'blipBlop2', vol: 0.3 });
          }
        }

        // update words in a row
        this.setState(ps => {
          const charsBest = ps.achievements.chars > ps.achievements.charsInaRow;
          const wordsBest = ps.achievements.words > ps.achievements.wordsInaRow;

          return {
            achievements: {
              ...ps.achievements,
              charsInaRow: charsBest
                ? ps.achievements.chars
                : ps.achievements.charsInaRow,
              wordsInaRow: wordsBest
                ? ps.achievements.words
                : ps.achievements.wordsInaRow,
            },
          };
        });
        // console.timeEnd('inputHandler');
      }
    );
  }

  addTick(cb) {
    if (this.state.time >= 10 && this.state.time % 10 === 0) {
      if (this.state.scoreStatus.length < 30) {
        this.addScoreStatus();
      } else if (
        this.state.scoreStatus.length < 60 &&
        this.state.time % 60 === 0
      ) {
        this.addScoreStatus();
      } else {
        //...
      }
    }

    this.setState(
      ps => ({ time: ps.time + 1 }),
      () => {
        this.tryCallback(cb);
      }
    );
  }

  addScoreStatus() {
    const {
      scoreStatus,
      time,
      typed: { output },
    } = this.state;

    const { CCPS } = getTime(time, output);

    const newStatus = {
      time: time / 10,
      speed: Math.round(CCPS * 100) / 100,
    };

    this.setState(ps => ({ scoreStatus: [...ps.scoreStatus, newStatus] }));
  }

  setPushNav(pushNav = false) {
    this.setState({ pushNav });
  }

  resetGame({ override = null, cb }) {
    console.log('resetGame()');
    this.setState(
      ps => ({
        ...clone(initialState),
        muted: ps.muted,
        sounds: ps.sounds,
        ...override,
      }),
      () => {
        this.tryCallback(cb);
      }
    );
  }

  prepareGame() {
    console.log('prepareGame()');
    if (/* this.state.gameON ||*/ this.state.gameStandby) return;

    this.setState(
      ps => ({
        ...newGameState(ps),
        msg: ['When you are ready, just start typing...'],
        pushNav: 'Game',
        gamePaused: false,
        gameStandby: true,
      }),
      () => {
        this.playSound({ name: 'tension', solo: true });
      }
    );
  }

  startGame() {
    console.log('startGame()');
    if (this.state.gameON || !this.state.gameStandby) return;

    this.setState({ gameON: true, msg: 'Game is ON!' });
  }

  endGame({ gameFinished = false, override = {}, cb, ...props }) {
    console.log('endGame()', gameFinished);

    const { gameON, gameStandby, gamePaused } = this.state;

    if (!gameON && !gameStandby && !gamePaused) return;

    this.setState(
      ps => ({
        ...ps,
        ...endGameState,
        pushNav: gameFinished ? 'ScoreBoard' : false,
        msg: gameFinished ? 'Game finished' : 'Game ended',
        gameFinished,
        time: ps.time && ps.time > 0 ? ps.time : 1,
        ...override,
      }),
      () => {
        this.tryCallback(cb);
      }
    );
  }

  togglePauseGame() {
    console.log('togglePauseGame()');
    if (!this.state.gameON && !this.state.gameStandby) return;

    const msg = this.state.gamePaused
      ? 'To continue, just start typing...'
      : 'Game paused';

    this.playSound(this.state.gamePaused ? 'tension' : 'pop');

    this.setState(ps => ({
      msg,
      gameStandby: !ps.gameStandby,
      gamePaused: !ps.gamePaused,
      gameON: ps.gamePaused ? false : true,
    }));
  }

  render() {
    if (!this.props.appReady) return null;

    return (
      <Ctx.Provider
        value={{
          gameState: this.state,
          gameSetters: this.setters,
          authUser: this.state.authUser,
          loading: this.state.loading || !this.props.appReady,
        }}
      >
        {/* <Loading visible={this.state.loading} textContent="Loading..." /> */}
        {!this.state.loading && this.props.appReady && this.props.children}
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
