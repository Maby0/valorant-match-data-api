import { APIGatewayProxyEvent } from 'aws-lambda'

export const validateRequestContent = (event: APIGatewayProxyEvent) => {
  const discordInteraction = JSON.parse(event.body ?? '{}')
  if (discordInteraction.data.name !== 'valpal') {
    throw Error('Unrecognised base command')
  }
  return discordInteraction
}
