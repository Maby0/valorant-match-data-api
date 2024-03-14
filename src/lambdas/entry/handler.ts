import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { isRequestVerified, validateRequestContent } from './request-validation'
import {
  successfulDiscordResponse,
  unrecognisedParamsDiscordResponse
} from './build-response'
import { sendRequestToInternalApi } from './send-request-to-internal-api'
import { buildEndpointFromSlashCommandParameters } from './util'
import { listOfCommandsAsString } from '../../constants/commands'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!isRequestVerified(event)) {
    return unrecognisedParamsDiscordResponse()
  }
  const parsedDiscordRequest = validateRequestContent(event)
  const internalApiEndpoint = buildEndpointFromSlashCommandParameters(
    parsedDiscordRequest.data.options[0].value
  )
  if (internalApiEndpoint === 'commands') {
    return successfulDiscordResponse(listOfCommandsAsString)
  }

  try {
    const response = await sendRequestToInternalApi(internalApiEndpoint)
    if (response.status !== 200) {
      throw Error(`Internal API response not 200: ${response}`)
    }

    return successfulDiscordResponse(await response.json())
  } catch (error) {
    console.error(error)
    return unrecognisedParamsDiscordResponse()
  }
}
