import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import nacl from 'tweetnacl'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const PUBLIC_KEY =
    '65ea859f49aea6867ff25fd9f022f2541a83bfb56f69f78f1f163511e3803877'

  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp']
  const body = event.body

  if (!signature || !timestamp || !body) {
    throw Error('one of the required request bits was missing')
  }

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  )

  if (!isVerified) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      isBase64Encoded: false,
      body: JSON.stringify({ message: 'invalid request signature' })
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    isBase64Encoded: false,
    body: JSON.stringify({ type: 1 })
  }
}
