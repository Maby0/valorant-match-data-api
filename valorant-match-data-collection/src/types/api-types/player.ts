import { Character } from './character'

export interface AbilityCasts {
  c_cast: number
  q_cast: number
  e_cast: number
  x_cast: number
}

export interface Stats {
  score: number
  kills: number
  deaths: number
  assists: number
  bodyshots: number
  headshots: number
  legshots: number
}

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
  ability_casts: AbilityCasts
  assets: object
  stats: Stats
  economy: object
  damage_made: number
  damage_received: number
}
