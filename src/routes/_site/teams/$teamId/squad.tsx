import { getSeasonsFn, pickDefaultSeasonId } from '#/data/leagues'
import { getTeamPlayersFn } from '#/data/teams'
import { PlayerCard } from '#/components/teams/player-card'
import { leagueIdFromSlug } from '#/lib/league-slug'
import type { TeamPlayer } from '#/lib/types'
import { slugToId } from '#/lib/utils'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { UsersIcon } from 'lucide-react'
import { Suspense, use } from 'react'

export const Route = createFileRoute(
  '/_site/teams/$teamId/squad',
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

    const playersPromise = getTeamPlayersFn({
      data: { leagueId, seasonId, teamId },
    })

    return { playersPromise, leagueSlug: params.leagueSlug, seasonId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { playersPromise } = Route.useLoaderData()

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="font-heading text-foreground text-xl font-bold tracking-tight sm:text-2xl">
          Squad
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Registered players for the selected season, grouped by position.
        </p>
      </header>

      <Suspense fallback={<SquadGridSkeleton />}>
        <PlayerList data={playersPromise} />
      </Suspense>
    </section>
  )
}

function SquadGridSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-muted h-4 w-28 animate-pulse rounded-md" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="border-border bg-muted/40 overflow-hidden rounded-xl border shadow-sm"
          >
            <div className="bg-muted/60 aspect-[3/4] w-full animate-pulse" />
            <div className="space-y-2 p-3">
              <div className="bg-muted h-4 w-3/4 max-w-[11rem] animate-pulse rounded" />
              <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function groupPlayersByPosition(players: TeamPlayer[]) {
  const groups = new Map<string, TeamPlayer[]>()
  for (const p of players) {
    const raw = p.player.current_position?.trim()
    const label = raw && raw.length > 0 ? raw : 'Other'
    if (!groups.has(label)) groups.set(label, [])
    groups.get(label)!.push(p)
  }
  for (const list of groups.values()) {
    list.sort(sortByJerseyThenName)
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

function sortByJerseyThenName(a: TeamPlayer, b: TeamPlayer) {
  const ja = jerseySortKey(a.current_jersey_no)
  const jb = jerseySortKey(b.current_jersey_no)
  if (ja !== jb) return ja - jb
  const na = fullNameSortKey(a.player)
  const nb = fullNameSortKey(b.player)
  return na.localeCompare(nb, undefined, { sensitivity: 'base' })
}

function jerseySortKey(n: number) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return 999
  return n
}

function fullNameSortKey(pl: TeamPlayer['player']) {
  return [pl.sir_name, pl.first_name, pl.other_name]
    .filter((s) => typeof s === 'string' && s.trim() !== '')
    .join(' ')
    .toLowerCase()
}

function PlayerList({ data }: { data: Promise<TeamPlayer[]> }) {
  const players = use(data) as TeamPlayer[]

  if (!Array.isArray(players) || players.length === 0) {
    return (
      <div className="border-border bg-muted/15 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
        <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
          <UsersIcon className="size-6" aria-hidden />
        </div>
        <div className="space-y-1">
          <p className="text-foreground text-sm font-semibold">No squad data</p>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            No players are listed for this team in the current season view.
          </p>
        </div>
      </div>
    )
  }

  const groups = groupPlayersByPosition(players)

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
        {players.length} {players.length === 1 ? 'player' : 'players'}
      </p>

      {groups.map(([position, list]) => (
        <div key={position} className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-2 border-b border-border/70 pb-2">
            <h3 className="text-foreground font-heading text-sm font-semibold tracking-tight sm:text-base">
              {position}
            </h3>
            <span className="text-muted-foreground text-xs tabular-nums">
              ({list.length})
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {list.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
