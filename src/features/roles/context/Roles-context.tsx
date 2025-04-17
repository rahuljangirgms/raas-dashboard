// import React, { useState } from 'react'
// import useDialogState from '@/hooks/use-dialog-state'
// import { Role } from '../data/schema'

// type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

// interface UsersContextType {
//   open: UsersDialogType | null
//   setOpen: (str: UsersDialogType | null) => void
//   currentRow: Role | null
//   setCurrentRow: React.Dispatch<React.SetStateAction<Role | null>>
// }

// const UsersContext = React.createContext<UsersContextType | null>(null)

// interface Props {
//   children: React.ReactNode
// }

// export default function UsersProvider({ children }: Props) {
//   const [open, setOpen] = useDialogState<UsersDialogType>(null)
//   const [currentRow, setCurrentRow] = useState<Role | null>(null)

//   return (
//     <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
//       {children}
//     </UsersContext>
//   )
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const useUsers = () => {
//   const usersContext = React.useContext(UsersContext)

//   if (!usersContext) {
//     throw new Error('useUsers has to be used within <UsersContext>')
//   }

//   return usersContext
// }


'use client'

import React, { useEffect, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Role } from '../data/schema'
import { getRoles } from '../data/roles'

type RolesDialogType = 'add' | 'edit' | 'delete' | 'invite'


interface RolesContextType {
  open: RolesDialogType | null
  setOpen: (str: RolesDialogType | null) => void
  currentRow: Role | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Role | null>>
  roles: Role[]
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
  refreshRoles: () => Promise<void>
  loading: boolean
  error: string | null
}

const RolesContext = React.createContext<RolesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RolesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<RolesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Role | null>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshRoles = async () => {
    setLoading(true)
    try {
      const result = await getRoles()
      setRoles(result)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to load roles.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshRoles()
  }, [])

  return (
    <RolesContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        roles,
        setRoles,
        refreshRoles,
        loading,
        error,
      }}
    >
      {children}
    </RolesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRoles = () => {
  const context = React.useContext(RolesContext)
  if (!context) {
    throw new Error('useRoles must be used within <RolesProvider>')
  }
  return context
}
