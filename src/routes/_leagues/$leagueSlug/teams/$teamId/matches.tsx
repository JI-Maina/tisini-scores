import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_leagues/$leagueSlug/teams/$teamId/matches',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_leagues/$leagueSlug/teams/$teamId/matches"!</div>
}
