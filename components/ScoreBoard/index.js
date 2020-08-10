import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { DataTable } from 'react-native-paper';

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

const ScoreBoard = ({
  gameState: { scoreboard },
  gameSetters: { saveScore, clearScore },
  ...props
}) => {
  return (
    <View style={theme.view}>
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
          </DataTable.Header>

          {scoreboard
            .sort((a, b) => (a.points > b.points ? -1 : 1))
            .map(({ typer, points, time, level, text }, nth) => (
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
                  {level}
                </DataTable.Cell>
                <DataTable.Cell style={localStyles.cell}>{text}</DataTable.Cell>
              </DataTable.Row>
            ))}

          <DataTable.Pagination
            style={{ justifyContent: 'center', flexWrap: 'nowrap', padding: 0 }}
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label=""
          />
        </DataTable>
      </View>

      <View style={theme.section}>
        <Button title="save something" onPress={saveScore} />
      </View>

      <View style={theme.section}>
        <Button title="clear scores" onPress={clearScore} />
      </View>
    </View>
  );
};

export default withState(ScoreBoard);
