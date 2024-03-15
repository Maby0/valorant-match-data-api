export const buildEndpointFromSlashCommandParameters = (
  parameterString: string
) => {
  const paramList = parameterString.split(' ')
  return paramList[0] + (paramList[1] ? `?map=${paramList[1]}` : '')
}
