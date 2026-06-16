import { Suspense, use } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { Route as TeamRoute } from './route'
import { slugToId, splitLineup } from '#/lib/utils'
import { leagueIdFromSlug } from '#/lib/league-slug'
import { StatCell } from '#/components/teams/stat-cell'
import type { RecentFixture } from '#/lib/types'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'
import { FixtureSnippet } from '#/components/fixtures/fixture-snippet'
import { getRecentFixtureFn, getUpcomingFixtureFn } from '#/data/teams'

export const Route = createFileRoute('/_site/teams/$teamId/')({
  validateSearch: (search: Record<string, unknown>) => ({
    season:
      typeof search.season === 'string' && search.season.trim() !== ''
        ? search.season
        : undefined,
  }),
  loaderDeps: ({ search }) => ({
    season: search.season,
  }),
  loader: async ({ params, deps }) => {
    const leagueId = leagueIdFromSlug(params.leagueSlug)
    const teamId = slugToId(params.teamId)
    if (!leagueId || !teamId) throw notFound()

    const seasons = await getSeasonsFn({ data: { leagueId } })
    const defaultSeasonId = pickDefaultSeasonId(seasons)
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const recentPromise = getRecentFixtureFn({
      data: { leagueId, seasonId, teamId },
    })

    const upcomingPromise = getUpcomingFixtureFn({
      data: { leagueId, seasonId, teamId },
    })

    return { recentPromise, upcomingPromise }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { team, leagueSlug, seasonId } = TeamRoute.useLoaderData()
  const { recentPromise, upcomingPromise } = Route.useLoaderData()

  return (
    <section className="space-y-6">
      <div className="border-border bg-card/80 grid grid-cols-2 gap-px overflow-hidden rounded-xl border shadow-sm sm:grid-cols-4">
        <StatCell label="Played" value={team.games_played} />
        <StatCell label="Wins" value={team.games_won} tone="win" />
        <StatCell label="Draws" value={team.games_drawn} tone="draw" />
        <StatCell label="Losses" value={team.games_lost} tone="loss" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Suspense fallback={<div>Loading...</div>}>
          <FixtureSnippet
            variant="recent"
            data={recentPromise}
            currentTeamId={team.team_id}
            leagueSlug={leagueSlug}
            seasonId={seasonId}
          />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <FixtureSnippet
            variant="upcoming"
            data={upcomingPromise}
            currentTeamId={team.team_id}
            leagueSlug={leagueSlug}
            seasonId={seasonId}
          />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <StartingLineupList data={recentPromise} teamId={team.team_id} />
      </Suspense>
    </section>
  )
}

function StartingLineupList({
  data,
  teamId,
}: {
  data: Promise<RecentFixture | null>
  teamId: number
}) {
  const recent = use(data) as RecentFixture | null | undefined

  const lineup =
    recent &&
    Array.isArray(recent.lineup) &&
    recent.fixture &&
    typeof recent.fixture.team1_id === 'number'
      ? recent.lineup
      : null

  if (!recent?.fixture || !lineup) {
    return (
      <section className="border-border bg-muted/15 rounded-xl border border-dashed p-4">
        <h3 className="text-foreground text-sm font-semibold">
          Last starting XI
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Lineup appears here after the team plays a recorded match.
        </p>
      </section>
    )
  }

  const teamPlayers = lineup.filter((p) => Number(p.teamid) === teamId)
  let { starters } = splitLineup(teamPlayers)
  if (starters.length === 0 && teamPlayers.length > 0) {
    starters = [...teamPlayers].sort(
      (a, b) => a.lineupposition - b.lineupposition,
    )
  } else {
    starters = [...starters].sort((a, b) => a.lineupposition - b.lineupposition)
  }

  return (
    <section className="border-border bg-card/90 rounded-xl border p-4 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-foreground text-sm font-semibold">
          Last starting XI
        </h3>
        <p className="text-muted-foreground text-xs">
          {recent.fixture.team1_name} vs {recent.fixture.team2_name}
        </p>
      </div>

      {starters.length === 0 ? (
        <p className="text-muted-foreground mt-3 text-sm">
          No starting players listed.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-border/60 rounded-lg border border-border/70">
          {starters.map((player) => (
            <li
              key={player.id}
              className="flex items-center gap-3 px-3 py-2 text-sm first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="bg-muted text-muted-foreground w-8 shrink-0 rounded px-1 py-0.5 text-center text-xs font-semibold tabular-nums">
                {player.jersey_no ?? '—'}
              </span>
              {player.passportphoto ? (
                <img
                  src={player.passportphoto}
                  alt=""
                  className="border-border size-8 shrink-0 rounded-full border object-cover"
                />
              ) : (
                <div className="border-border bg-muted size-8 shrink-0 rounded-full border" />
              )}
              <span className="text-foreground truncate font-medium">
                {player.pname}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
