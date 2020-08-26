import React from 'react';
import keyboardIcon from '../assets/keyboard.png';
import settingsIcon from '../assets/settings.png';
import Icon from '../components/Elements/Icon';

export const withdrawal = -0.01;

export const reward = 0.01;

export const speedStandard = [2, 4, 6, 8];

export const bannedKeys = ['Backspace', 'Enter'];

export const navIconName = [
  {
    name: 'play',
  },
];

export const forbiddenAuthDiffs = ['lastLogin', 'email', 'name', 'uid'];

export const navIcons = {
  Game: 'play-square',
  ScoreBoard: 'trophy',
  Settings: 'setting',
  About: 'question-circle',
};

export const dynamicMsg = {
  gameOverText: [
    {
      text: 'But...but why?',
      emoji: '😧',
    },
    {
      text: 'Whatever',
      emoji: '🙄',
    },
    {
      text: 'Ok, kill me',
      emoji: '💀',
    },
    {
      text: 'OK!?',
      emoji: '🤯',
    },
    {
      text: 'Hmpf!',
      emoji: '🧐',
    },
    {
      text: '#!%!$∞!!@£3#!!',
      emoji: '🤬',
    },
    {
      text: 'Say whaaa',
      emoji: '😱',
    },
    {
      text: 'Boohoo!',
      emoji: '😭',
    },
    {
      text: 'I can do better',
      emoji: '🥴',
    },
    {
      text: 'Oh',
      emoji: '😳',
    },
  ],
  noHighscore: [
    "You've done better before.",
    'Not your best so far.',
    'You can do better.',
    'You can do faster.',
    'Try again.',
    "Let's pretend this never happened.",
    'Have you warmed up?',
    "Don't give up.",
    'Next time youll get it.',
    'Keep fighting',
  ],
};

export const sadFace = [
  '😧',
  '🙄',
  '💀',
  '🤯',
  '🧐',
  '🤬',
  '😱',
  '😭',
  '🥴',
  '😳',
];
