import type { League } from '#/lib/types'
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
