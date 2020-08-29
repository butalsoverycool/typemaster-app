import React, { Component } from 'react';
import { withState } from '../GameState';

class SoundPlayer {
  constructor(props) {
    this.sounds = sounds;

    this.loadSound = this.loadSound.bind(this);
    this.loadAllSounds = this.loadAllSounds.bind(this);
    this.playSound = this.playSound.bind(this);
    this.unloadSound = this.unloadSound.bind(this);

    this.loadAllSounds(sounds);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.load();
  }

  async loadSound({ src, ext = 'wav', cb }) {
    try {
      await sound.loadAsync(require(`../../assets/audio/${src}.${ext}`));
    } catch (err) {
      return cb(err);
    }

    cb();
  }
}

export default withState(SoundPlayer);
