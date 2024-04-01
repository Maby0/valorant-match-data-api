import { queryItemsFromDynamo } from '../../aws/dynamodb/query-items-from-dynamo'
import { getEnv } from '../../util/get-env'
import { toTitleCase } from '../../util/to-title-case'
import { calculateWinratePercentage } from './calculate-winrate'
import { MapWinrateData } from '../../types/query-types/major/map-winrate-data'
import { formatPercentageToString } from '../../util/format-percentage-to-string'
import { LambdaInvocationParams } from '../../types/lambda-invocation-params'
import { sendFollowUpMessage } from '../../util/send-follow-up-message'
import { MAP_GAME_START_GSI } from '../../constants'

export const handler = async (event: LambdaInvocationParams) => {
  const mapToQuery = toTitleCase(event.payload)
  console.log('Map to query winrate: ', mapToQuery)
  try {
    const mapSpecificData = await queryItemsFromDynamo(
      getEnv('VALORANT_MATCH_DATA_TABLE'),
      MAP_GAME_START_GSI,
      '#mapAttribute = :map',
      { '#mapAttribute': 'map' },
      { ':map': mapToQuery },
      'matchId, #mapAttribute, playerHasWon'
    )
    const mapWinrateData = mapSpecificData.Items as MapWinrateData[]

    if (!mapWinrateData.length) {
      return await sendFollowUpMessage(
        event.applicationId,
        event.interactionToken,
        'No winrate data found for map: ' + mapToQuery
      )
    }

    const mapWinrate = calculateWinratePercentage(mapWinrateData)
    return await sendFollowUpMessage(
      event.applicationId,
      event.interactionToken,
      `Winrate on ${mapToQuery} is ${formatPercentageToString(mapWinrate)}`
    )
  } catch (error) {
    console.error('An error occurred: ', error)
    return sendFollowUpMessage(
      event.applicationId,
      event.interactionToken,
      'Something terrible probably happened internally soz'
    )
  }
}
