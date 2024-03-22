import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'

export const invokeLambda = (
  functionName: string,
  payload: Record<string, unknown>
) => {
  const command = new InvokeCommand({
    FunctionName: functionName,
    InvocationType: 'Event',
    Payload: JSON.stringify(payload)
  })
  return new LambdaClient().send(command)
}
