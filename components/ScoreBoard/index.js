import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { DataTable } from 'react-native-paper';
import NameInput from './NameInput';
import { levels } from '../../constants/options';
import { propsChanged } from '../../constants/helperFuncs';
import { Section, ScrollView, Btn } from '../Elements';
import Status from '../Game/Status';

const localStyles = StyleSheet.create({
  title: { justifyContent: 'flex-start' },
  cell: { justifyContent: 'flex-start' },
});

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameFinished',
      'scoreboard',
      'level',
      'time',
      'latestScore',
      'material',
    ]) || this.props.visible !== np.visible;

  render() {
    const { gameState, gameSetters, visible, authUser, ...props } = this.props;
    const {
      gameFinished,
      scoreboard: unsortedScoreboard,

      latestScore,
      material,
      level,
    } = gameState;

    const { clearScore, prepareGame, createLatestScore } = gameSetters;

    const scoreboard = unsortedScoreboard.sort((a, b) =>
      a.highscore > b.highscore ? -1 : 1
    );

    const typerExists =
      authUser.name &&
      typeof authUser.name === 'string' &&
      authUser.name !== '' &&
      authUser.name !== ' ' &&
      authUser.name !== 'Unknown';

    const qualified = true; //*** */

    /* if (gameFinished && !qualified) {
      this.setState({ gameFinished: false }, () => {
        createLatestScore(() => console.log('Created latest score'));
      });
    } */

    return (
      <SafeAreaView style={theme.view}>
        {qualified && (
          <NameInput visible={gameFinished} typerExists={typerExists} />
        )}

        {/* {activeRow && <RowInfo data={scoreboard[activeRow]} />} */}

        <ScrollView>
          <View style={theme.section}>
            <Text style={theme.title}>LOCAL SCOREBOARD</Text>
          </View>

          <View style={theme.section}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={localStyles.title}>
                  Typer
                </DataTable.Title>
                <DataTable.Title numeric style={localStyles.title}>
                  Points
                </DataTable.Title>

                <DataTable.Title style={localStyles.title}>
                  When
                </DataTable.Title>
              </DataTable.Header>

              {scoreboard.map(({ name, highscore, timeStamp }, nth) => (
                <DataTable.Row key={nth}>
                  <DataTable.Cell style={localStyles.cell}>
                    {name}
                  </DataTable.Cell>
                  <DataTable.Cell numeric static style={localStyles.cell}>
                    {highscore}
                  </DataTable.Cell>

                  <DataTable.Cell style={localStyles.cell}>
                    {timeStamp && timeStamp.date}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              {/* <DataTable.Pagination
            style={{ justifyContent: 'center', flexWrap: 'nowrap', padding: 0 }}
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label=""
          /> */}
            </DataTable>
          </View>

          {latestScore && !qualified && (
            <Section>
              <Text style={[theme.subtitle, { textAlign: 'center' }]}>
                Your latest score didn't qualify
              </Text>

              <Status />
            </Section>
          )}

          {/* <View style={theme.section}>
        <Button title="save something" onPress={saveScore} />
      </View> */}
          {material.title && (
            <Section>
              <Btn
                content={latestScore ? 'Play again' : 'Play'}
                onPress={prepareGame}
              />
            </Section>
          )}

          <Section>
            <Btn
              w={200}
              h={50}
              fontSize={12}
              content="clear scores"
              onPress={clearScore}
            />
          </Section>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withState(ScoreBoard);
