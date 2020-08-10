import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { withState } from '../GameState';
import UserInput from './UserInput';
import theme from '../../constants/theme';
import styles from './styles';
import { levels } from '../../constants/options';
import library from '../../constants/library';
import Teleprompter from './Teleprompter';
import ScoreBoard from '../ScoreBoard';

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
    marginTop: 5,
    marginBottom: 0,

    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    minWidth: '100%',
  },

  infoText: {
    width: '100%',
    minWidth: '100%',
    textAlign: 'center',
    marginBottom: 5,
  },

  textItem: { fontSize: 20, color: 'black' },
});

const Material = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    gameStandby,
    gameON,
    gamePaused,
    gameFinished,
    material: { title = '', text = '' },
    typed,
    settings,
  } = gameState;
  const { endGame, setMaterial } = gameSetters;

  /* const typed = text.substring(0, charIndex);
  const notTyped = text.substring(charIndex); */

  const [choice, setChoice] = useState({});

  const clickHandler = () => {
    alert('Sorry, game ended');
    endGame();
  };

  const PickText = () => (
    <View style={styles.section}>
      <Text style={[theme.title, { textAlign: 'center' }]}>Pick a text</Text>
      <Card style={styles.card} wrapperStyle={styles.cardWrapper}>
        <SafeAreaView>
          <ScrollView
            centerContent={true}
            contentContainerStyle={{ width: '100%', minWidth: '100%' }}
          >
            {library.map((item, nth) => (
              <ListItem
                key={nth}
                title={item.title}
                subtitle={String(item.text.length)}
                titleStyle={localStyles.textItem}
                bottomDivider
                onPress={() => setMaterial(item)}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Card>
    </View>
  );

  const TextInfo = () => (
    <View style={localStyles.infoContainer}>
      <Text style={[localStyles.infoLabel, { fontSize: 22 }]}>
        Text to type
      </Text>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'black',
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Text style={localStyles.infoLabel}>Title</Text>
        <Text style={localStyles.infoText}>{title}</Text>
        <Text style={localStyles.infoLabel}>Length</Text>
        <Text style={localStyles.infoText}>{text.length}</Text>
        <Text style={localStyles.infoLabel}>Level</Text>
        <Text style={localStyles.infoText}>{levels[settings.level]}</Text>
      </View>

      <Button
        buttonStyle={{
          marginTop: 5,
          borderRadius: 5,
          backgroundColor: '#444',
        }}
        titleStyle={{ color: 'whitesmoke' }}
        title="change text"
        onPress={() => setMaterial()}
      />
    </View>
  );

  return (
    <View style={[styles.section, {}]}>
      <Card
        containerStyle={styles.card}
        wrapperStyle={[
          styles.cardWrapper,
          {
            alignItems: 'flex-start',
          },
        ]}
      >
        <View>
          {gamePaused ? null : gameStandby || gameON ? (
            <Teleprompter />
          ) : title && text ? (
            <TextInfo />
          ) : (
            <PickText />
          )}
        </View>
      </Card>
      <UserInput />
    </View>
  );
};

export default withState(Material);
