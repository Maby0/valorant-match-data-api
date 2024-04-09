import {
  PLAYER_NAME,
  PLAYER_TAG_LOOKUP,
  TEAM_NAMES_LIST
} from '../../constants/player-names'
import { BLUE, RED } from '../../constants/team-colours'
import { ApiMatchData } from '../../types/api-types/api-match-data'
import { TeamColour } from '../../types/api-types/team'
import { CustomMatchData } from '../../types/custom-types/custom-match-data'
import { OpponentTeamData } from '../../types/custom-types/opponent-team-data'
import { PlayerTeamData } from '../../types/custom-types/player-team-data'

export const playerTagLookup = (playerName: PLAYER_NAME) => {
  return PLAYER_TAG_LOOKUP[playerName]
}

export const removeUnnecessaryProperties = (matchData: ApiMatchData) => {
  delete matchData.rounds
  delete matchData.kills
}

export const filterOutNonFiveStackMatches = (matchDataList: ApiMatchData[]) => {
  return matchDataList.filter((singleMatchData) => {
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

export const addPlayerTeamColourProperty = (
  matchData: ApiMatchData,
  playerName: string
) => {
  for (const player of matchData.players.all_players) {
    if (player.name === playerName) {
      matchData.metadata.CUSTOM_player_team_colour =
        player.team.toLowerCase() as TeamColour
      return
    }
  }
}

export const addOpponentTeamColourProperty = (matchData: ApiMatchData) => {
  matchData.metadata.CUSTOM_opponent_team_colour =
    matchData.metadata.CUSTOM_player_team_colour === RED ? BLUE : RED
}

export const addPlayerWonProperty = (matchData: ApiMatchData) => {
  matchData.metadata.CUSTOM_player_won =
    (matchData.teams.red.has_won &&
      matchData.metadata.CUSTOM_player_team_colour === RED) ||
    (matchData.teams.blue.has_won &&
      matchData.metadata.CUSTOM_player_team_colour === BLUE)
}

export const addPlayerTeamDataProperty = (matchData: ApiMatchData) => {
  const playerTeamData: PlayerTeamData[] = []
  matchData.players[matchData.metadata.CUSTOM_player_team_colour].forEach(
    (player) => {
      playerTeamData.push({
        playerName: player.name,
        playerCharacter: player.character,
        playerTier: player.currenttier,
        playerStats: {
          kills: player.stats.kills,
          deaths: player.stats.deaths,
          assists: player.stats.assists,
          abilityCasts: {
            cCast: player.ability_casts.c_cast,
            qCast: player.ability_casts.q_cast,
            eCast: player.ability_casts.e_cast,
            xCast: player.ability_casts.x_cast
          },
          headshots: player.stats.headshots,
          bodyshots: player.stats.bodyshots,
          legshots: player.stats.legshots
        }
      })
    }
  )
  matchData.players.CUSTOM_player_team_data = playerTeamData
}

export const addOpponentTeamDataProperty = (matchData: ApiMatchData) => {
  const opponentTeamData: OpponentTeamData[] = []
  matchData.players[matchData.metadata.CUSTOM_opponent_team_colour].forEach(
    (opponent) => {
      opponentTeamData.push({
        opponentCharacter: opponent.character,
        opponentTier: opponent.currenttier,
        opponentStats: {
          kills: opponent.stats.kills,
          deaths: opponent.stats.deaths,
          assists: opponent.stats.assists,
          abilityCasts: {
            cCast: opponent.ability_casts.c_cast,
            qCast: opponent.ability_casts.q_cast,
            eCast: opponent.ability_casts.e_cast,
            xCast: opponent.ability_casts.x_cast
          },
          headshots: opponent.stats.headshots,
          bodyshots: opponent.stats.bodyshots,
          legshots: opponent.stats.legshots
        }
      })
    }
  )
  matchData.players.CUSTOM_opponent_team_data = opponentTeamData
}

export const mapApiMatchDataToCustomMatchData = (
  apiMatchData: ApiMatchData
): CustomMatchData => ({
  matchId: apiMatchData.metadata.matchid,
  seasonId: apiMatchData.metadata.season_id,
  map: apiMatchData.metadata.map,
  gameStart: apiMatchData.metadata.game_start,
  roundsPlayed: apiMatchData.metadata.rounds_played,
  playerHasWon: apiMatchData.metadata.CUSTOM_player_won,
  playerRoundsWon:
    apiMatchData.teams[apiMatchData.metadata.CUSTOM_player_team_colour]
      .rounds_won,
  playerRoundsLost:
    apiMatchData.teams[apiMatchData.metadata.CUSTOM_player_team_colour]
      .rounds_lost,
  playerTeamData: apiMatchData.players.CUSTOM_player_team_data,
  opponentTeamData: apiMatchData.players.CUSTOM_opponent_team_data
})
