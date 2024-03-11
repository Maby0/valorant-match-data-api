import { Character } from '../api-types/character'
import { IndividualMatchStats } from './individual-match-stats'

export interface PlayerTeamData {
  playerName: string
  playerCharacter: Character
  playerTier: number
  stats: IndividualMatchStats
}
