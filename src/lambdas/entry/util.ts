export const buildEndpointFromSlashCommandParameters = (
  parameterString: string
) => {
  const paramList = parameterString.split(' ')
  return `${paramList[0]}?map=${paramList[1]}`
}
