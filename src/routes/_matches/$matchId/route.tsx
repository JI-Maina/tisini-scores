import { Link, Outlet, createFileRoute, notFound } from '@tanstack/react-router'

import FixtureHeader from '#/components/fixtures/fixture-header'
import { getFixtureDetailsFn } from '#/data/fixtures'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'
import { cn } from '#/lib/utils'

const tabs = [
  { label: 'Overview', to: '/$matchId' as const },
  { label: 'Lineups', to: '/$matchId/lineups' as const },
  { label: 'Stats', to: '/$matchId/stats' as const },
  { label: 'H2H', to: '/$matchId/h2h' as const },
]

const tabLinkClass =
  'border-border/70 text-muted-foreground hover:bg-accent hover:text-primary border-r px-3 py-2.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors last:border-r-0'

const tabLinkActiveClass =
  'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary'

export const Route = createFileRoute('/_matches/$matchId')({
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
    const leagueId = 238
    const matchId = Number(params.matchId)

    const seasons = await getSeasonsFn({ data: { leagueId } })
    const defaultSeasonId = pickDefaultSeasonId(seasons)
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const details = await getFixtureDetailsFn({
      data: { leagueId, matchId, seasonId },
    })
    return {
      details,
      matchId: params.matchId,
      seasonId,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { details, matchId, seasonId } = Route.useLoaderData()

  return (
    <div className="space-y-4 pb-6">
      <section>
        <FixtureHeader details={details.fixture} />
      </section>

      <nav className="border-sportpesa-azure/20 bg-card/90 grid grid-cols-4 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            params={{ matchId }}
            search={{ season: String(seasonId) }}
            className={tabLinkClass}
            activeProps={{ className: cn(tabLinkClass, tabLinkActiveClass) }}
            activeOptions={{
              exact: tab.to === '/$matchId',
            }}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <section className="border-sportpesa-azure/20 bg-card/60 min-h-40 rounded-xl border p-3 shadow-sm backdrop-blur-sm sm:p-4">
        <Outlet />
      </section>
    </div>
  )
}
