import React, { Component, createContext } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import {
  clone,
  pickMaterial,
  randOfArr,
  timeStamp,
} from '../constants/helperFuncs';
import { dynamicMsg } from '../constants/preset';
import { Value } from 'react-native-reanimated';

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
  },

  settings: {
    level: 0,
    typer: '',
  },

  pushNav: false,
};

class GameState extends Component {
  constructor(props) {
    super(props);

    this.state = clone(initialState);

    this.resetGame = this.resetGame.bind(this);
    this.prepareGame = this.prepareGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.togglePauseGame = this.togglePauseGame.bind(this);

    this.addTick = this.addTick.bind(this);
    this.setMaterial = this.setMaterial.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setCaseSens = this.setCaseSens.bind(this);
    this.setTyper = this.setTyper.bind(this);
    this.setTyped = this.setTyped.bind(this);
    this.setTypoCount = this.setTypoCount.bind(this);
    this.setPoints = this.setPoints.bind(this);
    this.setPushNav = this.setPushNav.bind(this);

    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.clearScore = this.clearScore.bind(this);

    this.setters = {
      resetGame: this.resetGame,
      prepareGame: this.prepareGame,
      startGame: this.startGame,
      endGame: this.endGame,
      togglePauseGame: this.togglePauseGame,

      addTick: this.addTick,
      setMaterial: this.setMaterial,
      setLevel: this.setLevel,
      setCaseSens: this.setCaseSens,
      setTyper: this.setTyper,
      setTyped: this.setTyped,
      setTypoCount: this.setTypoCount,
      setPoints: this.setPoints,
      setPushNav: this.setPushNav,

      saveScore: this.saveScore,
      clearScore: this.clearScore,
    };
  }

  componentDidMount() {
    this.load('scoreboard');
  }

  componentWillUnmount() {
    this.setState(clone(initialState));
  }

  async load(key) {
    try {
      const value = JSON.parse(await AsyncStorage.getItem(key)) || [];

      this.setState({ [key]: value });
    } catch (error) {
      Alert('Oh no', 'Failed to load ' + key, {
        text: 'Ok',
        style: 'cancel',
      });
    }
  }

  async save(key, val) {
    try {
      const saved = await AsyncStorage.setItem(key, JSON.stringify(val));

      if (saved !== null) console.log(key, 'was saved!');
    } catch (error) {
      Alert('Oh no', 'Failed to save ' + key, {
        text: 'Ok',
        style: 'cancel',
      });
    }
  }

  saveScore() {
    // curr score
    const {
      settings: { typer, level },
      time,
      points,
      material: { title },
    } = this.state;

    const newScore = {
      typer: typer || 'Unknown',
      level,
      time: time / 10,
      points,
      title,
      text: title,
      timeStamp: timeStamp(),
    };

    const unsorted = clone(this.state.scoreboard);

    // append new score
    unsorted.push(newScore);

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
    this.save('scoreboard', newBoard);
    this.setState(ps => ({ ...ps, ...newGameState(ps), scoreboard: newBoard }));
  }

  async clearScore() {
    try {
      await AsyncStorage.removeItem('scoreboard', () => {
        this.load('scoreboard');
      });
    } catch (error) {
      Alert('Oh no', 'Failed to clear score', { text: 'Ok', style: 'cancel' });
    }
  }

  tryCallback(cb) {
    if (typeof cb === 'function') cb();
  }

  setMaterial = (material = {}) => {
    material = this.setState({
      material,
      typed: { ...clone(initialState.typed), remaining: material.text },
    });
  };

  setLevel(level) {
    this.setState(ps => ({ settings: { ...ps.settings, level } }));
  }

  setCaseSens() {
    this.setState(ps => ({
      settings: { ...ps.settings, caseSensitive: !ps.settings.caseSensitive },
    }));
  }

  setTyper({ typer, callback }) {
    this.setState(
      ps => ({ settings: { ...ps.settings, typer } }),
      () => {
        this.tryCallback(callback);
      }
    );
  }

  setPoints(toAdd) {
    if (this.state.points + toAdd < -10) {
      const res = randOfArr(dynamicMsg.gameOverText);

      return Alert.alert('Game Over', 'Points dropped below -10', [
        {
          text: 'I can do better ' + res.emoji,
          style: 'cancel',
        },
      ]);
    }

    this.setState(ps => ({
      points: Math.round((ps.points + toAdd) * 100) / 100,
    }));
  }

  setTyped({ index, output, remaining, ...props }) {
    if (!props.input) return console.log('Missing input to update typed-state');

    index = index || this.state.typed.index + 1;
    output = output || this.state.material.text.substring(0, index);
    remaining = remaining || this.state.material.text.substring(index);

    this.setState(ps => ({ typed: { ...props, index, output, remaining } }));
  }

  setTypoCount(toAdd = 1) {
    this.setTyped(ps => {});
    this.setState(ps => ({
      typed: {
        ...ps.typed,
        typoCount: ps.typed.typoCount + toAdd,
      },
    }));
  }

  addTick() {
    this.setState(ps => ({ time: ps.time + 1 }));
  }

  setPushNav(pushNav = false) {
    this.setState({ pushNav });
  }

  resetGame() {
    if (!this.state.gameON && !this.state.gamePaused) return;

    this.setState(ps => ({
      ...ps,
      ...newGameState(this.state),
    }));
  }

  prepareGame() {
    if (this.state.gameON || this.state.gameStandby) return;

    this.setState(ps => ({
      ...newGameState(this.state),
      msg: ['When you are ready, just start typing...'],
      gamePaused: false,
      gameStandby: true,
    }));
  }

  startGame() {
    if (this.state.gameON || !this.state.gameStandby) return;

    this.setState({ gameON: true, msg: 'Game is ON!' });
  }

  endGame() {
    if (!this.state.gameON && !this.state.gameStandby && !this.state.gamePaused)
      return;

    this.setState(ps => ({
      ...ps,
      ...endGameState,
      gameFinished: ps.typed.remaining.length <= 0,
      pushNav: ps.typed.remaining.length <= 0 ? 'ScoreBoard' : false,
      msg: ps.typed.remaining.length <= 0 ? 'Game finished' : 'Game ended',
    }));
  }

  togglePauseGame() {
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
        value={{ gameState: this.state, gameSetters: this.setters }}
      >
        {this.props.children}
      </Ctx.Provider>
    );
  }
}

export default GameState;

export const withState = Component => props => (
  <Ctx.Consumer>
    {({ gameState, gameSetters }) => (
      <Component {...props} gameState={gameState} gameSetters={gameSetters} />
    )}
  </Ctx.Consumer>
);
