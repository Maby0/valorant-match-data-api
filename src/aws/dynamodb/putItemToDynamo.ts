import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { documentClient } from './client'

export const putItemToDynamo = async <T>(tableName: string, data: T) => {
  const response = await documentClient.send(
    new PutCommand({
      TableName: tableName,
      Item: data as Record<string, unknown>
    })
  )
  return response
}
