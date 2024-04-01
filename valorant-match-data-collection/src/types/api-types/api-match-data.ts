import { Player } from './player'
import { Team, TeamColour } from './team'
import { Map } from './map'
import { Mode } from './mode'
import { PlayerTeamData } from '../custom-types/player-team-data'
import { OpponentTeamData } from '../custom-types/opponent-team-data'

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
    CUSTOM_player_team_colour: TeamColour
    CUSTOM_opponent_team_colour: TeamColour
    CUSTOM_player_won: boolean
  }
  players: {
    all_players: Player[]
    red: Player[]
    blue: Player[]
    CUSTOM_player_team_data: PlayerTeamData[]
    CUSTOM_opponent_team_data: OpponentTeamData[]
  }
  teams: {
    red: Team
    blue: Team
  }
  rounds?: object[]
  kills?: object[]
}
