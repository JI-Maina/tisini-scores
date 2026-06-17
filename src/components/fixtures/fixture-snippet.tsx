import { CalendarIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import type { RecentFixture, UpcomingFixture } from '#/lib/types'
import { cn, logoFor, parseScore, formatMatchDate } from '#/lib/utils'
import { use } from 'react'

type FixtureSnippetPayload = Pick<
  RecentFixture | UpcomingFixture,
  'fixture' | 'logos'
>

export function FixtureSnippet({
  variant,
  data,
  currentTeamId,
  leagueSlug,
  seasonId,
}: {
  variant: 'recent' | 'upcoming'
  data: Promise<FixtureSnippetPayload | null>
  currentTeamId: number
  leagueSlug: string
  seasonId: number
}) {
  const payload = use(data) as FixtureSnippetPayload | null | undefined

  if (!payload?.fixture) {
    return (
      <FixtureSnippetEmpty
        title={variant === 'recent' ? 'Recent result' : 'Next match'}
        message={
          variant === 'recent'
            ? 'No recent match with lineup for this season yet.'
            : 'No upcoming fixture scheduled for this team in the current view.'
        }
      />
    )
  }

  const f = payload.fixture
  const logo1 = logoFor(f.team1_id, payload.logos)
  const logo2 = logoFor(f.team2_id, payload.logos)

  const home = variant === 'recent' ? parseScore(f.home_score) : 0
  const away = variant === 'recent' ? parseScore(f.away_score) : 0
  const homeLeading = variant === 'recent' && home > away
  const awayLeading = variant === 'recent' && away > home

  const linkLabel = variant === 'recent' ? 'Match centre →' : 'Match preview →'

  return (
    <article className="sp-panel flex flex-col">
      <div className="sp-panel-header flex flex-wrap items-center justify-between gap-1.5 px-3 py-2">
        <span className="text-muted-foreground flex items-center gap-1 text-[0.65rem]">
          <CalendarIcon className="size-3 shrink-0" aria-hidden />
          {formatMatchDate(f.game_date)}
        </span>
        <span className="text-primary border-primary/20 rounded border bg-primary/10 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide">
          {f.game_status}
        </span>
      </div>

      <div
        className={cn(
          'flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-2',
          variant === 'upcoming' && 'flex-1',
        )}
      >
        <TeamRow
          name={f.team1_name}
          logo={logo1}
          align="end"
          emphasis={variant === 'recent' && homeLeading}
          highlight={f.team1_id === currentTeamId}
          compact
        />
        {variant === 'recent' ? (
          <div className="font-heading text-foreground flex shrink-0 flex-row items-center justify-center gap-1 px-1 text-lg font-bold tabular-nums">
            <span
              className={
                homeLeading ? 'text-primary font-semibold' : 'text-muted-foreground'
              }
            >
              {home}
            </span>
            <span className="text-muted-foreground font-normal">—</span>
            <span
              className={
                awayLeading ? 'text-primary font-semibold' : 'text-muted-foreground'
              }
            >
              {away}
            </span>
          </div>
        ) : (
          <div className="text-muted-foreground flex shrink-0 justify-center px-1">
            <span className="font-heading text-xs font-semibold uppercase tracking-wide">
              vs
            </span>
          </div>
        )}
        <TeamRow
          name={f.team2_name}
          logo={logo2}
          align="start"
          emphasis={variant === 'recent' && awayLeading}
          highlight={f.team2_id === currentTeamId}
          compact
        />
      </div>

      <div className="border-border/70 mt-auto border-t bg-accent/30 px-3 py-2">
        <Link
          to="/$leagueSlug/matches/$matchId"
          params={{ leagueSlug, matchId: String(f.id) }}
          search={{ season: String(seasonId) }}
          className="text-primary text-xs font-semibold hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </article>
  )
}

function FixtureSnippetEmpty({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <article className="border-sportpesa-azure/20 flex min-h-[9.5rem] flex-col justify-center gap-1 rounded-xl border border-dashed border-l-4 border-l-sportpesa-malibu/50 bg-accent/20 px-4 py-4">
      <p className="text-foreground text-[0.65rem] font-semibold uppercase tracking-wide">
        {title}
      </p>
      <p className="text-muted-foreground text-sm leading-snug">{message}</p>
    </article>
  )
}

function TeamRow({
  name,
  logo,
  align,
  emphasis,
  highlight,
  compact,
}: {
  name: string
  logo: string
  align: 'end' | 'start'
  emphasis: boolean
  highlight: boolean
  compact?: boolean
}) {
  const isEnd = align === 'end'
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 items-center',
        compact ? 'gap-2' : 'gap-3',
        isEnd ? 'flex-row-reverse sm:justify-end' : 'flex-row sm:justify-start',
      )}
    >
      {logo ? (
        <img
          src={logo}
          alt=""
          className={cn(
            'border-border shrink-0 rounded-full border object-cover',
            compact ? 'size-8' : 'size-10 sm:size-11',
          )}
        />
      ) : (
        <div
          className={cn(
            'border-border bg-muted shrink-0 rounded-full border',
            compact ? 'size-8' : 'size-10 sm:size-11',
          )}
        />
      )}
      <span
        className={cn(
          'truncate font-medium',
          compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base',
          emphasis && 'font-semibold',
          highlight && 'text-primary',
        )}
      >
        {name}
      </span>
    </div>
  )
}
