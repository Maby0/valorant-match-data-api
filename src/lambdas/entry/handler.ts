import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { isRequestVerified, validateRequestContent } from './request-validation'
import {
  deferralDiscordResponse,
  listCommandsDiscordRequestResponse,
  unverifiedDiscordRequestResponse
} from './build-response'
import { buildLambdaInvocationRequirementsFromSlashCommand } from './util'
import { invokeLambda } from '../../aws/invoke-lambda'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!isRequestVerified(event)) {
    return unverifiedDiscordRequestResponse()
  }
  const parsedDiscordRequest = validateRequestContent(event)
  const { internalLambdaName, payload } =
    buildLambdaInvocationRequirementsFromSlashCommand(
      parsedDiscordRequest.data.options[0].value
    )
  console.log(
    'Constructed following lambda name from slash command params: ',
    internalLambdaName,
    'With following payload: ',
    payload
  )
  if (internalLambdaName === 'commands') {
    return listCommandsDiscordRequestResponse()
  }

  invokeLambda(internalLambdaName, {
    applicationId: parsedDiscordRequest.application_id,
    interactionToken: parsedDiscordRequest.token,
    payload
  })
  return deferralDiscordResponse()
}
