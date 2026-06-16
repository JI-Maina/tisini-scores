import { cn } from '#/lib/utils'

export function StatCell({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: 'win' | 'draw' | 'loss'
}) {
  return (
    <div
      className={cn(
        'bg-background/90 flex flex-col items-center justify-center gap-1 px-3 py-5 sm:py-6',
        tone === 'win' && 'bg-emerald-500/8',
        tone === 'draw' && 'bg-amber-500/8',
        tone === 'loss' && 'bg-rose-500/8',
      )}
    >
      <span className="text-muted-foreground text-[0.65rem] font-semibold uppercase tracking-wide">
        {label}
      </span>
      <span className="font-heading text-foreground text-2xl font-bold tabular-nums sm:text-3xl">
        {value}
      </span>
    </div>
  )
}
