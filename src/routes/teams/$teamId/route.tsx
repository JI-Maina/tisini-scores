import { createFileRoute, Link, notFound, Outlet } from '@tanstack/react-router'

import { getTeamFn } from '#/data/teams'
import { slugify, slugToId } from '#/lib/utils'
import { leagueIdFromSlug } from '#/lib/league-slug'
import { TeamHeader } from '#/components/teams/team-header'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'

const tabs = [
  { label: 'Overview', to: '/$leagueSlug/teams/$teamId' as const },
  { label: 'Squad', to: '/$leagueSlug/teams/$teamId/squad' as const },
  { label: 'Matches', to: '/$leagueSlug/teams/$teamId/matches' as const },
  { label: 'Stats', to: '/$leagueSlug/teams/$teamId/stats' as const },
]

export const Route = createFileRoute('/teams/$teamId')({
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
    if (!teamId || !leagueId) {
      throw notFound()
    }

    const seasons = await getSeasonsFn({ data: { leagueId } })
    const defaultSeasonId = pickDefaultSeasonId(seasons)
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const team = await getTeamFn({ data: { leagueId, seasonId, teamId } })
    return { team, leagueSlug: params.leagueSlug, seasonId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { team, leagueSlug, seasonId } = Route.useLoaderData()

  return (
    <div className="space-y-4 pb-6">
      <TeamHeader team={team} />

      <nav className="bg-card/80 border-border grid grid-cols-2 gap-px overflow-hidden rounded-lg border shadow-sm backdrop-blur-sm sm:grid-cols-4 sm:gap-0">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            params={{
              leagueSlug,
              teamId: slugify(team.team_name, team.team_id),
            }}
            search={{ season: String(seasonId) }}
            className="text-muted-foreground hover:text-foreground hover:bg-background/70 data-[status=active]:text-foreground data-[status=active]:bg-background border-border/70 px-3 py-2.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors sm:border-r sm:last:border-r-0"
            activeProps={{ className: 'text-foreground bg-background' }}
            activeOptions={{
              exact: tab.to === '/$leagueSlug/teams/$teamId',
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
