import { TEAM_NAMES_LIST } from '../../constants/player-names'
import { ApiMatchData } from '../../types/api-types/api-match-data'
import { TeamColour } from '../../types/api-types/team'
import { CustomMatchData } from '../../types/custom-types/custom-match-data'

export const filterOutNonFiveStackMatches = (matchData: ApiMatchData[]) => {
  return matchData.filter((singleMatchData) => {
    return (
      singleMatchData.players.red.every((player) =>
        TEAM_NAMES_LIST.includes(player.name)
      ) ||
      singleMatchData.players.blue.every((player) =>
        TEAM_NAMES_LIST.includes(player.name)
      )
    )
  })
}

export const addPlayerTeamProperty = (
  matchDataList: ApiMatchData[],
  playerName: string
) => {
  matchDataList.forEach((matchData) => {
    for (const player of matchData.players.all_players) {
      if (player.name === playerName) {
        matchData.metadata.CUSTOM_team_player_is_on =
          player.team.toLowerCase() as TeamColour
        return
      }
    }
  })
}

export const addPlayerWonProperty = (matchDataList: ApiMatchData[]) => {
  matchDataList.forEach((matchData) => {
    matchData.metadata.CUSTOM_player_won =
      (matchData.teams.red.has_won &&
        matchData.metadata.CUSTOM_team_player_is_on === 'red') ||
      (matchData.teams.blue.has_won &&
        matchData.metadata.CUSTOM_team_player_is_on === 'blue')
  })
}

export const mapApiMatchDataToCustomMatchData = (
  apiDataMatchData: ApiMatchData
): CustomMatchData => ({
  matchId: apiDataMatchData.metadata.matchid,
  seasonId: apiDataMatchData.metadata.season_id,
  map: apiDataMatchData.metadata.map,
  gameStart: apiDataMatchData.metadata.game_start,
  roundsPlayed: apiDataMatchData.metadata.rounds_played,
  playerHasWon: apiDataMatchData.metadata.CUSTOM_player_won,
  playerRoundsWon:
    apiDataMatchData.teams[apiDataMatchData.metadata.CUSTOM_team_player_is_on]
      .rounds_won,
  playerRoundsLost:
    apiDataMatchData.teams[apiDataMatchData.metadata.CUSTOM_team_player_is_on]
      .rounds_lost,
  playerTeamData: [],
  opponentTeamData: []
})
