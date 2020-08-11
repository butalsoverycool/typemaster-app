import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import library from '../../constants/library';

const TextList = ({ gameState, gameSetters: { setMaterial } }) => {
  return (
    <View style={theme.section}>
      <SafeAreaView>
        <Text style={[theme.title, { textAlign: 'center' }]}>Pick a text</Text>
        <ScrollView
          centerContent={true}
          contentContainerStyle={{ width: '100%', minWidth: '100%' }}
        >
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
    </View>
  );
};

export default withState(TextList);
