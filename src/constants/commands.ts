export enum COMMANDS {
  MAP_WINRATE = 'map-winrate',
  MATCH_HISTORY = 'match-history'
}

export const COMMANDS_LIST_FOR_USER = [
  `${COMMANDS.MAP_WINRATE} <map-name>`,
  `${COMMANDS.MATCH_HISTORY} <map-name>`
]
