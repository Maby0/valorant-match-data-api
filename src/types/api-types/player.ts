import { Character } from './character'

export interface Player {
  puuid: string
  name: string
  tag: string
  team: 'red' | 'blue'
  level: number
  character: Character
  currenttier: number
  currenttier_patched: string
  player_card: string
  players_title: string
  party_id: string
  session_playtime: object
  behavior: object
  platform: object
  ability_casts: object
  assets: object
  stats: object
  economy: object
  damage_made: number
  damage_received: number
}
