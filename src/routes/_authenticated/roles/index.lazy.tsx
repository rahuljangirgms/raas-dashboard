import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/roles/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/roles/"!</div>
}
