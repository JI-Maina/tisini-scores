import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams/$teamId/stats')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/_leagues/$leagueSlug/teams/teams/stats"!</div>
}
