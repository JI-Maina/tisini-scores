import { Loader2Icon } from 'lucide-react'
import type { Fixture } from '#/lib/types'

const FixtureHeader = ({ details }: { details: Fixture }) => {
  const homeScore = Number(details.home_score)
  const awayScore = Number(details.away_score)
  const homeWin = homeScore > awayScore
  const awayWin = awayScore > homeScore

  const scoreStatus =
    details.game_status === 'ended' || details.game_status === 'FT'
      ? 'FT'
      : (details.minute === 45 || details.minute === 46) &&
          details.game_moment === 'secondhalf'
        ? 'HT'
        : `${details.minute}'`

  return (
    <div className="border-border bg-card/90 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm">
      <div className="from-primary/12 border-border bg-gradient-to-r to-transparent border-b px-3 py-2 sm:px-4">
        <div className="grid grid-cols-3 items-center gap-2">
          <div className="justify-self-start rounded-md bg-background/80 px-2 py-1 text-xs font-semibold sm:text-sm">
            {details.matchday}
          </div>
          <div className="text-foreground text-center text-sm font-semibold capitalize sm:text-base">
            {details.league}
          </div>
          <div className="text-muted-foreground justify-self-end rounded-md bg-background/80 px-2 py-1 text-xs font-semibold sm:text-sm">
            {details.game_date.split(' ')[0]}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 py-4 sm:gap-6 sm:px-6">
        <div className="flex flex-col items-center gap-2">
          <div className="border-border bg-background/85 flex h-14 w-14 items-center justify-center rounded-full border p-1.5 shadow-sm sm:h-16 sm:w-16">
            <img
              className="h-full w-full object-contain"
              src={details.team1_logo}
              alt={`${details.team1_name} logo`}
            />
          </div>
          <div className="text-foreground max-w-[12rem] text-center text-sm font-semibold sm:text-lg">
            {details.team1_name}
          </div>
        </div>

        <div className="border-border bg-background/75 min-w-[6rem] rounded-lg border px-3 py-2 text-center shadow-sm sm:min-w-[7.5rem] sm:px-4 sm:py-2.5">
          {details.game_status === 'notstarted' ? (
            <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm font-semibold">
              <Loader2Icon className="size-4 animate-spin" aria-hidden />
              {details.matchtime || 'Pending'}
            </div>
          ) : (
            <>
              <div className="text-foreground flex items-baseline justify-center gap-1 font-bold tabular-nums sm:text-3xl">
                <span className={homeWin ? 'text-foreground' : 'text-muted-foreground'}>
                  {details.home_score}
                </span>
                <span className="text-muted-foreground font-normal">&ndash;</span>
                <span className={awayWin ? 'text-foreground' : 'text-muted-foreground'}>
                  {details.away_score}
                </span>
              </div>
              <div className="text-muted-foreground mt-0.5 text-xs font-semibold uppercase tracking-wide sm:text-sm">
                {scoreStatus}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="border-border bg-background/85 flex h-14 w-14 items-center justify-center rounded-full border p-1.5 shadow-sm sm:h-16 sm:w-16">
            <img
              className="h-full w-full object-contain"
              src={details.team2_logo}
              alt={`${details.team2_name} logo`}
            />
          </div>
          <div className="text-foreground max-w-[12rem] text-center text-sm font-semibold sm:text-lg">
            {details.team2_name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FixtureHeader
