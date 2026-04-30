import { Suspense } from 'react'
import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'

import { leagueIdFromSlug } from '#/lib/league-slug'
import type { TopPlayer, TopTeam } from '#/lib/types'
import { TeamStatsCard } from '#/components/stats/teams-card'
import { getPlayerStatsFn, getTeamStatsFn } from '#/data/stats'
import { SeasonSelect } from '#/components/shared/season-select'
import { PlayerStatsCard } from '#/components/stats/players-card'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'

type StatsLeagueConfig = {
  team: readonly [
    { title: string; eventId: number },
    { title: string; eventId: number },
    { title: string; eventId: number },
  ]
  player: readonly [
    { title: string; eventId: number },
    { title: string; eventId: number },
    { title: string; eventId: number },
  ]
}

const statsConfigByLeagueId: Record<number, StatsLeagueConfig> = {
  205: {
    team: [
      { title: 'Most Goals', eventId: 19 },
      { title: 'Most Interceptions', eventId: 28 },
      { title: 'Most Tackles', eventId: 97 },
    ],
    player: [
      { title: 'Top Scorers', eventId: 19 },
      { title: 'Top Assists', eventId: 23 },
      { title: 'Top Passes', eventId: 7 },
    ],
  },
  238: {
    team: [
      { title: 'Penalties Conceded', eventId: 60 },
      { title: 'Visits In Opp 22', eventId: 122 },
      { title: 'Scrums', eventId: 63 },
    ],
    player: [
      { title: 'Top Scores', eventId: 33 },
      { title: 'Top Tackles', eventId: 56 },
      { title: 'Top Carries', eventId: 58 },
    ],
  },
}

export const Route = createFileRoute('/_leagues/$leagueSlug/stats/')({
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
    const leagueStatsConfig = statsConfigByLeagueId[leagueId]
    if (!leagueStatsConfig) throw notFound()

    const goalsStatsPromise = getTeamStatsFn({
      data: { leagueId, seasonId, eventId: leagueStatsConfig.team[0].eventId },
    }).catch(() => [] as TopTeam[])
    const interceptionsStatsPromise = getTeamStatsFn({
      data: { leagueId, seasonId, eventId: leagueStatsConfig.team[1].eventId },
    }).catch(() => [] as TopTeam[])
    const tacklesStatsPromise = getTeamStatsFn({
      data: { leagueId, seasonId, eventId: leagueStatsConfig.team[2].eventId },
    }).catch(() => [] as TopTeam[])

    const topScorersPromise = getPlayerStatsFn({
      data: { leagueId, seasonId, eventId: leagueStatsConfig.player[0].eventId },
    })
      .then((res) => res.items)
      .catch(() => [] as TopPlayer[])
    const topAssistsPromise = getPlayerStatsFn({
      data: { leagueId, seasonId, eventId: leagueStatsConfig.player[1].eventId },
    })
      .then((res) => res.items)
      .catch(() => [] as TopPlayer[])
    const topPassesPromise = getPlayerStatsFn({
      data: { leagueId, seasonId, eventId: leagueStatsConfig.player[2].eventId },
    })
      .then((res) => res.items)
      .catch(() => [] as TopPlayer[])

    return {
      goalsStatsPromise,
      interceptionsStatsPromise,
      tacklesStatsPromise,
      topScorersPromise,
      topAssistsPromise,
      topPassesPromise,
      seasons,
      seasonId,
      leagueSlug: params.leagueSlug,
      leagueStatsConfig,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const {
    goalsStatsPromise,
    interceptionsStatsPromise,
    tacklesStatsPromise,
    topScorersPromise,
    topAssistsPromise,
    topPassesPromise,
    seasons,
    seasonId,
    leagueSlug,
    leagueStatsConfig,
  } = Route.useLoaderData()
  const navigate = useNavigate()

  return (
    <section className="space-y-5 pb-10 pt-2">
      <header className="border-border bg-card/70 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight">
            League Stats
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Leaders across team and player metrics.
          </p>
        </div>
        <SeasonSelect
          value={String(seasonId)}
          seasons={seasons}
          onValueChange={(value) => {
            navigate({
              to: '/$leagueSlug/stats',
              params: { leagueSlug },
              search: { season: value },
            })
          }}
        />
      </header>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Team Stats
        </h2>
        <div className="grid gap-3 lg:grid-cols-3">
          <Suspense fallback={<StatsCardFallback title="Most Goals" />}>
            <TeamStatsCard
              title={leagueStatsConfig.team[0].title}
              teamsPromise={goalsStatsPromise}
              leagueSlug={leagueSlug}
              seasonId={seasonId}
            />
          </Suspense>
          <Suspense fallback={<StatsCardFallback title={leagueStatsConfig.team[1].title} />}>
            <TeamStatsCard
              title={leagueStatsConfig.team[1].title}
              teamsPromise={interceptionsStatsPromise}
              leagueSlug={leagueSlug}
              seasonId={seasonId}
            />
          </Suspense>
          <Suspense fallback={<StatsCardFallback title={leagueStatsConfig.team[2].title} />}>
            <TeamStatsCard
              title={leagueStatsConfig.team[2].title}
              teamsPromise={tacklesStatsPromise}
              leagueSlug={leagueSlug}
              seasonId={seasonId}
            />
          </Suspense>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Player Stats
        </h2>
        <div className="grid gap-3 lg:grid-cols-3">
          <Suspense fallback={<StatsCardFallback title={leagueStatsConfig.player[0].title} />}>
            <PlayerStatsCard
              title={leagueStatsConfig.player[0].title}
              playersPromise={topScorersPromise}
              leagueSlug={leagueSlug}
              seasonId={seasonId}
            />
          </Suspense>
          <Suspense fallback={<StatsCardFallback title={leagueStatsConfig.player[1].title} />}>
            <PlayerStatsCard
              title={leagueStatsConfig.player[1].title}
              playersPromise={topAssistsPromise}
              leagueSlug={leagueSlug}
              seasonId={seasonId}
            />
          </Suspense>
          <Suspense fallback={<StatsCardFallback title={leagueStatsConfig.player[2].title} />}>
            <PlayerStatsCard
              title={leagueStatsConfig.player[2].title}
              playersPromise={topPassesPromise}
              leagueSlug={leagueSlug}
              seasonId={seasonId}
            />
          </Suspense>
        </div>
      </section>
    </section>
  )
}

function StatsCardFallback({ title }: { title: string }) {
  return (
    <article className="border-border bg-card/90 rounded-xl border shadow-sm">
      <header className="border-border/70 border-b px-4 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
      </header>
      <div className="p-4 text-sm text-muted-foreground">Loading...</div>
    </article>
  )
}
