import React from 'react';
import keyboardIcon from '../assets/keyboard.png';
import settingsIcon from '../assets/settings.png';
import Icon from '../components/Icon';

export const levelWithdrawal = [-0.01, -0.02, -0.05, -0.666];

export const navIcons = {
  Game: <Icon name="play-square" type="IconOutline" />,
  Settings: <Icon name="setting" type="IconOutline" />,
  About: <Icon name="question-circle" type="IconOutline" />,
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
};
