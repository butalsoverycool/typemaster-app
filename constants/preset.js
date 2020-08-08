import keyboard from '../assets/keyboard.png';
import settings from '../assets/settings.png';

export const levelWithdrawal = [-0.01, -0.02, -0.05, -0.666];

export const navIcons = {
  Game: keyboard, // props => <Keyboard {...props} />,
  Settings: settings, // props => <Settings {...props} />,
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
