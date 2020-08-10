import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
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
    <SafeAreaView>
      <ScrollView
        centerContent={true}
        contentContainerStyle={{ width: '100%', minWidth: '100%' }}
      >
        <View style={theme.view}>
          <View style={theme.section}>
            <View>
              <Text style={theme.title}>ABOUT</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>How to play</Text>
              <Text>- Pick a text to type</Text>
              <Text>- Hit Start-button</Text>
              <Text>- The game begins when you start typing</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>Some Hints</Text>
              <Text>- Fast and correct typing = higher points</Text>
              <Text>- Game is indeed caSE SENsitive</Text>
              <Text>- All characters you see are mandatory</Text>
              <Text>- ...including spaces(" ") and commas(",")</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>About points</Text>
              <Text>- 1 correct character = +1p</Text>
              <Text>- 1 typo/incorrect character = -1p</Text>
              <Text>- ...also, time will eat your points :)</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>Game Over =</Text>
              <Text>- Interaction outside keyboard area while playing</Text>
              <Text>- ...or hitting "Enter"-key while playing</Text>
              <Text>- If points drop below -10</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>About Levels</Text>
              <Text>- Harder level = faster point-drop over time</Text>
              <Text>- Stella Pajunas = "Super Hard"</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>Time punishments</Text>
              <Text>- Easy: 0.1 p/sec</Text>
              <Text>- Medium: 0.2 p/sec</Text>
              <Text>- Hard: 0.4 p/sec</Text>
              <Text>- Stella Pajunas: 0.666 p/sec</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>Typo punishments</Text>
              <Text>- Easy: -1p</Text>
              <Text>- Medium: -2p</Text>
              <Text>- Hard: -4p</Text>
              <Text>- Stella Pajunas: Game Over</Text>
            </View>

            <View style={theme.box}>
              <Text style={theme.subtitle}>Speed Standard</Text>
              <Text>- Easy: 2 correct inputs/sec</Text>
              <Text>- Medium: 4 correct inputs/sec</Text>
              <Text>- Hard: 6 correct inputs/sec</Text>
              <Text>- Stella Pajunas: 8 correct inputs/sec</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
