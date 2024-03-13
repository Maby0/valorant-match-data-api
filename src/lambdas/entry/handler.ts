import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { isRequestVerified } from './is-request-verified'
import { getEnv } from '../../utils/get-env'

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
  console.log('this is event: ', event)

  try {
    const response = await fetch(`${getEnv('INTERNAL_API_URL')}`)
    console.log('this is the response: ', response)
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    isBase64Encoded: false,
    body: JSON.stringify({ type: 1 })
  }
}
