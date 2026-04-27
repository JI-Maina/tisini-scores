import { Link, Outlet, createFileRoute, notFound } from '@tanstack/react-router'

import FixtureHeader from '#/components/fixtures/fixture-header'
import { getFixtureDetailsFn } from '#/data/fixtures'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'
import { leagueIdFromSlug } from '#/lib/league-slug'

const tabs = [
  { label: 'Overview', to: '/$leagueSlug/matches/$matchId' as const },
  { label: 'Lineups', to: '/$leagueSlug/matches/$matchId/lineups' as const },
  { label: 'Stats', to: '/$leagueSlug/matches/$matchId/stats' as const },
  { label: 'H2H', to: '/$leagueSlug/matches/$matchId/h2h' as const },
]

export const Route = createFileRoute('/_leagues/$leagueSlug/matches/$matchId')({
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

    if (!leagueId || !matchId) {
      throw notFound()
    }

    const seasons = await getSeasonsFn({ data: { leagueId } })
    const defaultSeasonId = pickDefaultSeasonId(seasons)
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const details = await getFixtureDetailsFn({
      data: { leagueId, matchId, seasonId },
    })
    return {
      details,
      leagueSlug: params.leagueSlug,
      matchId: params.matchId,
      seasonId,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { details, leagueSlug, matchId, seasonId } = Route.useLoaderData()

  return (
    <div className="space-y-4 pb-6">
      <section>
        <FixtureHeader details={details.fixture} />
      </section>

      <nav className="bg-card/80 border-border grid grid-cols-4 overflow-hidden rounded-lg border shadow-sm backdrop-blur-sm">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            params={{ leagueSlug, matchId }}
            search={{ season: String(seasonId) }}
            className="text-muted-foreground hover:text-foreground hover:bg-background/70 data-[status=active]:text-foreground data-[status=active]:bg-background border-border/70 border-r px-3 py-2.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors last:border-r-0"
            activeProps={{ className: 'text-foreground bg-background' }}
            activeOptions={{
              exact: tab.to === '/$leagueSlug/matches/$matchId',
            }}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <section className="bg-card/60 border-border min-h-40 rounded-lg border p-3 shadow-sm backdrop-blur-sm sm:p-4">
        <Outlet />
      </section>
    </div>
  )
}
