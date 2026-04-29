import { createServerFn } from '@tanstack/react-start'
import type { Team } from '#/lib/types'

type TeamsInput = {
  leagueId: number
  seasonId: number
}

export const getTeamsFn = createServerFn({ method: 'GET' })
  .inputValidator((data: TeamsInput) => data)
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/teams`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
    }

    const teams = (await res.json()) as Team[]
    return teams
  })
