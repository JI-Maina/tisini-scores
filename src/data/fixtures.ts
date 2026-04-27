import { createServerFn } from '@tanstack/react-start'

import type {
  Fixture,
  FixtureDetails,
  FixtureLineups,
  H2HContext,
} from '#/lib/types'

type FixtureInput = {
  leagueId: number
  seasonId: number
  matchId: number
}

export const getFixturesFn = createServerFn({ method: 'GET' })
  .inputValidator((data: { leagueId: number }) => data)
  .handler(async ({ data }) => {
    const leagueId = data.leagueId ?? 205

    const apiUrl = process.env.API_SCORES_URL
    const apiKey = process.env.API_KEY
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    if (apiKey) {
      headers.set('x-api-key', apiKey)
    }

    const res = await fetch(
      `${apiUrl}/competitions/${leagueId}/seasons/123/fixtures`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
      // const body = await readErrorBody(response)
      // console.error("Failed to fetch fixtures", body)
      // throw new Error(`${response.status}: ${messageFromApiErrorBody(body)}`)
    }

    const fixtures = (await res.json()) as Fixture[]
    return fixtures
  })

export const getFixtureDetailsFn = createServerFn({ method: 'GET' })
  .inputValidator((data: FixtureInput) => data)
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/fixtures/${data.matchId}/details`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
      // const body = await readErrorBody(response)
      // console.error("Failed to fetch fixture details", body)
      // throw new Error(`${response.status}: ${messageFromApiErrorBody(body)}`)
    }

    const fixtureDetails = (await res.json()) as FixtureDetails
    return fixtureDetails
  })

export const getFixtureLineupsFn = createServerFn({
  method: 'GET',
})
  .inputValidator((data: FixtureInput) => data)
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/fixtures/${data.matchId}/lineups`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
      // const body = await readErrorBody(response)
      // console.error("Failed to fetch fixture lineups", body)
      // throw new Error(`${response.status}: ${messageFromApiErrorBody(body)}`)
    }

    const fixtureLineups = (await res.json()) as FixtureLineups
    return fixtureLineups
  })

export const getFixtureH2HFn = createServerFn({ method: 'GET' })
  .inputValidator((data: FixtureInput) => data)
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
      `${apiUrl}/competitions/${data.leagueId}/seasons/${data.seasonId}/fixtures/${data.matchId}/match-context`,
      {
        method: 'GET',
        headers,
      },
    )

    if (!res.ok) {
      console.log('error')
      // const body = await readErrorBody(response)
      // console.error("Failed to fetch fixture h2h", body)
      // throw new Error(`${response.status}: ${messageFromApiErrorBody(body)}`)
    }

    const fixtureH2H = (await res.json()) as H2HContext
    return fixtureH2H
  })
