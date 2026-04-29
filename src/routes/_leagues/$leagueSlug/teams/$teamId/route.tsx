import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_leagues/$leagueSlug/teams/$teamId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
