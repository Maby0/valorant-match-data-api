import { COMMANDS_LIST_FOR_USER } from '../../constants/commands'

export const buildDiscordResponse = (responseSpecifics: {
  statusCode: number
  type: number
  responseContent?: string
}) => ({
  statusCode: responseSpecifics.statusCode,
  headers: { 'Content-Type': 'application/json' },
  isBase64Encoded: false,
  body: JSON.stringify({
    type: responseSpecifics.type,
    ...(responseSpecifics.responseContent && {
      data: { content: responseSpecifics.responseContent }
    })
  })
})

export const unrecognisedParamsDiscordResponse = () => ({
  ...buildDiscordResponse({
    statusCode: 200,
    type: 4,
    responseContent:
      'Unrecognised parameters. Use "/valpal commands" to view possible command options.'
  })
})

export const unverifiedDiscordRequestResponse = () => ({
  ...buildDiscordResponse({
    statusCode: 401,
    type: 4,
    responseContent: 'invalid request signature'
  })
})

export const listCommandsDiscordRequestResponse = () => ({
  ...buildDiscordResponse({
    statusCode: 200,
    type: 4,
    responseContent: `These are the current working commands:\n${COMMANDS_LIST_FOR_USER.join('\n')}`
  })
})

export const deferralDiscordResponse = () => ({
  ...buildDiscordResponse({
    statusCode: 200,
    type: 5
  })
})
