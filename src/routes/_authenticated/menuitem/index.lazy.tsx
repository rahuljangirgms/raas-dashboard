import { createLazyFileRoute } from '@tanstack/react-router'
import MenuItem from '@/features/menuitem'


export const Route = createLazyFileRoute('/_authenticated/menuitem/')({
  component: MenuItem,
})

