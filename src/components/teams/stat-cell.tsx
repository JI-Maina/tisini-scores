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
        tone === 'win' && 'bg-primary/10',
        tone === 'draw' && 'bg-sportpesa-malibu/15',
        tone === 'loss' && 'bg-sportpesa-spicy-mix/10',
      )}
    >
      <span className="text-muted-foreground text-[0.65rem] font-semibold uppercase tracking-wide">
        {label}
      </span>
      <span
        className={cn(
          'font-heading text-2xl font-bold tabular-nums sm:text-3xl',
          tone === 'win' && 'text-primary',
          tone === 'draw' && 'text-sportpesa-malibu',
          tone === 'loss' && 'text-sportpesa-spicy-mix',
          !tone && 'text-foreground',
        )}
      >
        {value}
      </span>
    </div>
  )
}
