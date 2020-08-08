import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Card } from 'react-native-elements';
import { withState } from '../GameState';
import UserInput from './UserInput';
import styles from './styles';
import { levels } from '../../constants/options';

const localStyles = StyleSheet.create({
  material: { fontSize: 20, flexShrink: 1 },
  typed: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: '700',
  },
  notTyped: {},

  infoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },

  infoLabel: {
    marginTop: 10,
    marginBottom: 0,

    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    minWidth: '100%',
  },

  infoText: { width: '100%', minWidth: '100%', textAlign: 'center' },
});

const Material = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    gameReady,
    gameON,
    material: { title = '', text = '' },
    charIndex,
    settings,
  } = gameState;
  const { endGame } = gameSetters;

  const typed = text.substring(0, charIndex);
  const notTyped = text.substring(charIndex);

  const clickHandler = () => {
    alert('Sorry, game ended');
    endGame();
  };

  const TextInfo = () => (
    <View style={localStyles.infoContainer}>
      <Text style={localStyles.infoLabel}>Title</Text>
      <Text style={localStyles.infoText}>{title}</Text>
      <Text style={localStyles.infoLabel}>Length</Text>
      <Text style={localStyles.infoText}>{text.length}</Text>
      <Text style={localStyles.infoLabel}>Level</Text>
      <Text style={localStyles.infoText}>{levels[settings.level]}</Text>
    </View>
  );

  const TextMaterial = () => (
    <View>
      <Text style={localStyles.material}>
        <Text style={localStyles.typed}>{typed}</Text>
        <Text style={localStyles.notTyped}>{notTyped}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.section}>
      <Card
        containerStyle={styles.card}
        wrapperStyle={[styles.innerContainer, { alignItems: 'flex-start' }]}
      >
        {gameReady || gameON ? <TextMaterial /> : <TextInfo />}
      </Card>
      <UserInput />
    </View>
  );
};

export default withState(Material);
