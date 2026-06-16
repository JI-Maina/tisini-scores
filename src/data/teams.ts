import { createServerFn } from '@tanstack/react-start'
import type {
  FixtureH2H,
  RecentFixture,
  Team,
  TeamDetails,
  TeamFixtures,
  TeamPlayer,
  UpcomingFixture,
} from '#/lib/types'

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

export const getTeamFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (data: { leagueId: number; seasonId: number; teamId: number }) => data,
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/teams/${data.teamId}`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
    }

    const team = (await res.json()) as TeamDetails
    return team
  })

export const getRecentFixtureFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (data: { leagueId: number; seasonId: number; teamId: number }) => data,
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/teams/${data.teamId}/last-lineup`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
    }

    const payload = (await res.json()) as RecentFixture
    return payload
  })

export const getUpcomingFixtureFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (data: { leagueId: number; seasonId: number; teamId: number }) => data,
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/teams/${data.teamId}/fixtures?upcoming=true`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
    }

    const payload = (await res.json()) as UpcomingFixture
    return payload
  })

export const getTeamPlayersFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (data: { leagueId: number; seasonId: number; teamId: number }) => data,
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/teams/${data.teamId}/players`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
    }

    const payload = (await res.json()) as TeamPlayer[]
    return payload
  })

export const getTeamFixturesFn = createServerFn({ method: 'GET' })
  .inputValidator(
    (data: { leagueId: number; seasonId: number; teamId: number }) => data,
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/teams/${data.teamId}/fixtures`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
    }

    const payload = (await res.json()) as TeamFixtures
    return payload
  })
