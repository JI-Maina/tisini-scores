import { ExternalLinkIcon } from 'lucide-react'
import type { TeamDetails } from '#/lib/types'

export function TeamHeader({ team }: { team: TeamDetails }) {
  return (
    <header className="sp-panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      <img
        src={team.team_logo}
        alt={`${team.team_name} crest`}
        className="border-sportpesa-azure/20 size-16 shrink-0 rounded-xl border bg-background object-contain sm:size-20"
      />
      <div className="min-w-0 flex-1 space-y-2">
        <h1 className="font-heading text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          {team.team_name}
        </h1>
        {team.description ? (
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {team.description}
          </p>
        ) : null}
        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm">
          {team.year_founded ? (
            <span className="tabular-nums">Founded {team.year_founded}</span>
          ) : null}
          {team.num_players > 0 ? (
            <span className="tabular-nums">{team.num_players} players</span>
          ) : null}
          {team.website_url ? (
            <a
              href={team.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
            >
              Official site
              <ExternalLinkIcon className="size-3.5 shrink-0" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </header>
  )
}
