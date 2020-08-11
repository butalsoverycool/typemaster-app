import React from 'react';
import keyboardIcon from '../assets/keyboard.png';
import settingsIcon from '../assets/settings.png';
import Icon from '../components/Elements/Icon';

export const levelWithdrawal = [-0.01, -0.02, -0.04, -0.666];

export const speedStandard = [2, 4, 6, 8];

export const bannedKeys = ['Backspace', 'Enter'];

export const navIcons = {
  Game: isFocued => (
    <Icon
      name="play-square"
      type="IconOutline"
      color={!isFocued ? '#666' : '#444'}
    />
  ),
  ScoreBoard: isFocued => (
    <Icon
      name="trophy"
      type="IconOutline"
      color={!isFocued ? '#666' : '#444'}
    />
  ),
  Settings: isFocued => (
    <Icon
      name="setting"
      type="IconOutline"
      color={!isFocued ? '#666' : '#444'}
    />
  ),
  About: isFocued => (
    <Icon
      name="question-circle"
      type="IconOutline"
      color={!isFocued ? '#666' : '#444'}
    />
  ),
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
