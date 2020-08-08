import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { withState } from '../GameState';
import UserInput from './UserInput';
import styles from './styles';
import { levels } from '../../constants/options';
import library from '../../constants/library';

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

  textItem: { fontSize: 20, color: 'black' },
});

const Material = ({ gameState, gameSetters, ...props }) => {
  if (!gameState) return null;

  const {
    gameReady,
    gameON,
    gamePaused,
    material: { title = '', text = '' },
    charIndex,
    settings,
  } = gameState;
  const { endGame, setMaterial } = gameSetters;

  const typed = text.substring(0, charIndex);
  const notTyped = text.substring(charIndex);

  const [choice, setChoice] = useState({});

  const clickHandler = () => {
    alert('Sorry, game ended');
    endGame();
  };

  const PickText = () => (
    <View
      style={{
        width: '100%',
        height: 400,
        flex: 1,
        justifyContent: 'flex-start',
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          centerContent={true}
          contentContainerStyle={{ width: '100%', minWidth: '100%' }}
        >
          {library.map((item, nth) => (
            <ListItem
              key={nth}
              containerStyle={{}}
              titleStyle={localStyles.textItem}
              title={item.title}
              subtitle={item.text.length}
              bottomDivider
              onPress={() => setMaterial(item)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );

  const TextInfo = () => (
    <View style={localStyles.infoContainer}>
      <Text style={localStyles.infoLabel}>Title</Text>
      <Text style={localStyles.infoText}>{title}</Text>
      <Text style={localStyles.infoLabel}>Length</Text>
      <Text style={localStyles.infoText}>{text.length}</Text>
      <Text style={localStyles.infoLabel}>Level</Text>
      <Text style={localStyles.infoText}>{levels[settings.level]}</Text>

      <Button
        buttonStyle={{
          marginTop: 5,
          borderRadius: 5,
          backgroundColor: '#444',
          color: 'whitesmoke',
        }}
        title="change text"
        onPress={() => setMaterial({})}
      />
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
        <View>
          {gameReady || gameON || gamePaused ? (
            <TextMaterial />
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
