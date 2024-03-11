import HenrikDevValorantApi from 'unofficial-valorant-api'
import { MABON_NAME, MABON_TAG } from '../../constants/player-names'
import { ApiMatchData } from '../../types/api-types/api-match-data'
import {
  filterOutNonFiveStackMatches,
  addPlayerTeamProperty,
  addPlayerWonProperty
} from './util'

export const handler = async () => {
  const queryingPlayer = { name: MABON_NAME, tag: MABON_TAG }
  const valorantApi = new HenrikDevValorantApi()
  const responseData = await valorantApi.getMatches({
    region: 'eu',
    name: queryingPlayer.name,
    tag: queryingPlayer.tag,
    filter: 'competitive',
    size: 10
  })

  const matchData = responseData.data as ApiMatchData[]
  const matchDataFiveStackOnly = filterOutNonFiveStackMatches(matchData)
  addPlayerTeamProperty(matchDataFiveStackOnly, queryingPlayer.name)
  addPlayerWonProperty(matchDataFiveStackOnly)
  // create the object with the necessary data and put to table
  console.log(matchDataFiveStackOnly[0])
}

handler()
