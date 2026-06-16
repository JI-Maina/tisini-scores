import { Suspense } from 'react'
import { Loader2Icon } from 'lucide-react'
import {
  createFileRoute,
  notFound,
  redirect,
  useNavigate,
} from '@tanstack/react-router'

import { getFixturesFn } from '#/data/fixtures'
import { SeasonSelect } from '#/components/shared/season-select'
import { FixturesList } from '#/components/fixtures/fixture-list'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    season:
      typeof search.season === 'string' && search.season.trim() !== ''
        ? search.season
        : undefined,
  }),
  loaderDeps: ({ search }) => ({
    season: search.season,
  }),
  loader: async ({ deps }) => {
    const leagueId = 238
    const seasons = await getSeasonsFn({ data: { leagueId } })
    const defaultSeasonId = pickDefaultSeasonId(seasons)

    if (!deps.season && defaultSeasonId) {
      throw redirect({
        to: '/',
        search: { season: String(defaultSeasonId) },
        replace: true,
      })
    }
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const fixturesPromise = getFixturesFn({
      data: { leagueId, seasonId },
    })

    return { fixturesPromise, seasons, seasonId }
  },
  component: Home,
})

function Home() {
  const { fixturesPromise, seasons, seasonId } = Route.useLoaderData()

  const navigate = useNavigate()

  return (
    <section className="pb-12 pt-2 space-y-6">
      <header className="border-border bg-card/70 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-end sm:justify-between">
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
              to: '/',
              search: { season: value },
            })
          }}
        />
      </header>

      <Suspense
        fallback={
          <div className="text-muted-foreground flex items-center gap-2 py-12 text-sm">
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            Loading fixtures…
          </div>
        }
      >
        <FixturesList data={fixturesPromise} seasonId={seasonId} />
      </Suspense>
    </section>
  )
}
