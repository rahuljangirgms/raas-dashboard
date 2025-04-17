import { supabase } from '@/lib/supabaseClient'
import { Role } from '@/types/role'

export const roleService = {
    // View all roles
    getAll: async () => {
        const { data, error } = await supabase.rpc('sp_role_view', {
            p_action: 'VIEWALL',
        })

        return {
            roles: data?.data ?? [],
            error: error ?? (data?.status !== 'SUCCESS' ? new Error(data?.message) : null),
        }
    },

    // Create new role
    create: async (creatorId: string, payload: any): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_role_actions', {
            p_action: 'CREATEROLE',
            p_user_id: creatorId,
            p_payload: payload,
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Create failed' }
        }

        return { result: data.data, error: null }
    },

    // Update role
    update: async (userId: string, payload: any): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_role_actions', {
            p_action: 'UPDATEROLE',
            p_user_id: userId,
            p_payload: payload,
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Update failed' }
        }

        return { result: data.data, error: null }
    },

    // Enable a role
    enable: async (id: string): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_role_action', {
            p_action: 'ENABLEROLE',
            p_role_id: id,
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Enable failed' }
        }

        return { result: data.data, error: null }
    },

    // Disable a role
    disable: async (id: string): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_role_action', {
            p_action: 'DISABLEROLE',
            p_role_id: id,
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Disable failed' }
        }

        return { result: data.data, error: null }
    },

    // Delete role
    delete: async (id: string): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_role_action', {
            p_action: 'DELETEROLE',
            p_role_id: id,
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Delete failed' }
        }

        return { result: data.data, error: null }
    },
}
