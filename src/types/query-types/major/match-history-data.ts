import { Map } from '../minor/map'
import { OpponentTeamData } from '../minor/opponent-team-data'
import { PlayerTeamData } from '../minor/player-team-data'

export interface MatchHistoryData {
  map: Map
  playerHasWon: boolean
  playerRoundsWon: number
  playerRoundsLost: number
  playerTeamData: PlayerTeamData[]
  opponentTeamData: OpponentTeamData[]
  gameStart: number
}
