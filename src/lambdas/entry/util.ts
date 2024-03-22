import { COMMANDS, COMMANDS_LIST_FOR_USER } from '../../constants/commands'

export const buildLambdaInvocationRequirementsFromSlashCommand = (
  parameterString: string
) => {
  const paramList = parameterString.split(' ')
  const command = paramList[0].toLowerCase()
  const payload = paramList[1]
  return {
    command,
    payload
  }
}
