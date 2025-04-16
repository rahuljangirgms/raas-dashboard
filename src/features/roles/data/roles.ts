// import { faker } from '@faker-js/faker'

// export const users = Array.from({ length: 20 }, () => {
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

// /src/features/roles/data/roles.ts
// src/features/roles/data/roles.ts
import { roleService } from '@/services/roleService'
import { Role, roleListSchema } from './schema'

export const getRoles = async (): Promise<Role[]> => {
  const { roles, error } = await roleService.getAll()

  if (error) {
    console.error('❌ Failed to fetch roles:', error)
    return []
  }

  const parsed = roleListSchema.safeParse(roles)

  if (!parsed.success) {
    console.error('❌ Role validation failed:', parsed.error.flatten())
    return []
  }

  return parsed.data
}


