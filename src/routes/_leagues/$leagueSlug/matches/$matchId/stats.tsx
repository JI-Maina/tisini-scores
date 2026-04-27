import { createFileRoute } from '@tanstack/react-router'

import { Route as MatchLayoutRoute } from './route'
import type { EventStat } from '#/lib/types'
import { cn } from '#/lib/utils'

export const Route = createFileRoute(
  '/_leagues/$leagueSlug/matches/$matchId/stats',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { details } = MatchLayoutRoute.useLoaderData()

  const stats = details.stats

  const statRows = buildStatRows(stats.home, stats.away)

  return (
    <div className="space-y-4">
      <div className="border-border bg-card/80 overflow-hidden rounded-lg border">
        <div className="divide-border divide-y">
          {statRows.map((row) => {
            const homeValue = toNumber(row.homeTotal)
            const awayValue = toNumber(row.awayTotal)
            const total = homeValue + awayValue
            const homePct = total > 0 ? (homeValue / total) * 100 : 50
            const awayPct = total > 0 ? (awayValue / total) * 100 : 50
            const homeLeads = homeValue > awayValue
            const awayLeads = awayValue > homeValue

            return (
              <div key={row.eventId} className="space-y-2 px-3 py-2.5 sm:px-4">
                <div className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2 text-sm">
                  <span
                    className={cn(
                      'text-left tabular-nums',
                      homeLeads
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground',
                    )}
                  >
                    {row.homeTotal}
                  </span>
                  <span className="text-muted-foreground text-center text-xs font-semibold uppercase tracking-wide sm:text-[0.7rem]">
                    {row.eventName}
                  </span>
                  <span
                    className={cn(
                      'text-right tabular-nums',
                      awayLeads
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground',
                    )}
                  >
                    {row.awayTotal}
                  </span>
                </div>

                <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                  <div className="flex h-full w-full">
                    <div
                      className="bg-primary/85 h-full transition-all"
                      style={{ width: `${homePct}%` }}
                    />
                    <div
                      className="bg-accent/85 h-full transition-all"
                      style={{ width: `${awayPct}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

type StatRow = {
  eventId: number
  eventName: string
  homeTotal: number
  awayTotal: number
}

function buildStatRows(home: EventStat[], away: EventStat[]): StatRow[] {
  const byEventId = new Map<number, StatRow>()

  for (const h of home) {
    byEventId.set(h.event_id, {
      eventId: h.event_id,
      eventName: h.event_name,
      homeTotal: h.total,
      awayTotal: 0,
    })
  }

  for (const a of away) {
    const existing = byEventId.get(a.event_id)
    if (existing) {
      existing.awayTotal = a.total
      if (!existing.eventName) existing.eventName = a.event_name
    } else {
      byEventId.set(a.event_id, {
        eventId: a.event_id,
        eventName: a.event_name,
        homeTotal: 0,
        awayTotal: a.total,
      })
    }
  }

  return [...byEventId.values()].sort((a, b) => b.eventId - a.eventId)
}

function toNumber(value: number): number {
  return Number.isFinite(value) ? value : 0
}
