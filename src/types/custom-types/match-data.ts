import { Map } from '../api-types/map'
import { OpponentTeamData } from './opponent-team-data'
import { PlayerTeamData } from './player-team-data'

export interface MatchData {
  matchId: string
  seasonId: string
  map: Map
  gameStart: number
  roundsPlayed: number
  playerHasWon: boolean
  playerRoundsWon: number
  playerRoundsLost: number
  playerTeamData: PlayerTeamData[]
  opponentTeamData: OpponentTeamData[]
}
