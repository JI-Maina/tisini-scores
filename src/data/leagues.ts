import type { League, Season } from '#/lib/types'
import { createServerFn } from '@tanstack/react-start'

export const getLeaguesFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const apiUrl = process.env.API_SCORES_URL
    const apiKey = process.env.API_KEY
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    if (apiKey) {
      headers.set('x-api-key', apiKey)
    }

    const res = await fetch(`${apiUrl}/competitions`, {
      method: 'GET',
      headers,
    })

    if (!res.ok) {
      console.log('error')
      // const body = await readErrorBody(response)
      // console.error("Failed to fetch leagues", body)
      // throw new Error(`${response.status}: ${messageFromApiErrorBody(body)}`)
    }

    const leagues = (await res.json()) as League[]
    return leagues
  },
)

type SeasonsInput = {
  leagueId: number
}

export const getSeasonsFn = createServerFn({ method: 'GET' })
  .inputValidator((data: SeasonsInput) => data)
  .handler(async ({ data }) => {
    const apiUrl = process.env.API_SCORES_URL
    const apiKey = process.env.API_KEY
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    if (apiKey) {
      headers.set('x-api-key', apiKey)
    }

    const res = await fetch(`${apiUrl}/competitions/${data.leagueId}/seasons`, {
      method: 'GET',
      headers,
    })

    if (!res.ok) {
      console.log('error')
    }

    return (await res.json()) as Season[]
  })

export function pickDefaultSeasonId(seasons: Season[]): number | null {
  if (!seasons.length) return null

  const current = seasons.find(
    (s) => s.current === true || s.current === 1 || s.status === 1,
  )
  if (current?.id) return current.id

  const byDate = [...seasons].sort((a, b) => {
    const ad = a.date_to ? Date.parse(a.date_to) : 0
    const bd = b.date_to ? Date.parse(b.date_to) : 0
    return bd - ad
  })
  if (byDate[0]?.id) return byDate[0].id

  return seasons[0]?.id ?? null
}
