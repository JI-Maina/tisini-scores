import SiteFooter from '#/components/site/site-footer'
import SiteHeader from '#/components/site/site-header'

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_site')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen">
        <Outlet />
      </div>
      <SiteFooter />
    </>
  )
}
