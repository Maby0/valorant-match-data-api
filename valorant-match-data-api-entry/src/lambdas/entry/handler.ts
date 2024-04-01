import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { validateRequestContent } from './request-validation'
import {
  deferralDiscordResponse,
  listCommandsDiscordRequestResponse,
  unrecognisedParamsDiscordResponse
} from './build-response'
import { buildLambdaInvocationRequirementsFromSlashCommand } from './util'
import { invokeLambda } from '../../aws/invoke-lambda'
import { mapCommandToLambda } from './map-command-to-lambda'
import { COMMANDS } from '../../constants/commands'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // if (!isRequestVerified(event)) {
  //   return unverifiedDiscordRequestResponse()
  // }
  const parsedDiscordRequest = validateRequestContent(event)
  const { command, payload } =
    buildLambdaInvocationRequirementsFromSlashCommand(
      parsedDiscordRequest.data.options[0].value
    )
  console.log(
    `Received the ${command} command with the following payload: ${payload}`
  )
  if (command === 'commands') {
    return listCommandsDiscordRequestResponse()
  }

  const internalLambdaName = mapCommandToLambda(command as COMMANDS)
  if (!internalLambdaName) return unrecognisedParamsDiscordResponse()

  await invokeLambda(internalLambdaName, {
    applicationId: parsedDiscordRequest.application_id,
    interactionToken: parsedDiscordRequest.token,
    payload
  })
  return deferralDiscordResponse()
}
