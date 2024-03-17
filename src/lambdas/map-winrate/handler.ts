import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { queryItemsFromDynamo } from '../../aws/dynamodb/query-items-from-dynamo'
import { getEnv } from '../../util/get-env'
import { toTitleCase } from '../../util/to-title-case'
import { calculateWinratePercentage } from './calculate-winrate'
import { MapWinrateData } from '../../util/map-winrate-data'
import { formatPercentageToString } from '../../util/format-percentage-to-string'

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const mapToQuery = toTitleCase(event.queryStringParameters?.map ?? '')
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
    return {
      statusCode: 200,
      body: JSON.stringify('No winrate data found for map: ' + mapToQuery)
    }
  }

  const mapWinrate = calculateWinratePercentage(mapWinrateData)
  return {
    statusCode: 200,
    body: JSON.stringify(
      `Winrate on ${mapToQuery} is ${formatPercentageToString(mapWinrate)}`
    )
  }
}
