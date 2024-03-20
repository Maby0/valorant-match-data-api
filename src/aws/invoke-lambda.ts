import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'
import { fromUtf8 } from '@aws-sdk/util-utf8-node'

export const invokeLambda = (
  functionName: string,
  payload: Record<string, unknown>
) => {
  const payloadBytes = fromUtf8(JSON.stringify(payload))

  const command = new InvokeCommand({
    FunctionName: functionName,
    InvocationType: 'Event',
    Payload: payloadBytes
  })
  return new LambdaClient().send(command)
}
