import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { isRequestVerified } from './is-request-verified'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!isRequestVerified(event)) {
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
