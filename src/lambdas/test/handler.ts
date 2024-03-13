import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log('received event: ', event)
  return {
    statusCode: 200,
    body: JSON.stringify('yo')
  }
}
