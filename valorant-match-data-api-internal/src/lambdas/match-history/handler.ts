import { toTitleCase } from '../../util/to-title-case'
import { LambdaInvocationParams } from '../../types/lambda-invocation-params'
import { queryItemsFromDynamo } from '../../aws/dynamodb/query-items-from-dynamo'
import { getEnv } from '../../util/get-env'
import { MatchHistoryData } from '../../types/query-types/major/match-history-data'
import { sendFollowUpMessage } from '../../util/send-follow-up-message'
import { formatMatchHistory } from './format-match-history'
import { MAP_GAME_START_GSI } from '../../constants'

export const handler = async (event: LambdaInvocationParams) => {
  const mapToQuery = toTitleCase(event.payload)
  console.log('Map to query match history: ', mapToQuery)
  try {
    const mapSpecificData = await queryItemsFromDynamo(
      getEnv('VALORANT_MATCH_DATA_TABLE'),
      MAP_GAME_START_GSI,
      '#mapAttribute = :map',
      { '#mapAttribute': 'map' },
      { ':map': mapToQuery },
      'gameStart, #mapAttribute, playerHasWon, playerRoundsWon, playerRoundsLost, playerTeamData, opponentTeamData'
    )
    const mapMatchHistoryData = mapSpecificData.Items as MatchHistoryData[]

    if (!mapMatchHistoryData.length) {
      return await sendFollowUpMessage(
        event.applicationId,
        event.interactionToken,
        'No match history data found for map: ' + mapToQuery
      )
    }

    const formattedMatchHistory = formatMatchHistory(
      mapToQuery,
      mapMatchHistoryData
    )
    return await sendFollowUpMessage(
      event.applicationId,
      event.interactionToken,
      formattedMatchHistory
    )
  } catch (error) {
    console.error('An error occurred: ', error)
    return sendFollowUpMessage(
      event.applicationId,
      event.interactionToken,
      'Something went wrong internally soz'
    )
  }
}
