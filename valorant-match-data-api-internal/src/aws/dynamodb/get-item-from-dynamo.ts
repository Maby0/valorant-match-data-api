import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { documentClient } from './client'

export const getItemFromDynamo = async <T>(
  tableName: string,
  matchId: string
) => {
  const response = await documentClient.send(
    new GetCommand({
      TableName: tableName,
      Key: { matchId }
    })
  )
  return response
}
