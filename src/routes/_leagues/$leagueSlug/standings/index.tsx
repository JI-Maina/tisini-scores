import { Suspense, use } from 'react'
import { Loader2Icon } from 'lucide-react'
import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'

import { cn } from '#/lib/utils'
import { getStandingsFn } from '#/data/standings'
import type { LeagueStandings } from '#/lib/types'
import { leagueIdFromSlug } from '#/lib/league-slug'
import { SeasonSelect } from '#/components/shared/season-select'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'

export const Route = createFileRoute('/_leagues/$leagueSlug/standings/')({
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

    if (!leagueId) {
      throw notFound()
    }

    const seasons = await getSeasonsFn({ data: { leagueId } })
    const defaultSeasonId = pickDefaultSeasonId(seasons)
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const standingsPromise = getStandingsFn({ data: { leagueId, seasonId } })
    return {
      standingsPromise,
      seasons,
      seasonId,
      leagueSlug: params.leagueSlug,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { standingsPromise, seasons, seasonId, leagueSlug } =
    Route.useLoaderData()
  const navigate = useNavigate()

  return (
    <section className="space-y-4 pb-10 pt-2">
      <header className="border-border bg-card/70 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight">
            Standings
          </h1>

          <Suspense fallback={<div>Loading...</div>}>
            <SeasonInfo data={standingsPromise} />
          </Suspense>
        </div>

        <SeasonSelect
          value={String(seasonId)}
          seasons={seasons}
          onValueChange={(value) => {
            navigate({
              to: '/$leagueSlug/standings',
              params: { leagueSlug },
              search: { season: value },
            })
          }}
        />
      </header>

      <Suspense
        fallback={
          <div className="text-muted-foreground flex items-center gap-2 py-12 text-sm">
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            Loading standings…
          </div>
        }
      >
        <StandingsTable data={standingsPromise} />
      </Suspense>
    </section>
  )
}

function SeasonInfo({ data }: { data: Promise<LeagueStandings> }) {
  const standings = use(data)

  return (
    <p className="text-muted-foreground mt-1 text-sm">
      Season {standings.season} · {standings.matches_played} matches played
    </p>
  )
}

function StandingsTable({ data }: { data: Promise<LeagueStandings> }) {
  const standings = use(data)

  return (
    <div className="border-border bg-card/90 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm">
      <div className="grid grid-cols-[2.5rem_minmax(11rem,1fr)_2.5rem_2.5rem_2.5rem_2.5rem_3rem_3rem_3rem_3.5rem] items-center gap-2 border-b border-border/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>#</span>
        <span>Team</span>
        <span className="text-center">P</span>
        <span className="text-center">W</span>
        <span className="text-center">D</span>
        <span className="text-center">L</span>
        <span className="text-center">GF</span>
        <span className="text-center">GA</span>
        <span className="text-center">GD</span>
        <span className="text-center">Pts</span>
      </div>

      <ul className="divide-border divide-y">
        {standings.standings.map((team, idx) => (
          <li
            key={team.id}
            className="grid grid-cols-[2.5rem_minmax(11rem,1fr)_2.5rem_2.5rem_2.5rem_2.5rem_3rem_3rem_3rem_3.5rem] items-center gap-2 px-3 py-2.5 text-sm"
          >
            <span className="text-muted-foreground font-semibold tabular-nums">
              {idx + 1}
            </span>

            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src={team.logo}
                alt={`${team.team_name} logo`}
                className="border-border size-6 shrink-0 rounded-full border object-cover"
              />
              <span className="text-foreground truncate font-medium">
                {team.team_name}
              </span>
            </div>

            <span className="text-center tabular-nums">{team.P}</span>
            <span className="text-center tabular-nums">{team.W}</span>
            <span className="text-center tabular-nums">{team.D}</span>
            <span className="text-center tabular-nums">{team.L}</span>
            <span className="text-center tabular-nums">{team.GF}</span>
            <span className="text-center tabular-nums">{team.GA}</span>
            <span
              className={cn(
                'text-center tabular-nums',
                team.GD > 0 && 'text-emerald-600 dark:text-emerald-400',
                team.GD < 0 && 'text-rose-600 dark:text-rose-400',
              )}
            >
              {team.GD > 0 ? `+${team.GD}` : team.GD}
            </span>
            <span className="text-center font-semibold tabular-nums">
              {team.Pts}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
