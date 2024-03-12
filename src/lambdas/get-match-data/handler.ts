import HenrikDevValorantApi from 'unofficial-valorant-api'
import { MABON_NAME, MABON_TAG } from '../../constants/player-names'
import { ApiMatchData } from '../../types/api-types/api-match-data'
import {
  filterOutNonFiveStackMatches,
  addPlayerTeamColourProperty,
  addPlayerWonProperty,
  removeUnnecessaryProperties,
  addPlayerTeamDataProperty,
  addOpponentTeamDataProperty,
  addOpponentTeamColourProperty,
  mapApiMatchDataToCustomMatchData
} from './util'
import { putItemToDynamo } from '../../aws/dynamodb/putItemToDynamo'
import { getEnv } from '../../utils/get-env'

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
  console.log('Match data obtained - beginning mapping and filtering process')
  const matchDataFiveStackOnly = filterOutNonFiveStackMatches(matchData)

  const customMatchDataList = matchDataFiveStackOnly.map((matchData) => {
    removeUnnecessaryProperties(matchData)
    addPlayerTeamColourProperty(matchData, queryingPlayer.name)
    addOpponentTeamColourProperty(matchData)
    addPlayerWonProperty(matchData)
    addPlayerTeamDataProperty(matchData)
    addOpponentTeamDataProperty(matchData)

    return mapApiMatchDataToCustomMatchData(matchData)
  })

  console.log('Match data mapped to custom type - sending to DB')
  await Promise.all(
    customMatchDataList.map((customMatchData) => {
      return putItemToDynamo(
        getEnv('VALORANT_MATCH_DATA_TABLE'),
        customMatchData
      )
    })
  )
  console.log('Match data successfully put to DB')
}
