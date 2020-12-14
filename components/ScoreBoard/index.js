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
  cell: { justifyContent: 'flex-start', color: '#444' },
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

    const { clearScore, prepareGame, setGameState } = gameSetters;

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
            <Section flex={1} fullH justify="flex-start">
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
            <ScrollView
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: '#eee',
              }}
            >
              <View style={theme.section}>
                <Text style={theme.title}>OFFICIAL SCOREBOARD</Text>
              </View>

              <Section style={theme.section}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title numeric style={localStyles.title}>
                      <Text>Points</Text>
                    </DataTable.Title>

                    <DataTable.Title style={localStyles.title}>
                      <Text>Typer</Text>
                    </DataTable.Title>

                    <DataTable.Title style={localStyles.title}>
                      <Text>When</Text>
                    </DataTable.Title>
                  </DataTable.Header>

                  {scoreboard.map(({ uid, name, highscore }, nth) => {
                    const isAuth = uid === authUser.uid;

                    return (
                      <DataTable.Row key={nth}>
                        <DataTable.Cell numeric static style={localStyles.cell}>
                          <Text color={isAuth ? 'blue' : '#444'} weight="700">
                            {highscore.points}
                          </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={localStyles.cell}>
                          <Text color={isAuth ? 'blue' : '#444'}>{name}</Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={localStyles.cell}>
                          <Text color={isAuth ? 'blue' : '#444'}>
                            {highscore.timeStamp.date}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}

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
              </Section>

              {latestScore && !qualified && (
                <Section>
                  <Text style={[theme.subtitle, { textAlign: 'center' }]}>
                    Your latest score didn't qualify
                  </Text>

                  <Status />
                </Section>
              )}

              <Section flex={1} justifyContent="flex-end">
                <Btn
                  h={50}
                  outline
                  content={material.title ? 'Pick another text' : 'Pick a text'}
                  fontSize={20}
                  onPress={() =>
                    setGameState({ pushNav: 'Game', material: {} })
                  }
                  bgImg="BtnUnderlay3"
                />
                {material.title && (
                  <Btn
                    outline
                    content="Play"
                    onPress={prepareGame}
                    bgImg="BtnUnderlay1"
                  />
                )}
              </Section>

              {/* <Section>
                <Btn
                  w={200}
                  h={50}
                  fontSize={12}
                  content="clear scores"
                  onPress={clearScore}
                />
              </Section> */}
            </ScrollView>
          </Anim>
        )}
      </SafeAreaView>
    );
  }
}

export default withState(ScoreBoard);
