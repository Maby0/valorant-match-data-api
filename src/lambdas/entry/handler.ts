import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { isRequestVerified, validateRequestContent } from './request-validation'
import {
  internalApiErrorDiscordResponse,
  successfulDiscordResponse,
  unrecognisedParamsDiscordResponse,
  unverifiedDiscordRequestResponse
} from './build-response'
import { sendRequestToInternalApi } from './send-request-to-internal-api'
import { buildEndpointFromSlashCommandParameters } from './util'
import { listOfCommandsAsString } from '../../constants/commands'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!isRequestVerified(event)) {
    return unverifiedDiscordRequestResponse()
  }
  const parsedDiscordRequest = validateRequestContent(event)
  const internalApiEndpoint = buildEndpointFromSlashCommandParameters(
    parsedDiscordRequest.data.options[0].value
  )
  console.log(
    'Constructed following endpoint from slash command params: ',
    internalApiEndpoint
  )
  if (internalApiEndpoint === 'commands') {
    return successfulDiscordResponse(listOfCommandsAsString)
  }

  try {
    const response = await sendRequestToInternalApi(internalApiEndpoint)
    if (response.status !== 200) {
      throw Error(`Internal API response not 200`, { cause: response.status })
    }
    const internalApiResult = await response.json()
    console.log('Returning response: ', internalApiResult)
    return successfulDiscordResponse(internalApiResult)
  } catch (error) {
    console.error(error)

    if ((error as Error).cause === 403) {
      return unrecognisedParamsDiscordResponse()
    }
    return internalApiErrorDiscordResponse()
  }
}
