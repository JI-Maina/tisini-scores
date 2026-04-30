import { use, useMemo } from 'react'
import { Loader2Icon } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

import type { Fixture } from '#/lib/types'

function parseScore(s: string) {
  const n = Number(s)
  return Number.isFinite(n) ? n : 0
}

export function FixturesList({
  data,
  leagueSlug,
  seasonId,
}: {
  data: Promise<Fixture[]>
  leagueSlug: string
  seasonId: number
}) {
  const fixtures = use(data)

  const navigate = useNavigate()

  const groupedFixtures = useMemo((): Record<string, Fixture[]> => {
    const grouped: Record<string, Fixture[]> = {}

    for (const fixture of fixtures) {
      const round = fixture.matchday
      if (!grouped[round]) {
        grouped[round] = []
      }
      grouped[round].push(fixture)
    }

    return grouped
  }, [fixtures])

  return (
    <div className="space-y-8">
      {Object.keys(groupedFixtures).map((round) => {
        const roundFixtures = groupedFixtures[round]
        return (
          <section
            key={round}
            className="border-border bg-card/90 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm"
          >
            <div className="from-primary/12 border-border bg-gradient-to-r to-transparent border-b px-4 py-3">
              <h2 className="font-heading text-foreground text-lg font-semibold">
                Round {round}
                {roundFixtures[0]?.series ? (
                  <span className="text-muted-foreground ml-2 text-sm font-normal">
                    ({roundFixtures[0].series})
                  </span>
                ) : null}
              </h2>
            </div>

            <ul className="divide-border divide-y">
              {roundFixtures.map((fixture) => {
                const home = parseScore(fixture.home_score)
                const away = parseScore(fixture.away_score)
                const homeLeading = home > away
                const awayLeading = away > home

                return (
                  <li key={fixture.id}>
                    <button
                      type="button"
                      onClick={() => {
                        navigate({
                          to: '/$leagueSlug/matches/$matchId',
                          params: {
                            leagueSlug,
                            matchId: String(fixture.id),
                          },
                          search: {
                            season: String(seasonId),
                          },
                        })
                      }}
                      className="hover:bg-muted/50 cursor-pointer flex w-full items-center gap-2 px-3 py-3 text-left transition-colors sm:gap-4 sm:px-4"
                    >
                      {/* Home */}
                      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
                        <span className="text-foreground truncate text-sm font-medium sm:text-base">
                          {fixture.team1_name}
                        </span>
                        {fixture.team1_logo ? (
                          <img
                            className="border-border size-9 shrink-0 rounded-full border object-cover sm:size-10"
                            src={fixture.team1_logo}
                            alt={`${fixture.team1_name} logo`}
                          />
                        ) : (
                          <div className="bg-muted text-muted-foreground border-border grid size-9 place-items-center rounded-full border text-[10px] font-semibold">
                            {fixture.team1_name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Score / time */}
                      <div className="flex w-[5.5rem] shrink-0 flex-col items-center justify-center sm:w-28">
                        {fixture.game_status === 'notstarted' ? (
                          fixture.matchtime === '' ? (
                            <Loader2Icon
                              className="text-muted-foreground size-5 animate-spin"
                              aria-label="Kick-off pending"
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs font-medium tabular-nums sm:text-sm">
                              {fixture.matchtime}
                            </span>
                          )
                        ) : (
                          <>
                            <div className="text-foreground flex items-baseline gap-1 font-bold tabular-nums sm:gap-1.5 sm:text-2xl">
                              <span
                                className={
                                  homeLeading
                                    ? 'text-foreground'
                                    : 'text-muted-foreground'
                                }
                              >
                                {fixture.home_score}
                              </span>
                              <span className="text-muted-foreground font-normal sm:text-xl">
                                –
                              </span>
                              <span
                                className={
                                  awayLeading
                                    ? 'text-foreground'
                                    : 'text-muted-foreground'
                                }
                              >
                                {fixture.away_score}
                              </span>
                            </div>
                            <span className="text-muted-foreground mt-0.5 text-[0.65rem] font-medium uppercase tracking-wide sm:text-xs">
                              {fixture.game_status === 'ended' ||
                              fixture.game_status === 'FT'
                                ? 'FT'
                                : fixture.minute === 45 &&
                                    fixture.game_moment === 'secondhalf'
                                  ? 'HT'
                                  : `${fixture.minute}'`}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Away */}
                      <div className="flex min-w-0 flex-1 items-center justify-start gap-2 sm:gap-3">
                        {fixture.team2_logo ? (
                          <img
                            className="border-border size-9 shrink-0 rounded-full border object-cover sm:size-10"
                            src={fixture.team2_logo}
                            alt={`${fixture.team2_name} logo`}
                          />
                        ) : (
                          <div className="bg-muted text-muted-foreground border-border grid size-9 place-items-center rounded-full border text-[10px] font-semibold">
                            {fixture.team2_name.slice(0, 2).toUpperCase()}
                          </div>
                        )}

                        <span className="text-foreground truncate text-sm font-medium sm:text-base">
                          {fixture.team2_name}
                        </span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
