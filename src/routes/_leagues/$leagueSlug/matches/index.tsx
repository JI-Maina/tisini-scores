import { Suspense } from 'react'
import { Loader2Icon } from 'lucide-react'
import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'

import { getFixturesFn } from '#/data/fixtures'
import { FixturesList } from '#/components/fixtures/fixture-list'
import { leagueIdFromSlug } from '#/lib/league-slug'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'
import { SeasonSelect } from '#/components/shared/season-select'

export const Route = createFileRoute('/_leagues/$leagueSlug/matches/')({
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
    const seasonId = pickDefaultSeasonId(seasons)
    const selectedSeasonId = deps.season ? Number(deps.season) : seasonId
    if (!selectedSeasonId) throw notFound()

    const fixturesPromise = getFixturesFn({
      data: { leagueId, seasonId: selectedSeasonId },
    })
    return {
      fixturesPromise,
      leagueSlug: params.leagueSlug,
      seasons,
      seasonId: selectedSeasonId,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { fixturesPromise, leagueSlug, seasons, seasonId } =
    Route.useLoaderData()
  const navigate = useNavigate()

  return (
    <div className="pb-12 pt-2">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight">
            Matches
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Fixtures grouped by matchday
          </p>
        </div>
        <SeasonSelect
          value={String(seasonId)}
          seasons={seasons}
          onValueChange={(value) => {
            navigate({
              to: '/$leagueSlug/matches',
              params: { leagueSlug },
              search: { season: value },
            })
          }}
        />
      </div>
      <Suspense
        fallback={
          <div className="text-muted-foreground flex items-center gap-2 py-12 text-sm">
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            Loading fixtures…
          </div>
        }
      >
        <FixturesList
          data={fixturesPromise}
          leagueSlug={leagueSlug}
          seasonId={seasonId}
        />
      </Suspense>
    </div>
  )
}
