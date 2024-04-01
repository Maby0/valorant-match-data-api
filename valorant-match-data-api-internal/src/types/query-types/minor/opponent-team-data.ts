import { Character } from './character'
import { IndividualMatchStats } from './individual-match-stats'

export interface OpponentTeamData {
  opponentCharacter: Character
  opponentTier: number
  opponentStats: IndividualMatchStats
}
