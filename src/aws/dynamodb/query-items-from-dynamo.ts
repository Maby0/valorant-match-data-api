import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { documentClient } from './client'

export const queryItemsFromDynamo = async <T>(
  tableName: string,
  indexName: string,
  keyConditionExpression: string,
  expressionAttrubuteNames: Record<string, string>,
  expressionAttributeValues: Record<string, unknown>,
  projectionExpression?: string
) => {
  const response = await documentClient.send(
    new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeNames: expressionAttrubuteNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ...(projectionExpression && {
        ProjectionExpression: projectionExpression
      })
    })
  )
  return response
}
