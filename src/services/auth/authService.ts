// src/services/authService.ts

import { supabase } from '@/lib/supabaseClient'  // The Supabase client
import { AuthUser } from '@/types/auth'  // The custom AuthUser type
import { User } from '@supabase/supabase-js'  // Only import User from Supabase types

// Helper function to map Supabase User to custom AuthUser type
const mapSupabaseUserToAuthUser = (user: User | null): AuthUser | null => {
  if (!user) return null;

  return {
    accountNo: user.id,  // Use Supabase ID as accountNo
    email: user.email || "",
    role: [],  // Add logic here if you want to fetch roles for the user
    exp: 0,    // Add logic to set expiration if necessary
  }
}

export const authService = {
  // Sign in method
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      return { user: null, error: error.message }
    }

    const user = mapSupabaseUserToAuthUser(data.user)
    return { user, error: null }
  },

  // Sign-up method
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      return { user: null, error: error.message }
    }

    const user = mapSupabaseUserToAuthUser(data.user)
    return { user, error: null }
  },

  // Sign out method
  signOut: async () => {
    await supabase.auth.signOut()
  },

  // Validate session method
  validateSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      return { user: null, error: error.message }
    }

    // Explicitly handle undefined user and map it to null
    const user = session?.user ? mapSupabaseUserToAuthUser(session.user) : null
    return { user, error: null }
  },
}
