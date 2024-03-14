export const buildDiscordResponse = (
  statusCode: number,
  internalApiResult: string
) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  isBase64Encoded: false,
  body: JSON.stringify({ type: 4, data: { content: internalApiResult } })
})

export const unrecognisedParamsDiscordResponse = () => ({
  ...buildDiscordResponse(
    200,
    'Unrecognised parameters. Use "/valpal commands" to view possible command options.'
  )
})

export const unverifiedDiscordResponse = () => ({
  ...buildDiscordResponse(401, 'invalid request signature')
})

export const successfulDiscordResponse = (internalApiResult: string) => ({
  ...buildDiscordResponse(200, internalApiResult)
})
