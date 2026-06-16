import { getLeaguesFn } from '#/data/leagues'
import SiteFooter from '#/components/site/site-footer'
import SiteHeader from '#/components/site/site-header'

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_site')({
  loader: async () => {
    const leagues = await getLeaguesFn()
    return { leagues }
  },
  component: RouteComponent,
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
