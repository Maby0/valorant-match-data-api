export const buildEndpointFromSlashCommandParameters = (
  parameterString: string
) => {
  return parameterString.replace(' ', '/')
}
