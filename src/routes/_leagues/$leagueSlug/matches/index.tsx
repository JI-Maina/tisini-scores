import { Suspense } from 'react'
import { Loader2Icon } from 'lucide-react'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { getFixturesFn } from '#/data/fixtures'
import { FixturesList } from '#/components/fixtures/fixture-list'
import { leagueIdFromSlug } from '#/lib/league-slug'

export const Route = createFileRoute('/_leagues/$leagueSlug/matches/')({
  loader: async ({ params }) => {
    const leagueId = leagueIdFromSlug(params.leagueSlug)

    if (!leagueId) {
      throw notFound()
    }

    const fixturesPromise = getFixturesFn({ data: { leagueId } })
    return { fixturesPromise, leagueSlug: params.leagueSlug }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { fixturesPromise, leagueSlug } = Route.useLoaderData()

  return (
    <div className="pb-12 pt-2">
      <div className="mb-6">
        <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight">
          Matches
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Fixtures grouped by matchday
        </p>
      </div>
      <Suspense
        fallback={
          <div className="text-muted-foreground flex items-center gap-2 py-12 text-sm">
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            Loading fixtures…
          </div>
        }
      >
        <FixturesList data={fixturesPromise} leagueSlug={leagueSlug} />
      </Suspense>
    </div>
  )
}
