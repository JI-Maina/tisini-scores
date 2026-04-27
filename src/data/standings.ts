import type { LeagueStandings } from '#/lib/types'
import { createServerFn } from '@tanstack/react-start'

type StandingsInput = {
  leagueId: number
  seasonId: number
}

export const getStandingsFn = createServerFn({ method: 'GET' })
  .inputValidator((data: StandingsInput) => data)
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/standings`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
      // const body = await readErrorBody(response)
      // console.error("Failed to fetch standings", body)
      // throw new Error(`${response.status}: ${messageFromApiErrorBody(body)}`)
    }

    const standings = (await res.json()) as LeagueStandings
    return standings
  })
