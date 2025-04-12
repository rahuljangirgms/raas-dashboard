// src/services/userService.ts
import { supabase } from '@/lib/supabaseClient'
import { User } from '@/types/user' // Define this based on your frontend needs

export const userService = {
    // View all users
    getAll: async () => {
        const { data, error } = await supabase.rpc('sp_user_view', {
            p_action: 'VIEWALL',
        })

        return {
            users: data?.data ?? [],
            error: error ?? (data?.status !== 'SUCCESS' ? new Error(data?.message) : null),
        }
    },

    // Get user by ID
    getById: async (id: string): Promise<{ user: User | null; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_user_view', {
            p_action: 'GETBYID',
            p_user_id: id
        })

        if (error || data?.status !== 'SUCCESS') {
            return { user: null, error: error?.message || data?.message || 'User not found' }
        }

        return { user: data.data as User, error: null }
    },



    // Update user
    update: async (id: string, payload: any): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_user_action', {
            p_action: 'UPDATEUSER',
            p_user_id: id,
            p_payload: payload
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Update failed' }
        }

        return { result: data.data, error: null }
    },

    // Enable a user
    enable: async (id: string): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_user_action', {
            p_action: 'ENABLEUSER',
            p_user_id: id
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Enable failed' }
        }

        return { result: data.data, error: null }
    },

    // Disable a user
    disable: async (id: string): Promise<{ result: any; error: string | null }> => {
        const { data, error } = await supabase.rpc('sp_user_action', {
            p_action: 'DISABLEUSER',
            p_user_id: id
        })

        if (error || data?.status !== 'SUCCESS') {
            return { result: null, error: error?.message || data?.message || 'Disable failed' }
        }

        return { result: data.data, error: null }
    },

    // delete

    delete: async(id: string) => {
    const { data, error } = await supabase.rpc('sp_user_action', {
        p_action: 'DELETEUSER',
        p_user_id: id
    })

    if (error || data?.status !== 'SUCCESS') {
        return { result: null, error: error?.message || data?.message || 'Delete failed' }
    }

    return { result: data.data, error: null }
}

}
