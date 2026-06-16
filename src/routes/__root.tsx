import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import SiteFooter from '#/components/site/site-footer'
import SiteHeader from '#/components/site/site-header'
import { getLeaguesFn } from '#/data/leagues'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  errorComponent: RootError,
  loader: async () => {
    const leagues = await getLeaguesFn()
    return { leagues }
  },
})

function RootError({ error }: { error: Error }) {
  console.error(error)
  return (
    <div>
      <h1>Error</h1>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { leagues } = Route.useLoaderData()

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <main className="container mx-auto">
          <SiteHeader data={leagues} />

          <div className="min-h-screen">{children}</div>
          <SiteFooter />
        </main>

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
