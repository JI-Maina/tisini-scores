import { Link, createFileRoute } from '@tanstack/react-router'
import { Route as LeaguesLayoutRoute } from '#/routes/_leagues/route'
import { leagueToSlug } from '#/lib/league-slug'
import type { League } from '#/lib/types'

export const Route = createFileRoute('/_leagues/')({
  component: Home,
})

function Home() {
  const { leagues } = LeaguesLayoutRoute.useLoaderData()

  return (
    <section
      className="flex min-h-[calc(100dvh-10rem)] w-full flex-col py-4"
      aria-label="Featured"
    >
      <header className="border-border bg-card/70 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight">
          Home
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Select a league to browse matches.
        </p>
      </header>

      <div className="mt-6">
        <h2 className="font-heading text-foreground text-2xl font-bold tracking-tight">
          Leagues ({leagues.length})
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {leagues.map((league: League) => {
            const leagueSlug = leagueToSlug(league)
            return (
              <li key={league.id}>
                <Link
                  to="/$leagueSlug/matches"
                  params={{ leagueSlug }}
                  search={{ season: undefined }}
                  className="border-border bg-card hover:bg-muted/50 block rounded-lg border p-4 transition-colors"
                >
                  <p className="font-semibold">{league.name}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Open matches
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
