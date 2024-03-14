export type SlashCommandBase = 'valpal'

export interface DiscordInteraction {
  app_permissions: string
  application_id: string
  channel: {
    flags: number
    guild_id: string
    id: string
    last_message_id: string
    name: string
    nsfw: boolean
    parent_id: string
    permissions: string
    position: number
    rate_limit_per_user: number
    topic: null
    type: number
  }
  channel_id: string
  data: {
    id: string
    name: SlashCommandBase
    options: {
      name: string
      type: number
      value: string
    }[]
    type: number
  }
  entitlement_sku_ids: []
  entitlements: []
  guild: { features: []; id: string; locale: string }
  guild_id: string
  guild_locale: string
  id: string
  locale: string
  member: {
    avatar: null
    communication_disabled_until: null
    deaf: boolean
    flags: number
    joined_at: string
    mute: boolean
    nick: null
    pending: boolean
    permissions: string
    premium_since: null
    roles: []
    unusual_dm_activity_until: null
    user: {
      avatar: string
      avatar_decoration_data: null
      discriminator: string
      global_name: string
      id: string
      public_flags: number
      username: string
    }
  }
  token: string
  type: number
  version: number
}
