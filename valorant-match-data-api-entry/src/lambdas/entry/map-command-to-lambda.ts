import { COMMANDS } from '../../constants/commands'
import { lambdaNames } from '../../constants/lambda-names'

export const mapCommandToLambda = (command: COMMANDS) => {
  return lambdaNames[command]
}
