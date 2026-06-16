import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { H2HLogo, LineupPlayer } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(name: string, id: number): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'item'}-${id}`
}

export function slugToId(slug: string): number | null {
  const match = slug.match(/-(\d+)$/)
  if (!match) return null
  const id = Number(match[1])
  return Number.isFinite(id) ? id : null
}

export function logoFor(teamId: number, logos: H2HLogo[]) {
  return logos.find((l) => l.team_id === teamId)?.logo ?? ''
}

export function parseScore(s: string) {
  const n = Number(s)
  return Number.isFinite(n) ? n : 0
}

export function formatMatchDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function splitLineup(players: LineupPlayer[]) {
  const starters: LineupPlayer[] = []
  const substitutes: LineupPlayer[] = []

  for (const player of players) {
    const type = player.player_type.toLowerCase()
    if (type.includes('sub')) {
      substitutes.push(player)
    } else {
      starters.push(player)
    }
  }

  return { starters, substitutes }
}
