import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { withState } from '../GameState';
import { Anim, Text } from '../Elements';
import theme from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#eee',
  },
});

const About = ({ gameState: { loading, nav }, ...props }) => {
  return (
    <Anim
      enterOn={!loading && nav === 'About'}
      hideOnExit={true}
      duration={{ in: 300, out: 200 }}
      easing={{ in: 'ease-out', out: 'ease' }}
      anim={{
        opacity: {
          fromValue: 0,
          toValue: 1,
        },
      }}
    >
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
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  How to play
                </Text>
                <Text>- Pick a text to type</Text>
                <Text>- Hit Start-button</Text>
                <Text>- The game begins when you start typing</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  Some Hints
                </Text>
                <Text>- Fast and correct typing = higher points</Text>
                <Text>- Game is indeed caSE SENsitive</Text>
                <Text>- All characters you see are mandatory</Text>
                <Text>- ...including spaces(" ") and commas(",")</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  About points
                </Text>
                <Text>- 1 correct character = +1p</Text>
                <Text>- 1 typo/incorrect character = -1p</Text>
                <Text>- ...also, time will eat your points :)</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  Game Over =
                </Text>
                <Text>- Interaction outside keyboard area while playing</Text>
                <Text>- ...or hitting "Enter"-key while playing</Text>
                <Text>- If points drop below -10</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  About Levels
                </Text>
                <Text>- Harder level = faster point-drop over time</Text>
                <Text>- Stella Pajunas = "Super Hard"</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  Time punishments
                </Text>
                <Text>- Easy: 0.1 p/sec</Text>
                <Text>- Medium: 0.2 p/sec</Text>
                <Text>- Hard: 0.4 p/sec</Text>
                <Text>- Stella Pajunas: 0.666 p/sec</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  Typo punishments
                </Text>
                <Text>- Easy: -1p</Text>
                <Text>- Medium: -2p</Text>
                <Text>- Hard: -4p</Text>
                <Text>- Stella Pajunas: Game Over</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  Speed Standard
                </Text>
                <Text>- Easy: 2 correct inputs/sec</Text>
                <Text>- Medium: 4 correct inputs/sec</Text>
                <Text>- Hard: 6 correct inputs/sec</Text>
                <Text>- Stella Pajunas: 8 correct inputs/sec</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Anim>
  );
};

export default withState(About);
