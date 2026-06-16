import { useEffect } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'

/** Adds ?season= to the URL on the client when the loader picked a default. */
export function useSyncDefaultSeason(seasonId: number) {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  useEffect(() => {
    if (
      typeof search.season === 'string' &&
      search.season.trim() !== ''
    ) {
      return
    }

    navigate({
      to: '.',
      search: (prev) => ({ ...prev, season: String(seasonId) }),
      replace: true,
    })
  }, [navigate, search.season, seasonId])
}
