import { SeasonSelect } from '#/components/shared/season-select'
import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'
import { getTeamsFn } from '#/data/teams'
import { leagueIdFromSlug } from '#/lib/league-slug'
import type { Team } from '#/lib/types'
import { slugify } from '#/lib/utils'
import {
  createFileRoute,
  Link,
  notFound,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { ChevronRightIcon, Loader2Icon } from 'lucide-react'
import { Suspense, use } from 'react'

export const Route = createFileRoute('/_leagues/$leagueSlug/teams/')({
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
    if (!deps.season && defaultSeasonId) {
      throw redirect({
        to: '/$leagueSlug/matches',
        params: { leagueSlug: params.leagueSlug },
        search: { season: String(defaultSeasonId) },
        replace: true,
      })
    }
    const seasonId = deps.season ? Number(deps.season) : defaultSeasonId
    if (!seasonId) throw notFound()

    const teamsPromise = getTeamsFn({ data: { leagueId, seasonId } })
    return { teamsPromise, seasons, seasonId, leagueSlug: params.leagueSlug }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { teamsPromise, seasons, seasonId, leagueSlug } = Route.useLoaderData()

  const navigate = useNavigate()

  return (
    <section className="space-y-6 pb-10 pt-2">
      <header className="border-border bg-card/70 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight">
            Teams
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Browse clubs in the selected season.
          </p>
        </div>

        <SeasonSelect
          value={String(seasonId)}
          seasons={seasons}
          onValueChange={(value) => {
            navigate({
              to: '/$leagueSlug/teams',
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
            Loading teams…
          </div>
        }
      >
        <TeamsGrid data={teamsPromise} leagueSlug={leagueSlug} />
      </Suspense>
    </section>
  )
}

function TeamsGrid({
  data,
  leagueSlug,
}: {
  data: Promise<Team[]>
  leagueSlug: string
}) {
  const teams = use(data)

  return (
    <>
      {teams.length === 0 ? (
        <div className="text-muted-foreground border-border bg-card/60 flex items-center gap-2 rounded-xl border py-12 text-center text-sm">
          No teams found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.team_id} team={team} leagueSlug={leagueSlug} />
          ))}
        </div>
      )}
    </>
  )
}

function TeamCard({ team, leagueSlug }: { team: Team; leagueSlug: string }) {
  return (
    <Link
      to="/$leagueSlug/teams/$teamId"
      params={{ leagueSlug, teamId: slugify(team.team_name, team.team_id) }}
      className="border-border bg-card/90 hover:bg-card group rounded-xl border p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-2"
    >
      <div className="flex min-h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="border-border bg-background/90 flex size-11 shrink-0 items-center justify-center rounded-full border p-1.5">
            {team.team_logo ? (
              <img
                src={team.team_logo}
                alt={team.team_name}
                className="size-full rounded-full object-contain"
              />
            ) : (
              <div className="bg-muted text-muted-foreground border-border grid size-6 place-items-center rounded-full border text-[10px] font-semibold">
                {team.team_name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <h3 className="text-foreground truncate text-sm font-semibold sm:text-base">
            {team.team_name}
          </h3>
        </div>
        <ChevronRightIcon className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
