import { Maps, Modes } from 'unofficial-valorant-api'
import { Player } from './player'
import { Team } from './team'

export interface MatchData {
  metadata: {
    map: Maps
    game_version: string
    game_length: number
    game_start: number
    game_start_patched: string
    rounds_played: number
    mode: Modes
  }
  players: {
    all_players: Player[]
    red: Player[]
    blue: Player[]
  }
  teams: {
    red: Team
    blue: Team
  }
  rounds: object[]
  kills: object[]
}
