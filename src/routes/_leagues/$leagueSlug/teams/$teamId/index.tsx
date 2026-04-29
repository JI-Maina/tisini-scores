import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_leagues/$leagueSlug/teams/$teamId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { teamId } = Route.useParams()

  return (
    <section className="border-border bg-card/80 rounded-xl border p-4">
      <h1 className="font-heading text-foreground text-2xl font-bold">
        Team {teamId}
      </h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Team details page coming next.
      </p>
    </section>
  )
}
