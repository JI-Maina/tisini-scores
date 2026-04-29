import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
