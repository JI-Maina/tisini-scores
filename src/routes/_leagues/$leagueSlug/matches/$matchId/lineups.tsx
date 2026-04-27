import { createFileRoute, notFound } from '@tanstack/react-router'

import type { LineupPlayer } from '#/lib/types'
import { Route as MatchLayoutRoute } from './route'
import { leagueIdFromSlug } from '#/lib/league-slug'
import { getFixtureLineupsFn } from '#/data/fixtures'

export const Route = createFileRoute(
  '/_leagues/$leagueSlug/matches/$matchId/lineups',
)({
  loader: async ({ params }) => {
    const leagueId = leagueIdFromSlug(params.leagueSlug)
    const matchId = Number(params.matchId)
    const seasonId = 123

    if (!leagueId || !matchId) {
      throw notFound()
    }

    const lineups = await getFixtureLineupsFn({
      data: { leagueId, matchId, seasonId },
    })
    return { lineups, leagueSlug: params.leagueSlug, matchId: params.matchId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { details } = MatchLayoutRoute.useLoaderData()
  const { lineups } = Route.useLoaderData()

  const home = splitLineup(lineups.home)
  const away = splitLineup(lineups.away)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <LineupColumn
        teamName={details.fixture.team1_name}
        starters={home.starters}
        substitutes={home.substitutes}
      />
      <LineupColumn
        teamName={details.fixture.team2_name}
        starters={away.starters}
        substitutes={away.substitutes}
      />
    </div>
  )
}

function LineupColumn({
  teamName,
  starters,
  substitutes,
}: {
  teamName: string
  starters: LineupPlayer[]
  substitutes: LineupPlayer[]
}) {
  return (
    <section className="bg-card/80 border-border rounded-lg border p-3 sm:p-4">
      <h3 className="text-foreground text-base font-semibold">{teamName}</h3>

      <div className="mt-3 space-y-4">
        <LineupSection title="Starters" players={starters} />
        <LineupSection title="Substitutes" players={substitutes} />
      </div>
    </section>
  )
}

function LineupSection({
  title,
  players,
}: {
  title: string
  players: LineupPlayer[]
}) {
  return (
    <div>
      <h4 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">
        {title} ({players.length})
      </h4>
      {players.length === 0 ? (
        <p className="text-muted-foreground text-sm">No players listed.</p>
      ) : (
        <ul className="space-y-1.5">
          {players.map((player) => (
            <li
              key={player.id}
              className="bg-background/70 border-border/60 flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm"
            >
              <span className="bg-muted text-muted-foreground min-w-7 rounded px-1.5 py-0.5 text-center text-xs font-semibold tabular-nums">
                {player.jersey_no || '-'}
              </span>
              <span className="text-foreground truncate font-medium">
                {player.pname}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function splitLineup(players: LineupPlayer[]) {
  const starters: LineupPlayer[] = []
  const substitutes: LineupPlayer[] = []

  for (const player of players) {
    const type = player.player_type.toLowerCase()
    if (type.includes('sub')) {
      substitutes.push(player)
    } else {
      starters.push(player)
    }
  }

  return { starters, substitutes }
}
