import { createFileRoute, Outlet } from '@tanstack/react-router'

import SiteFooter from '#/components/site/site-footer'
import SiteHeader from '#/components/site/site-header'
import { getLeaguesFn } from '#/data/leagues'

export const Route = createFileRoute('/_leagues')({
  component: RouteComponent,
  loader: async () => {
    const leagues = await getLeaguesFn()
    return { leagues }
  },
})

function RouteComponent() {
  const { leagues } = Route.useLoaderData()

  return (
    <>
      <SiteHeader data={leagues} />

      <div className="min-h-screen">
        <Outlet />
      </div>
      <SiteFooter />
    </>
  )
}
