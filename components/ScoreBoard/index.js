import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { withState } from '../GameState';
import theme from '../../constants/theme';
import { DataTable } from 'react-native-paper';
import { Section, Text, ScrollView, Btn, Anim } from '../Elements';
import Form from '../Form';
import Status from '../Game/Status';

const localStyles = StyleSheet.create({
  title: { justifyContent: 'flex-start' },
  cell: { justifyContent: 'flex-start' },
});

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
  }

  /* shouldComponentUpdate = np =>
    propsChanged(this.props.gameState, np.gameState, [
      'gameFinished',
      'scoreboard',
      'level',
      'time',
      'latestScore',
      'newHighscore',
      'material',
      'loading',
      'nav',
    ]) || this.props.visible !== np.visible; */

  render() {
    const { gameState, gameSetters, visible, authUser, ...props } = this.props;
    let {
      gameFinished,
      scoreboard = [],

      latestScore,
      newHighscore,
      material,
      loading,
      nav,
    } = gameState;

    const { clearScore, prepareGame, createLatestScore } = gameSetters;

    // ugly safety-net cuz firebase is fucking up scoreboard when saving
    let scoreboardInvalid = false;

    scoreboard.forEach(score => {
      if (!score.highscore) {
        scoreboardInvalid = true;
      }
    });

    if (scoreboardInvalid) scoreboard = [];

    scoreboard.sort((a, b) => {
      if (!a.highscore || !b.highscore) return 0;

      return a.highscore.points > b.highscore.points ? -1 : 1;
    });
    //

    const typerExists =
      authUser.name &&
      typeof authUser.name === 'string' &&
      authUser.name !== '' &&
      authUser.name !== ' ' &&
      authUser.name !== 'Unknown';

    const qualified = true; //*** */

    return (
      <SafeAreaView style={theme.view}>
        {/* <ScorePreview visible={gameFinished} typerExists={typerExists} /> */}
        {gameFinished ? (
          <Anim
            enterOn={gameFinished}
            exitOn={!gameFinished}
            hideOnExit={true}
            duration={{ in: 700, out: 200 }}
            easing={{ in: 'bounce', out: 'ease' }}
            anim={{
              opacity: {
                fromValue: 0,
                toValue: 1,
              },
              transform: [
                {
                  key: 'translateY',
                  fromValue: 250,
                  toValue: 0,
                },
              ],
            }}
          >
            <Section flex={1} justify="center">
              <Form type="ScorePreview" />
            </Section>
          </Anim>
        ) : (
          /* {activeRow && <RowInfo data={scoreboard[activeRow]} />} */
          <Anim
            enterOn={!loading && nav === 'ScoreBoard'}
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
            <ScrollView>
              <View style={theme.section}>
                <Text style={theme.title}>LOCAL SCOREBOARD</Text>
              </View>

              <View style={theme.section}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title numeric style={localStyles.title}>
                      Points
                    </DataTable.Title>

                    <DataTable.Title style={localStyles.title}>
                      Typer
                    </DataTable.Title>

                    <DataTable.Title style={localStyles.title}>
                      When
                    </DataTable.Title>
                  </DataTable.Header>

                  {scoreboard.map(({ name, highscore }, nth) => (
                    <DataTable.Row key={nth}>
                      <DataTable.Cell numeric static style={localStyles.cell}>
                        {highscore.points}
                      </DataTable.Cell>

                      <DataTable.Cell style={localStyles.cell}>
                        {name}
                      </DataTable.Cell>

                      <DataTable.Cell style={localStyles.cell}>
                        <Text>{highscore.timeStamp.date}</Text>
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
          </Anim>
        )}
      </SafeAreaView>
    );
  }
}

export default withState(ScoreBoard);
