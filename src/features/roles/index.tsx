// import { Header } from '@/components/layout/header'
// import { Main } from '@/components/layout/main'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// import { columns } from './components/roles-columns'
// import { UsersDialogs } from './components/roles-dialogs'
// import { UsersPrimaryButtons } from './components/roles-primary-buttons'
// import { UsersTable } from './components/roles-table'
// import UsersProvider from './context/Roles-context'
// // import { userListSchema } from './data/schema'
// // import { users } from './data/roles'

// import { roleSchema } from './data/schema'
// import { getRoles } from './data/roles'

// export default function Roles() {
//   // Parse user list
//   const userList = roleSchema.parse(getRoles)

//   return (
//     <UsersProvider>
//       <Header fixed>
//         <Search />
//         <div className='ml-auto flex items-center space-x-4'>
//           <ThemeSwitch />
//           <ProfileDropdown />
//         </div>
//       </Header>

//       <Main>
//         <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
//           <div>
//             <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
//             <p className='text-muted-foreground'>
//               Manage your users and their roles here.
//             </p>
//           </div>
//           <UsersPrimaryButtons />
//         </div>
//         <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
//           <UsersTable data={userList} columns={columns} />
//         </div>
//       </Main>

//       <UsersDialogs />
//     </UsersProvider>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

import { columns } from './components/roles-columns'
import { RolesDialogs } from './components/roles-dialogs'
import { RolesPrimaryButtons } from './components/roles-primary-buttons'
import { RolesTable } from './components/roles-table'
import RolesProvider from './context/Roles-context'

import { getRoles } from './data/roles'
import { Role } from './data/schema'

export default function Roles() {
  const [roleList, setRoleList] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const roles = await getRoles()
        setRoleList(roles)
      } catch (err) {
        console.error(err)
        setError('Failed to load roles.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <RolesProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Role List</h2>
            <p className='text-muted-foreground'>
              Manage your roles and permissions here.
            </p>
          </div>
          <RolesPrimaryButtons />
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {loading ? (
            <p>Loading roles...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <RolesTable data={roleList} columns={columns} />
          )}
        </div>
      </Main>

      <RolesDialogs />
    </RolesProvider>
  )
}
