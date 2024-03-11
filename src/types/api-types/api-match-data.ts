import { Player } from './player'
import { Team, TeamColour } from './team'
import { Map } from './map'
import { Mode } from './mode'

export interface ApiMatchData {
  metadata: {
    map: Map
    game_version: string
    game_length: number
    game_start: number
    game_start_patched: string
    rounds_played: number
    mode: Mode
    mode_id: string
    queue: string
    season_id: string
    platform: string
    matchid: string
    premier_info: {}
    region: string
    cluster: string
    CUSTOM_team_player_is_on: TeamColour
    CUSTOM_player_won: boolean
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
