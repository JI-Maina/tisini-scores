import { createServerFn } from '@tanstack/react-start'
import type { PaginatedResponse, TopPlayer, TopTeam } from '#/lib/types'

export const getTeamStatsFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (data: { leagueId: number; seasonId: number; eventId: number }) => data,
  )
  .handler(async ({ data }) => {
    const apiUrl = process.env.API_SCORES_URL
    const apiKey = process.env.API_KEY
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    if (apiKey) {
      headers.set('x-api-key', apiKey)
    }

    const res = await fetch(
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/events/${data.eventId}/top-teams`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      const detail = await res.text()
      throw new Error(
        `Failed to fetch team stats (${res.status} ${res.statusText})${detail ? `: ${detail}` : ''}`,
      )
    }

    const stats = (await res.json()) as TopTeam[]
    return stats
  })

export const getPlayerStatsFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (data: { leagueId: number; seasonId: number; eventId: number }) => data,
  )
  .handler(async ({ data }) => {
    const apiUrl = process.env.API_SCORES_URL
    const apiKey = process.env.API_KEY
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    if (apiKey) {
      headers.set('x-api-key', apiKey)
    }

    const res = await fetch(
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/events/${data.eventId}/top-performers`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      const detail = await res.text()
      throw new Error(
        `Failed to fetch player stats (${res.status} ${res.statusText})${detail ? `: ${detail}` : ''}`,
      )
    }

    const stats = (await res.json()) as PaginatedResponse<TopPlayer>
    return stats
  })
