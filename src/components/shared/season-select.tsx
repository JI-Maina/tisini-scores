import type { Season } from '#/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'

export function SeasonSelect({
  value,
  seasons,
  onValueChange,
}: {
  value: string
  seasons: Season[]
  onValueChange: (value: string) => void
}) {
  return (
    <label className="text-sm">
      <span className="text-muted-foreground mb-1 block text-xs font-semibold uppercase tracking-wide">
        Season
      </span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select season" />
        </SelectTrigger>
        <SelectContent>
          {seasons.map((season) => (
            <SelectItem key={season.id} value={String(season.id)}>
              {season.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}
