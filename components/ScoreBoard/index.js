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
      'settings',
      'time',
      'latestScore',
    ]) || this.props.visible !== np.visible;

  render() {
    const { gameState, gameSetters, visible, ...props } = this.props;
    const {
      gameFinished,
      scoreboard: unsortedScoreboard,
      settings: { typer },

      latestScore,
    } = gameState;
    const { clearScore, prepareGame } = gameSetters;

    const scoreboard = unsortedScoreboard.sort((a, b) =>
      a.points > b.points ? -1 : 1
    );

    const typerExists =
      typer &&
      typeof typer === 'string' &&
      typer !== '' &&
      typer !== ' ' &&
      typer !== 'Unknown';

    const qualified =
      scoreboard.some(score =>
        latestScore ? score.points < latestScore.points : false
      ) || scoreboard.length < 5;

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
                <DataTable.Title numeric style={localStyles.title}>
                  Time
                </DataTable.Title>
                <DataTable.Title style={localStyles.title}>
                  Level
                </DataTable.Title>
                <DataTable.Title style={localStyles.title}>
                  Text
                </DataTable.Title>
                <DataTable.Title style={localStyles.title}>
                  When
                </DataTable.Title>
              </DataTable.Header>

              {scoreboard.map(
                ({ typer, points, time, level, text, timeStamp }, nth) => (
                  <DataTable.Row key={nth}>
                    <DataTable.Cell style={localStyles.cell}>
                      {typer}
                    </DataTable.Cell>
                    <DataTable.Cell numeric static style={localStyles.cell}>
                      {points}
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={localStyles.cell}>
                      {time}
                    </DataTable.Cell>
                    <DataTable.Cell style={localStyles.cell}>
                      {levels[level].substring(0, 6)}
                    </DataTable.Cell>
                    <DataTable.Cell style={localStyles.cell}>
                      {text}
                    </DataTable.Cell>
                    <DataTable.Cell style={localStyles.cell}>
                      {timeStamp && timeStamp.date}
                    </DataTable.Cell>
                  </DataTable.Row>
                )
              )}

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
          <Section>
            <Btn
              content={latestScore ? 'Play again' : 'Play'}
              onPress={prepareGame}
            />
          </Section>

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
