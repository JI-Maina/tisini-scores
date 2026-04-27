import type { League } from '#/lib/types'

export function leagueToSlug(league: Pick<League, 'id' | 'name'>): string {
  const base = league.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'league'}-${league.id}`
}

export function leagueIdFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/)
  if (!match) return null
  const id = Number(match[1])
  return Number.isFinite(id) ? id : null
}
