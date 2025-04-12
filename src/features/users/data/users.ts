// import { faker } from '@faker-js/faker'

// export const users = Array.from({ length: 50 }, () => {
//   const firstName = faker.person.firstName()
//   const lastName = faker.person.lastName()
//   return {
//     id: faker.string.uuid(),
//     firstName,
//     lastName,
//     username: faker.internet
//       .username({ firstName, lastName })
//       .toLocaleLowerCase(),
//     email: faker.internet.email({ firstName }).toLocaleLowerCase(),
//     phoneNumber: faker.phone.number({ style: 'international' }),
//     status: faker.helpers.arrayElement([
//       'active',
//       'inactive',
//       'invited',
//       'suspended',
//     ]),
//     role: faker.helpers.arrayElement([
//       'superadmin',
//       'admin',
//       'cashier',
//       'manager',
//     ]),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//   }
// })


// import { userService } from '@/services/userService'
// import { User, userListSchema } from './schema'

// export const getUsers = async (): Promise<User[]> => {
//   const { users, error } = await userService.getAll()

//   if (error) {
//     console.error('Failed to fetch users:', error)
//     return []
//   }

//   const parsed = userListSchema.safeParse(users)
//   if (!parsed.success) {
//     console.error('User validation failed:', parsed.error)
//     return []
//   }

//   return parsed.data
// }


import { userService } from '@/services/userService'
import { User, userListSchema } from './schema'

/**
 * Transforms raw Supabase user data to match the frontend User schema
 */
export const getUsers = async (): Promise<User[]> => {
  const { users, error } = await userService.getAll()

  if (error) {
    console.error('❌ Failed to fetch users:', error)
    return []
  }

  // Transform Supabase fields to frontend schema shape
  const transformed = users.map((user: any) => ({
    id: user.id,
    firstName: user.first_name ?? null,
    lastName: user.last_name ?? null,
    username:
      user.display_name?.toLowerCase() ??
      user.email?.split('@')[0]?.toLowerCase() ??
      'unknown',
    email: user.email ?? '',
    phoneNumber: user.phone_number ?? null,
    status: user.status?.toLowerCase() ?? null,
    role: (user.role ?? 'user').toLowerCase(),
    createdAt: new Date(user.created_at),
    updatedAt: new Date(user.last_sign_in ?? user.created_at),
  }))

  const parsed = userListSchema.safeParse(transformed)

  if (!parsed.success) {
    console.error('❌ User validation failed:', parsed.error.flatten())
    return []
  }

  return parsed.data
}
