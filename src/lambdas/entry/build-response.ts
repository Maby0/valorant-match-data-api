export const buildDiscordResponse = (
  internalApiResult: string,
  statusCode?: number
) => ({
  statusCode: statusCode ?? 200,
  headers: { 'Content-Type': 'application/json' },
  isBase64Encoded: false,
  body: JSON.stringify({ type: 4, data: { content: internalApiResult } })
})

export const unrecognisedParamsDiscordResponse = () => ({
  ...buildDiscordResponse(
    'Unrecognised parameters. Use "/valpal commands" to view possible command options.'
  )
})

export const unverifiedDiscordRequestResponse = () => ({
  ...buildDiscordResponse('invalid request signature', 401)
})

export const internalApiErrorDiscordResponse = () => ({
  ...buildDiscordResponse('something went wrong internally soz')
})

export const successfulDiscordResponse = (internalApiResult: string) => ({
  ...buildDiscordResponse(internalApiResult)
})
