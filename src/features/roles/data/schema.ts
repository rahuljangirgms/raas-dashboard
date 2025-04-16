// import { z } from 'zod'

// const userStatusSchema = z.union([
//   z.literal('active'),
//   z.literal('inactive'),
//   z.literal('invited'),
//   z.literal('suspended'),
// ])
// export type UserStatus = z.infer<typeof userStatusSchema>

// const userRoleSchema = z.union([
//   z.literal('superadmin'),
//   z.literal('admin'),
//   z.literal('cashier'),
//   z.literal('manager'),
// ])

// const userSchema = z.object({
//   id: z.string(),
//   firstName: z.string(),
//   lastName: z.string(),
//   username: z.string(),
//   email: z.string(),
//   phoneNumber: z.string(),
//   status: userStatusSchema,
//   role: userRoleSchema,
//   createdAt: z.coerce.date(),
//   updatedAt: z.coerce.date(),
// })
// export type User = z.infer<typeof userSchema>

// export const userListSchema = z.array(userSchema)

// /src/features/roles/data/schema.ts
// src/features/roles/data/schema.ts
import { z } from 'zod'

export const roleSchema = z.object({
  id: z.string(),
  role_name: z.string(),
  role_desc: z.string().nullable(),
  is_active: z.boolean(),
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  deleted_by: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
})

export type Role = z.infer<typeof roleSchema>
export const roleListSchema = z.array(roleSchema)

