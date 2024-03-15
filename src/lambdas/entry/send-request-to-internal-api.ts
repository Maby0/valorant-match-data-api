import { getEnv } from '../../utils/get-env'

export const sendRequestToInternalApi = async (endpoint: string) => {
  return await fetch(`${getEnv('INTERNAL_API_BASE_URL')}${endpoint}`)
}
