import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import { withState } from '../GameState';
import { Anim, Text, Btn } from '../Elements';
import theme from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#eee',
  },
});

const About = ({ gameState: { loading, nav }, ...props }) => {
  /* const handleLinkPress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]); */

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
                  How to master
                </Text>
                <Text>- Fast and correct typing = higher points</Text>
                <Text>- Correct input = +0.05 points</Text>
                <Text>- Typo/incorrect input = -0.05 points</Text>
                <Text>- tHE game IS caSE SENsitive</Text>
                <Text>- Type all characters you see</Text>
                <Text>- ...including spaces (" ") and commas (",") etc...</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  About those jumping fingers
                </Text>
                <Text>- How cute?</Text>
                <Text>- 4 correct words in a row = 1 finger</Text>
                <Text>- 5 fingers = hand of God = 0.5 bonus points</Text>
                <Text>
                  - Mistakes along the way = no withdrawal, but fingers gone
                </Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  Game Over
                </Text>
                <Text>- Interaction outside keyboard area while playing</Text>
                <Text>- ...or hitting "Enter"-key while playing</Text>
                <Text>- If points drop too low or time runs too long</Text>
              </View>

              <View style={theme.box}>
                <Text style={[theme.subtitle, { textAlign: 'left' }]}>
                  The creator
                </Text>
                <Text>- I'm Kim Nkoubou</Text>
                <Text>- A musician who got into front-end dev in 2018.</Text>
                <Text>- This is my first game</Text>
                <Text>
                  - The Idea for the game came when I stumpled upon the world's
                  fastest typerwritist{' '}
                  <Btn
                    /* WHAAAAAAT */
                    w={50}
                    h={20}
                    content={<Text>Stella Pajunas</Text>}
                    onPress={() =>
                      Linking.openURL(
                        'https://www.pond5.com/stock-footage/item/75268195-miss-stella-pajunas-worlds-fast-typist-types-ibm-electric-ty'
                      )
                    }
                  />
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Anim>
  );
};

export default withState(About);
