import { queryItemsFromDynamo } from '../../aws/dynamodb/query-items-from-dynamo'
import { getEnv } from '../../util/get-env'
import { toTitleCase } from '../../util/to-title-case'
import { calculateWinratePercentage } from './calculate-winrate'
import { MapWinrateData } from '../../util/map-winrate-data'
import { formatPercentageToString } from '../../util/format-percentage-to-string'
import { LambdaInvocationParams } from '../../types/lambda-invocation-params'
import { sendFollowUpMessage } from '../../util/send-follow-up-message'

export const handler = async (event: LambdaInvocationParams) => {
  console.log('im an invoked event: ', event)
  const mapToQuery = toTitleCase(event.payload)
  console.log('Map to query winrate: ', mapToQuery)
  const mapSpecificData = await queryItemsFromDynamo(
    getEnv('VALORANT_MATCH_DATA_TABLE'),
    'map',
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
}
