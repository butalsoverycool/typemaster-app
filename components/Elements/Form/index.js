import React from 'react';
import { Text } from 'react-native';
import { colors } from '../../../constants/theme';
import Modal from '../Modal';
import Section from '../Section';

const Form = props => <Modal visible={props.visible}>{props.children}</Modal>;

export default Form;
