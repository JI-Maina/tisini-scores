import { TeamFixturesList } from '#/components/teams/team-fixture'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'
import { getTeamFixturesFn } from '#/data/teams'
import { leagueIdFromSlug } from '#/lib/league-slug'
import { slugToId } from '#/lib/utils'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'
import { Suspense } from 'react'

export const Route = createFileRoute(
  '/teams/$teamId/matches',
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
    const teamId = slugToId(params.teamId)
    if (!leagueId || !teamId) throw notFound()

    const seasons = await getSeasonsFn({ data: { leagueId } })
    const defaultSeasonId = pickDefaultSeasonId(seasons)
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const fixturesPromise = getTeamFixturesFn({
      data: { leagueId, seasonId, teamId },
    })

    return { fixturesPromise, leagueSlug: params.leagueSlug, seasons, seasonId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { fixturesPromise, leagueSlug, seasonId } = Route.useLoaderData()

  return (
    <div>
      <Suspense
        fallback={
          <div className="text-muted-foreground flex items-center gap-2 py-12 text-sm">
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            Loading fixtures…
          </div>
        }
      >
        {/* <TeamFixturesList
          data={fixturesPromise}
          leagueSlug={leagueSlug}
          seasonId={seasonId}
        /> */}
      </Suspense>
    </div>
  )
}
