import { Link } from '@tanstack/react-router'
import { use } from 'react'

import type { TopPlayer } from '#/lib/types'
import { ChevronRightIcon } from 'lucide-react'

export function PlayerStatsCard({
  title,
  playersPromise,
  leagueSlug,
  seasonId,
}: {
  title: string
  playersPromise: Promise<TopPlayer[]>
  leagueSlug: string
  seasonId: number
}) {
  const players = use(playersPromise)

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
        {players.slice(0, 10).map((player, index) => (
          <li
            key={player.player_id}
            className="hover:bg-muted/50 flex items-center gap-2.5 rounded-md px-2 py-2"
          >
            <span className="text-muted-foreground w-5 text-xs font-semibold tabular-nums">
              {index + 1}
            </span>
            {player.passportphoto || player.team_logo ? (
              <img
                src={player.passportphoto || player.team_logo || ''}
                alt={player.name}
                className="border-border size-7 rounded-full border object-cover"
              />
            ) : (
              <div className="bg-muted text-muted-foreground border-border grid size-7 place-items-center rounded-full border text-[10px] font-semibold">
                {player.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{player.name}</p>
              <p className="text-muted-foreground truncate text-xs">
                {player.team_name}
              </p>
            </div>
            <span className="ml-auto text-sm font-semibold tabular-nums">
              {player.total}
            </span>
          </li>
        ))}
        {!players.length ? (
          <li className="text-muted-foreground px-2 py-3 text-sm">
            No stats available.
          </li>
        ) : null}
      </ol>
    </article>
  )
}
