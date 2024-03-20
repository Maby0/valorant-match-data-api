import { getEnv } from '../../utils/get-env'

export const buildLambdaInvocationRequirementsFromSlashCommand = (
  parameterString: string
) => {
  const paramList = parameterString.split(' ')
  return {
    internalLambdaName: `${getEnv('INTERNAL_AWS_STACK_NAME')}-${paramList[0]}-function`,
    payload: paramList[1]
  }
}
