import { SearchIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { tisiniLogo } from '#/assets'
import type { League } from '#/lib/types'
import { leagueToSlug } from '#/lib/league-slug'

const staticNavItems = [
  {
    label: 'Home',
    to: '/',
  },
]

export default function SiteHeader({ data }: { data: League[] }) {
  const activeLeagueSlug = data[0] ? leagueToSlug(data[0]) : null

  return (
    <header className="py-2">
      <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/75 px-4 shadow-sm backdrop-blur-md">
        <Link to="/">
          <img
            src={tisiniLogo}
            alt="Tisini Logo"
            className="w-24 h-24 object-contain max-w-full"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {staticNavItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-lg font-semibold">
                  {item.label}
                </Link>
              </li>
            ))}
            {activeLeagueSlug ? (
              <li>
                <Link
                  to="/$leagueSlug/matches"
                  params={{ leagueSlug: activeLeagueSlug }}
                  search={{ season: undefined }}
                  className="text-lg font-semibold"
                  preload="intent"
                >
                  Matches
                </Link>
              </li>
            ) : null}
            {activeLeagueSlug ? (
              <li>
                <Link
                  to="/$leagueSlug/stats"
                  params={{ leagueSlug: activeLeagueSlug }}
                  search={{ season: undefined }}
                  className="text-lg font-semibold"
                  preload="intent"
                >
                  Stats
                </Link>
              </li>
            ) : null}
            {activeLeagueSlug ? (
              <li>
                <Link
                  to="/$leagueSlug/teams"
                  params={{ leagueSlug: activeLeagueSlug }}
                  search={{ season: undefined }}
                  className="text-lg font-semibold"
                  preload="intent"
                >
                  Teams
                </Link>
              </li>
            ) : null}
            {activeLeagueSlug ? (
              <li>
                <Link
                  to="/$leagueSlug/standings"
                  params={{ leagueSlug: activeLeagueSlug }}
                  search={{ season: undefined }}
                  className="text-lg font-semibold"
                  preload="intent"
                >
                  Standings
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>

        <div>
          <SearchIcon className="w-6 h-6" />
        </div>
      </div>
    </header>
  )
}
