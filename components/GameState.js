import React, { Component, createContext } from 'react';
import { clone, pickMaterial } from '../constants/helperFuncs';

const Ctx = createContext();

const newGameState = {
  gameReady: false,
  gameON: false,
  gamePaused: false,

  charIndex: 0,

  time: null,

  points: 0,

  msg: [],
};

const endGameState = {
  gameReady: false,
  gameON: false,
  gamePaused: false,
  msg: ['Game ended!'],
};

const initialState = {
  material: {},
  settings: {
    level: 0,
    caseSensitive: false,
    typer: '',
  },

  ...newGameState,
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
    this.setCharIndex = this.setCharIndex.bind(this);
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
      setCharIndex: this.setCharIndex,
      setPoints: this.setPoints,
      addTick: this.addTick,
    };
  }

  tryCallback(cb) {
    if (typeof cb === 'function') cb();
  }

  setMaterial = material => {
    this.setState({ material });
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

  setCharIndex(addVal = 1) {
    this.setState(ps => ({ charIndex: ps.charIndex + addVal }));
  }

  addTick() {
    this.setState(ps => ({ time: ps.time + 1 }));
  }

  resetGame() {
    if (!this.state.gameON && !this.state.gamePaused) return;

    this.setState(ps => ({
      ...ps,
      ...newGameState,
    }));
  }

  prepareGame() {
    if (this.state.gameON || this.state.gameReady) return;

    this.setState(ps => ({
      msg: [
        'Interaction outside of keyboard area = game over',
        'When you are ready, just start typing...',
      ],
      gameReady: true,
    }));
  }

  startGame() {
    if (this.state.gameON || !this.state.gameReady) return;

    this.setState({ gameON: true, msg: [] });
  }

  endGame() {
    if (!this.state.gameON && !this.state.gameReady && !this.state.gamePaused)
      return;

    this.setState(ps => ({ ...ps, ...endGameState }));
  }

  togglePauseGame() {
    if (!this.state.gameON && !this.state.gameReady) return;

    const msg = this.state.gamePaused ? '' : 'Paused!';

    this.setState(ps => ({ msg, gamePaused: !ps.gamePaused }));
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
