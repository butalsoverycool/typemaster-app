import React from 'react';
import { Keyboard, Settings } from '../assets/icons';
import keyboard from '../assets/keyboard.png';
import settings from '../assets/settings.png';

export const levelWithdrawal = [-0.01, -0.02, -0.05, -0.666];

export const navIcons = {
  Main: keyboard, // props => <Keyboard {...props} />,
  Settings: settings, // props => <Settings {...props} />,
};
