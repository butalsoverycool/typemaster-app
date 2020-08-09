import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#eee',
  },
});

const About = props => {
  return (
    <View style={theme.view}>
      <View style={theme.section}>
        <View>
          <Text style={theme.title}>ABOUT</Text>
        </View>

        <View style={theme.box}>
          <Text style={theme.subtitle}>How to play</Text>
          <Text>- Pick a text to type</Text>
          <Text>- Hit Start-button</Text>
          <Text>- The game will begin when you start typing</Text>
          <Text>- Fast and correct typing = higher points</Text>
        </View>

        <View style={theme.box}>
          <Text style={theme.subtitle}>About points</Text>
          <Text>- 1 correct character = +1 points</Text>
          <Text>- 1 typo/incorrect character = -1 points</Text>
          <Text>- Time will eat your points :)</Text>
        </View>

        <View style={theme.box}>
          <Text style={theme.subtitle}>Game Over =</Text>
          <Text>- Interaction outside keyboard area while playing</Text>
          <Text>- Pressing "Enter" while playing</Text>
          <Text>- When points drop below -10</Text>
        </View>

        <View style={theme.box}>
          <Text style={theme.subtitle}>About Levels</Text>
          <Text>- Harder level = faster point-drop</Text>
          <Text>- Stella Pajunas = "Super Hard"</Text>
        </View>
      </View>
    </View>
  );
};

export default About;
