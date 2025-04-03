import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient'
import { User, Session } from '@supabase/supabase-js'
// import { useToast } from '@/hooks/use-toast'

// Interface for AuthUser
interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  user: AuthUser | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  reset: () => void
  validateSession: () => void
  setUser: (user: AuthUser | null) => void
  setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthState>((set) => {
  // const { success, error } = useToast()

  // Helper function to map Supabase User to AuthUser
  const mapSupabaseUserToAuthUser = (user: User | null): AuthUser | null => {
    if (!user) return null
    return {
      accountNo: user.id,
      email: user.email || '',
      role: [],
      exp: 0,
    }
  }

  return {
    user: null,
    session: null,
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),

    signIn: async (email, password) => {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Sign-in error:', signInError.message)
        // error('Sign-in Failed', signInError.message) // Show error toast
      } else {
        const user = mapSupabaseUserToAuthUser(data.user)
        set({ user, session: data.session })
        // success('Sign-in Successful', 'Welcome back!') // Show success toast
      }
    },

    signUp: async (email, password) => {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        console.error('Sign-up error:', signUpError.message)
        // error('Sign-up Failed', signUpError.message) // Show error toast
      } else {
        const user = mapSupabaseUserToAuthUser(data.user)
        set({ user, session: data.session })
        // success('Sign-up Successful', 'Account created! Please check your email to verify.') // Show success toast
      }
    },

    signOut: async () => {
      await supabase.auth.signOut()
      set({ user: null, session: null })
      // success('Sign-out Successful', 'You have been logged out.') // Show success toast
    },

    reset: () => set({ user: null, session: null }),

    validateSession: async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Session validation error:', error.message)
        return
      }

      const user = mapSupabaseUserToAuthUser(session?.user ?? null)
      set({ user, session })
    },
  }
})


































// import Cookies from 'js-cookie'
// import { create } from 'zustand'

// const ACCESS_TOKEN = 'thisisjustarandomstring'

// interface AuthUser {
//   accountNo: string
//   email: string
//   role: string[]
//   exp: number
// }

// interface AuthState {
//   auth: {
//     user: AuthUser | null
//     setUser: (user: AuthUser | null) => void
//     accessToken: string
//     setAccessToken: (accessToken: string) => void
//     resetAccessToken: () => void
//     reset: () => void
//   }
// }

// export const useAuthStore = create<AuthState>()((set) => {
//   const cookieState = Cookies.get(ACCESS_TOKEN)
//   const initToken = cookieState ? JSON.parse(cookieState) : ''
//   return {
//     auth: {
//       user: null,
//       setUser: (user) =>
//         set((state) => ({ ...state, auth: { ...state.auth, user } })),
//       accessToken: initToken,
//       setAccessToken: (accessToken) =>
//         set((state) => {
//           Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken))
//           return { ...state, auth: { ...state.auth, accessToken } }
//         }),
//       resetAccessToken: () =>
//         set((state) => {
//           Cookies.remove(ACCESS_TOKEN)
//           return { ...state, auth: { ...state.auth, accessToken: '' } }
//         }),
//       reset: () =>
//         set((state) => {
//           Cookies.remove(ACCESS_TOKEN)
//           return {
//             ...state,
//             auth: { ...state.auth, user: null, accessToken: '' },
//           }
//         }),
//     },
//   }
// })

// // export const useAuth = () => useAuthStore((state) => state.auth)
