import HenrikDevValorantApi from 'unofficial-valorant-api'
import {
  MABON_NAME,
  MABON_TAG,
  TEAM_INFO,
  TEAM_NAMES_LIST
} from './player-names'
import { MatchData } from '../../types/match-data'

export const handler = async () => {
  const valorantApi = new HenrikDevValorantApi()
  const responseData = await valorantApi.getMatches({
    region: 'eu',
    name: MABON_NAME,
    tag: MABON_TAG,
    filter: 'competitive',
    size: 10
  })

  const matchData = responseData.data as MatchData[]
  const matchDataFiveStackOnly = filterOutNonFiveStackMatches(matchData)
  // create the object with the necessary data and put to table
}

const filterOutNonFiveStackMatches = (matchData: MatchData[]) => {
  return matchData.filter((singleMatchData) => {
    return (
      singleMatchData.players.red.every((player) =>
        TEAM_NAMES_LIST.includes(player.name)
      ) ||
      singleMatchData.players.blue.every((player) =>
        TEAM_NAMES_LIST.includes(player.name)
      )
    )
  })
}
