import React, { memo } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import library from '../../constants/library';
import { mathRandInc } from '../../constants/helperFuncs';
import { Section, Text } from '../Elements';

const TextList = ({ gameSetters: { setMaterial, playSound } }) => (
  <Section flex={1}>
    <SafeAreaView>
      <Text style={[theme.title, { textAlign: 'center' }]}>Pick a text</Text>
      <ScrollView centerContent={true}>
        {library.map((item, nth) => (
          <ListItem
            key={nth}
            title={item.title}
            subtitle={String(item.text.length)}
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

const Memo = memo(p => <TextList {...p} />);

export default withState(Memo);
