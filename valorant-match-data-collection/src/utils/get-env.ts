import { EnvironmentVar } from '../types/environment-var'

export const getEnv = (name: EnvironmentVar['name']) => {
  const env = process.env[name]

  if (env === undefined || env === null)
    throw Error(`Missing environment variable: ${name}`)

  return env
}
