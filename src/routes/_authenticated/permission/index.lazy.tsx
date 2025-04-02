import { createLazyFileRoute } from '@tanstack/react-router'
import Permission from '@/features/permission'

export const Route = createLazyFileRoute('/_authenticated/permission/')({
  component: Permission,
})

