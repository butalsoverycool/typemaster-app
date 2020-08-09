import React, { Component, createContext } from 'react';
import { clone, pickMaterial } from '../constants/helperFuncs';

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
  },
  ...override,
});

const endGameState = {
  gameStandby: false,
  gameON: false,
  gamePaused: false,
  msg: ['Game ended!'],
};

const initialState = {
  gameStandby: false,
  gameON: false,
  gamePaused: false,
  gameFinished: false,

  time: null,

  points: 0,

  msg: [],

  material: {},

  typed: {
    index: 0,
    input: '',
    output: '',
    remaining: '',
  },

  settings: {
    level: 0,
    caseSensitive: false,
    typer: '',
  },
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

    this.setMaterial = this.setMaterial.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setCaseSens = this.setCaseSens.bind(this);
    this.setTyper = this.setTyper.bind(this);
    this.setTyped = this.setTyped.bind(this);
    this.setPoints = this.setPoints.bind(this);
    this.addTick = this.addTick.bind(this);

    this.setters = {
      resetGame: this.resetGame,
      prepareGame: this.prepareGame,
      startGame: this.startGame,
      endGame: this.endGame,
      togglePauseGame: this.togglePauseGame,

      setMaterial: this.setMaterial,
      setLevel: this.setLevel,
      setCaseSens: this.setCaseSens,
      setTyper: this.setTyper,
      setTyped: this.setTyped,
      setPoints: this.setPoints,
      addTick: this.addTick,
    };
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

  setTyper(typer) {
    this.setState(ps => ({ settings: { ...ps.settings, typer } }));
  }

  setPoints(toAdd) {
    this.setState(ps => ({
      points: Math.round((ps.points + toAdd) * 100) / 100,
    }));
  }

  setTyped({ index, input, output, remaining }) {
    if (!input) return console.log('Missing input to update typed-state');

    index = index || this.state.typed.index + 1;
    output = output || this.state.material.text.substring(0, index);
    remaining = remaining || this.state.material.text.substring(index);

    this.setState(ps => ({ typed: { index, input, output, remaining } }));
  }

  addTick() {
    this.setState(ps => ({ time: ps.time + 1 }));
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

    this.setState({ gameON: true, msg: [] });
  }

  endGame() {
    if (!this.state.gameON && !this.state.gameStandby && !this.state.gamePaused)
      return;

    this.setState(ps => ({
      ...ps,
      ...endGameState,
      gameFinished: ps.typed.remaining.length <= 0,
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
