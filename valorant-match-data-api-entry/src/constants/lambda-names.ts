import { getEnv } from '../utils/get-env'
import { COMMANDS } from './commands'

export const lambdaNames = {
  [COMMANDS.MAP_WINRATE]: `${getEnv('INTERNAL_AWS_STACK_NAME')}-${COMMANDS.MAP_WINRATE}-function`,
  [COMMANDS.MATCH_HISTORY]: `${getEnv('INTERNAL_AWS_STACK_NAME')}-${COMMANDS.MATCH_HISTORY}-function`
}
