import { getEnv } from './get-env'

export const sendFollowUpMessage = async (
  applicationId: string,
  interactionToken: string,
  message: string
) => {
  const url = `https://discord.com/api/v8/webhooks/${applicationId}/${interactionToken}/messages/@original`
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bot ${getEnv('BOT_TOKEN')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: message
      })
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error from server: ${errorData.message}`)
    }
    const data = await response.json()
    console.log('Successfully sent follow-up message:', data)
  } catch (error) {
    console.error('Failed to send follow-up message:', error)
  }
}
