import { APIGatewayProxyEvent } from 'aws-lambda'
import nacl from 'tweetnacl'
import { DiscordInteraction } from '../../types/discord-interaction'

export const isRequestVerified = (event: APIGatewayProxyEvent): boolean => {
  const PUBLIC_KEY =
    '65ea859f49aea6867ff25fd9f022f2541a83bfb56f69f78f1f163511e3803877'

  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp']
  const body = event.body

  if (!signature || !timestamp || !body) {
    throw Error('one of the required request bits was missing')
  }

  return nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  )
}

export const validateRequestContent = (event: APIGatewayProxyEvent) => {
  const discordInteraction = JSON.parse(
    event.body ?? '{}'
  ) as DiscordInteraction
  if (discordInteraction.data.name !== 'valpal') {
    throw Error('Unrecognised base command')
  }
  return discordInteraction
}
