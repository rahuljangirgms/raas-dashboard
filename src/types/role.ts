// /types/role.ts

export interface Role {
    id: string
    role_name: string
    role_desc: string | null
    is_active: boolean
    created_by: string | null
    updated_by: string | null
    deleted_by: string | null
    created_at: string // ISO date string (TIMESTAMPTZ)
    updated_at: string // ISO date string (TIMESTAMPTZ)
    deleted_at: string | null // ISO date string or null
}
