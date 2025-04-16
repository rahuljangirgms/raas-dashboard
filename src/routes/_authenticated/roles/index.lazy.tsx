import { createLazyFileRoute } from '@tanstack/react-router'
import Roles from '@/features/users'


export const Route = createLazyFileRoute('/_authenticated/roles/')({
  component: Roles,
})

// function RouteComponent() {
//   return <div>Hello "/_authenticated/roles/"!</div>
// }





// import { createLazyFileRoute } from '@tanstack/react-router'
// import Users from '@/features/users'

// export const Route = createLazyFileRoute('/_authenticated/roles/')({
//   component: Users,
// })
