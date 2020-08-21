import React, { memo } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import library from '../../constants/library';
import { Section } from '../Elements';

const TextList = ({ gameSetters: { setMaterial } }) => (
  <Section flex={1}>
    <SafeAreaView>
      <Text style={[theme.title, { textAlign: 'center' }]}>Pick a text</Text>
      <ScrollView centerContent={true}>
        {library.map((item, nth) => (
          <ListItem
            key={nth}
            title={item.title}
            subtitle={String(item.text.length)}
            /* titleStyle={localStyles.textItem} */
            bottomDivider
            onPress={() => setMaterial(item)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  </Section>
);

const Memo = memo(p => <TextList {...p} />);

export default withState(Memo);
