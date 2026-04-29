import { Link } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'
import { use } from 'react'

import type { TopTeam } from '#/lib/types'

export function TeamStatsCard({
  title,
  teamsPromise,
  leagueSlug,
  seasonId,
}: {
  title: string
  teamsPromise: Promise<TopTeam[]>
  leagueSlug: string
  seasonId: number
}) {
  const teams = use(teamsPromise)

  return (
    <article className="border-border bg-card/90 rounded-xl border shadow-sm">
      <header className="border-border/70 flex items-center justify-between border-b px-4 py-3">
        <Link
          to="/$leagueSlug/stats"
          params={{ leagueSlug }}
          search={{ season: String(seasonId) }}
          className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>{title}</span>
          <ChevronRightIcon className="size-3.5" aria-hidden />
        </Link>
      </header>
      <ol className="space-y-1 p-2">
        {teams.slice(0, 10).map((team, index) => (
          <li
            key={team.team_id}
            className="hover:bg-muted/50 flex items-center gap-2.5 rounded-md px-2 py-2"
          >
            <span className="text-muted-foreground w-5 text-xs font-semibold tabular-nums">
              {index + 1}
            </span>
            <img
              src={team.team_logo}
              alt={`${team.team_name} logo`}
              className="border-border size-7 rounded-full border object-cover"
            />
            <span className="text-sm font-medium truncate">
              {team.team_name}
            </span>
            <span className="ml-auto text-sm font-semibold tabular-nums">
              {team.total}
            </span>
          </li>
        ))}
        {!teams.length ? (
          <li className="text-muted-foreground px-2 py-3 text-sm">
            No stats available.
          </li>
        ) : null}
      </ol>
    </article>
  )
}
