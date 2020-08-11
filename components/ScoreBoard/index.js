import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { DataTable } from 'react-native-paper';
import NameInput from './NameInput';
import { levels } from '../../constants/options';
import { timeStamp } from '../../constants/helperFuncs';

const localStyles = StyleSheet.create({
  title: { justifyContent: 'flex-start' },
  cell: { justifyContent: 'flex-start' },
});

const score = [
  {
    typer: 'Lasse',
    points: 5,
    time: 23.3,
    level: 'medium',
    text: 'Margareta',
  },
  {
    typer: 'Orvar',
    points: 2.6,
    time: 23.3,
    level: 'medium',
    text: 'Margareta',
  },
  {
    typer: 'Jesus',
    points: 5.6,
    time: 23.3,
    level: 'medium',
    text: 'Margareta',
  },
  {
    typer: 'Maja',
    points: 6,
    time: 23.3,
    level: 'medium',
    text: 'Margareta',
  },
  {
    typer: 'Wendy',
    points: 2.1,
    time: 23.3,
    level: 'medium',
    text: 'Margareta',
  },
];

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(np, ns) {
    const {
      gameFinished,
      scoreboard,
      settings: { typer },
    } = this.props.gameState;

    const {
      gameFinished: nextGameFinished,
      scoreboard: nextScoreboard,
      settings: { typer: nextTyper },
    } = np.gameState;

    return gameFinished !== nextGameFinished ||
      scoreboard.length !== nextScoreboard.length ||
      typer !== nextTyper
      ? true
      : false;
  }

  render() {
    const { gameState, gameSetters, visible, ...props } = this.props;
    const {
      gameFinished,
      scoreboard: unsortedScoreboard,
      settings: { typer },
      points,
    } = gameState;

    const { saveScore, clearScore } = gameSetters;

    const scoreboard = unsortedScoreboard.sort((a, b) =>
      a.points > b.points ? -1 : 1
    );

    // const [activeRow, setActiveRow] = useState(false);

    const typerExists =
      typer &&
      typeof typer === 'string' &&
      typer !== '' &&
      typer !== ' ' &&
      typer !== 'Unknown';

    //if (gameFinished && typerExists) saveScore();

    const qualified =
      scoreboard.some(score => score.points < points) || scoreboard.length < 5;

    return (
      <View style={theme.view}>
        {qualified && (
          <NameInput visible={gameFinished} typerExists={typerExists} />
        )}

        {/* {activeRow && <RowInfo data={scoreboard[activeRow]} />} */}

        <View style={theme.section}>
          <Text style={theme.title}>LOCAL SCOREBOARD</Text>
        </View>

        <View style={theme.section}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={localStyles.title}>Typer</DataTable.Title>
              <DataTable.Title numeric style={localStyles.title}>
                Points
              </DataTable.Title>
              <DataTable.Title numeric style={localStyles.title}>
                Time
              </DataTable.Title>
              <DataTable.Title style={localStyles.title}>Level</DataTable.Title>
              <DataTable.Title style={localStyles.title}>Text</DataTable.Title>
              <DataTable.Title style={localStyles.title}>When</DataTable.Title>
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

        {/* <View style={theme.section}>
        <Button title="save something" onPress={saveScore} />
      </View> */}

        <View style={theme.section}>
          <Button title="clear scores" onPress={clearScore} />
        </View>
      </View>
    );
  }
}

export default withState(ScoreBoard);
