import { Character } from './character'
import { IndividualMatchStats } from './individual-match-stats'

export interface PlayerTeamData {
  playerName: string
  playerCharacter: Character
  playerTier: number
  playerStats: IndividualMatchStats
}
