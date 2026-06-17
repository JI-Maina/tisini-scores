import type { TeamPlayer } from '#/lib/types'
import { cn } from '#/lib/utils'

function displayName(pl: TeamPlayer['player']) {
  const parts = [pl.first_name, pl.other_name, pl.sir_name].filter(
    (s) => typeof s === 'string' && s.trim() !== '',
  )
  const joined = parts.join(' ').replace(/\s+/g, ' ').trim()
  return joined || 'Player'
}

export function PlayerCard({ player }: { player: TeamPlayer }) {
  const pl = player.player
  const name = displayName(pl)
  const hasPhoto = Boolean(pl.passportphoto?.trim())
  const jersey =
    typeof player.current_jersey_no === 'number' &&
    Number.isFinite(player.current_jersey_no)
      ? player.current_jersey_no
      : null

  return (
    <article
      className={cn(
        'sp-panel group relative flex flex-col overflow-hidden',
        'transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-2 hover:ring-primary/20',
      )}
    >
      <div className="from-sportpesa-malibu/10 to-accent/40 relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b">
        {hasPhoto ? (
          <img
            src={pl.passportphoto}
            alt=""
            className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="text-muted-foreground/35 from-sportpesa-malibu/15 to-accent/50 flex size-full items-center justify-center bg-gradient-to-b">
            <span className="font-heading text-5xl font-bold tabular-nums">
              {jersey ?? '--'}
            </span>
          </div>
        )}
        <div className="absolute right-2 top-2">
          <span className="border-primary/20 bg-primary/10 text-primary inline-flex min-w-8 items-center justify-center rounded-md border px-2 py-0.5 text-xs font-bold tabular-nums shadow-sm backdrop-blur-sm">
            {jersey != null ? jersey : '--'}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 pt-2.5">
        <h3 className="font-heading text-foreground line-clamp-2 min-h-10 text-sm font-semibold leading-snug tracking-tight">
          {name}
        </h3>
        <div className="text-muted-foreground mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[0.7rem] leading-tight">
          {pl.current_position ? (
            <span className="bg-primary/8 text-primary rounded px-1.5 py-0.5 font-medium">
              {pl.current_position}
            </span>
          ) : null}
          {pl.nationality ? (
            <span className="max-w-full truncate">{pl.nationality}</span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
