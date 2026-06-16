import { SearchIcon } from 'lucide-react'
import { Link, useSearch } from '@tanstack/react-router'

import { tisiniLogo } from '#/assets'
import type { League } from '#/lib/types'

const staticNavItems = [
  {
    label: 'Home',
    to: '/',
  },
]

export default function SiteHeader({ data }: { data: League[] }) {
  const search = useSearch({ strict: false })

  const season =
    typeof search.season === 'string' && search.season.trim() !== ''
      ? search.season
      : undefined

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

            <li>
              <Link
                to="/stats"
                search={{ season }}
                className="text-lg font-semibold"
                preload="intent"
              >
                Stats
              </Link>
            </li>

            <li>
              <Link
                to="/teams"
                search={{ season }}
                className="text-lg font-semibold"
                preload="intent"
              >
                Teams
              </Link>
            </li>

            <li>
              <Link
                to="/standings"
                search={{ season }}
                className="text-lg font-semibold"
                preload="intent"
              >
                Standings
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <SearchIcon className="w-6 h-6" />
        </div>
      </div>
    </header>
  )
}
