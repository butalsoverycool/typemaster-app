import React, { memo, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withFirebase } from '../Firebase';
import { withState } from '../GameState';
import theme from '../../constants/theme';
//import library from '../../constants/library';
import { mathRandInc } from '../../constants/helperFuncs';
import { Section, Text } from '../Elements';

const TextList = ({ gameSetters: { setMaterial, playSound }, firebase }) => {
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    firebase.getTexts(texts => setLibrary(texts));
  }, []);

  if (!library)
    return (
      <Section>
        <Text>Loading texts...</Text>
      </Section>
    );

  return (
    <Section flex={1}>
      <SafeAreaView>
        <Text style={[theme.title, { textAlign: 'center' }]}>Pick a text</Text>
        <ScrollView centerContent={true}>
          {library.map((item, nth) => (
            <ListItem
              key={nth}
              title={item.title}
              subtitle={item.artist + ' - ' + String(item.text.length)}
              titleStyle={{ fontFamily: 'CutiveMono_400Regular' }}
              subtitleStyle={{ fontFamily: 'CutiveMono_400Regular' }}
              bottomDivider
              onPress={() => {
                playSound({ name: 'confirm' });
                setMaterial(item);
              }}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </Section>
  );
};

const Memo = memo(p => <TextList {...p} />);

export default withFirebase(withState(Memo));
