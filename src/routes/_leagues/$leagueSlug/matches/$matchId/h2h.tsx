import { createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Route as MatchLayoutRoute } from './route'
import { leagueIdFromSlug } from '#/lib/league-slug'
import { getFixtureH2HFn } from '#/data/fixtures'
import type { FixtureH2H, H2HLogo } from '#/lib/types'
import { cn } from '#/lib/utils'

export const Route = createFileRoute(
  '/_leagues/$leagueSlug/matches/$matchId/h2h',
)({
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
    const matchId = Number(params.matchId)
    const seasonId = Number(deps.season)

    if (!leagueId || !matchId || !seasonId) {
      throw notFound()
    }

    const h2h = await getFixtureH2HFn({ data: { leagueId, matchId, seasonId } })
    return { h2h, leagueSlug: params.leagueSlug, matchId: params.matchId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { details } = MatchLayoutRoute.useLoaderData()
  const { h2h } = Route.useLoaderData()

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-foreground text-lg font-semibold">
        Head-to-head
      </h2>

      <FixtureGroupSection
        title={`Recent Fixtures: ${details.fixture.team1_name}`}
        fixtures={h2h.home}
        focusTeamId={details.fixture.team1_id}
        logos={h2h.logos}
      />

      <FixtureGroupSection
        title={`Recent Fixtures: ${details.fixture.team2_name}`}
        fixtures={h2h.away}
        focusTeamId={details.fixture.team2_id}
        logos={h2h.logos}
      />

      <FixtureGroupSection
        title="Head to Head"
        fixtures={h2h.h2h}
        focusTeamId={details.fixture.team1_id}
        logos={h2h.logos}
      />
    </div>
  )
}

function FixtureGroupSection({
  title,
  fixtures,
  focusTeamId,
  logos,
}: {
  title: string
  fixtures: FixtureH2H[]
  focusTeamId: number
  logos: H2HLogo[]
}) {
  const PAGE_SIZE = 5
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [fixtures])

  if (!fixtures.length) {
    return (
      <section className="bg-card/80 border-border overflow-hidden rounded-lg border">
        <div className="bg-muted/60 border-border border-b px-3 py-2">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground px-3 py-4 text-sm">
          No fixtures available.
        </p>
      </section>
    )
  }

  const visibleFixtures = fixtures.slice(0, visibleCount)
  const hasMore = visibleCount < fixtures.length

  return (
    <section className="bg-card/80 border-border overflow-hidden rounded-lg border">
      <div className="bg-muted/60 border-border border-b px-3 py-2">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>

      <ul className="divide-border divide-y">
        {visibleFixtures.map((fixture) => (
          <FixtureRow
            key={`${title}-${fixture.id}`}
            fixture={fixture}
            focusTeamId={focusTeamId}
            logos={logos}
          />
        ))}
      </ul>

      {hasMore ? (
        <div className="border-border border-t px-3 py-2.5 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
          >
            Load more fixtures
          </button>
        </div>
      ) : null}
    </section>
  )
}

function FixtureRow({
  fixture,
  focusTeamId,
  logos,
}: {
  fixture: FixtureH2H
  focusTeamId: number
  logos: H2HLogo[]
}) {
  const team1Logo = logos.find((l) => l.team_id === fixture.team1_id)?.logo
  const team2Logo = logos.find((l) => l.team_id === fixture.team2_id)?.logo
  const result = getResultForTeam(fixture, focusTeamId)

  return (
    <li className="grid grid-cols-[5rem_1fr_auto] items-center gap-2 px-3 py-2.5 text-sm">
      <div className="text-muted-foreground text-xs leading-tight">
        <div>{formatDate(fixture.game_date)}</div>
        <div className="mt-1 font-semibold uppercase">{fixture.game_status}</div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex items-center justify-end gap-2">
          <span className="text-right">{fixture.team1_name}</span>
          {team1Logo ? (
            <img
              src={team1Logo}
              alt={`${fixture.team1_name} logo`}
              className="size-5 rounded-full object-cover"
            />
          ) : null}
        </div>

        <div className="font-semibold tabular-nums">
          {fixture.home_score} - {fixture.away_score}
        </div>

        <div className="flex items-center gap-2">
          {team2Logo ? (
            <img
              src={team2Logo}
              alt={`${fixture.team2_name} logo`}
              className="size-5 rounded-full object-cover"
            />
          ) : null}
          <span>{fixture.team2_name}</span>
        </div>
      </div>

      <ResultPill result={result} />
    </li>
  )
}

function ResultPill({ result }: { result: 'W' | 'D' | 'L' }) {
  return (
    <span
      className={cn(
        'inline-flex size-6 items-center justify-center rounded-full text-xs font-bold',
        result === 'W' && 'bg-emerald-500/85 text-white',
        result === 'D' && 'bg-amber-500/85 text-white',
        result === 'L' && 'bg-rose-500/85 text-white',
      )}
    >
      {result}
    </span>
  )
}

function getResultForTeam(
  fixture: FixtureH2H,
  teamId: number,
): 'W' | 'D' | 'L' {
  const home = Number(fixture.home_score)
  const away = Number(fixture.away_score)
  if (home === away) return 'D'

  const isHomeTeam = fixture.team1_id === teamId
  if (isHomeTeam) return home > away ? 'W' : 'L'
  return away > home ? 'W' : 'L'
}

function formatDate(value: string) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
