import React from 'react';
import { StyleSheet } from 'react-native';
import { Section, Text } from '../Elements';
import Audio from './Audio';

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'CutiveMono_400Regular',
  },
});

export default props => {
  return (
    <Section h={100} fillW padding={0}>
      <Section h={30} padding={0}></Section>
      <Section flex={1} padding={0} row fillW h={50}>
        <Section w={60}>
          <Text></Text>
        </Section>
        <Section flex={1}>
          <Text style={styles.title}>Type Master</Text>
        </Section>

        <Section w={60}>
          <Audio />
        </Section>
      </Section>
    </Section>
  );
};
