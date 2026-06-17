import { SearchIcon } from 'lucide-react'
import { Link, useSearch } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

const navLinkClass =
  'rounded-md px-3 py-1.5 text-sm font-semibold tracking-wide text-muted-foreground transition-colors hover:bg-accent hover:text-primary'

const navLinkActiveClass =
  'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary'

export default function SiteHeader() {
  const search = useSearch({ strict: false })

  const season =
    typeof search.season === 'string' && search.season.trim() !== ''
      ? search.season
      : undefined

  return (
    <header className="sticky top-2 z-50 py-2">
      <div className="border-sportpesa-azure/25 bg-card/90 flex items-center justify-between gap-4 rounded-2xl border border-l-4 border-l-sportpesa-azure px-4 py-3 shadow-sm backdrop-blur-md sm:px-5">
        <Link
          to="/"
          search={{ season }}
          className="group flex shrink-0 items-baseline gap-1"
        >
          <span className="font-heading text-sportpesa-navy text-xl font-bold tracking-tight transition-colors group-hover:text-primary sm:text-2xl dark:text-foreground">
            SportPesa
          </span>
          <span className="bg-sportpesa-azure rounded-md px-1.5 py-0.5 font-sans text-base font-black tracking-wider text-white shadow-sm sm:text-lg">
            7s
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/"
                search={{ season }}
                activeOptions={{ exact: true }}
                activeProps={{ className: cn(navLinkClass, navLinkActiveClass) }}
                className={navLinkClass}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/stats"
                search={{ season }}
                preload="intent"
                activeProps={{ className: cn(navLinkClass, navLinkActiveClass) }}
                className={navLinkClass}
              >
                Stats
              </Link>
            </li>
            <li>
              <Link
                to="/teams"
                search={{ season }}
                preload="intent"
                activeProps={{ className: cn(navLinkClass, navLinkActiveClass) }}
                className={navLinkClass}
              >
                Teams
              </Link>
            </li>
            <li>
              <Link
                to="/standings"
                search={{ season }}
                preload="intent"
                activeProps={{ className: cn(navLinkClass, navLinkActiveClass) }}
                className={navLinkClass}
              >
                Standings
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          aria-label="Search"
          className="text-muted-foreground hover:bg-accent hover:text-primary rounded-md p-2 transition-colors"
        >
          <SearchIcon className="size-5" />
        </button>
      </div>
    </header>
  )
}
