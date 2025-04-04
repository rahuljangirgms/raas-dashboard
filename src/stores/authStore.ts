// src/stores/authStore.ts
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';
import { mapSupabaseUserToAuthUser } from '@/types/auth';

const ACCESS_TOKEN = 'access_token';

interface AuthUser {
  accountNo: string;
  email: string;
  role: string[];
  exp: number;
}

interface AuthState {
  auth: {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Load the token from Cookies or localStorage (if available)
  const cookieState = Cookies.get(ACCESS_TOKEN);
  const initToken = cookieState ? JSON.parse(cookieState) : null;

  // Check if the token exists in cookies or localStorage and set the user accordingly
  const userFromStorage = localStorage.getItem('user');
  const initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;

  // Subscribe to Supabase auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event: string, session) => {
      const mappedUser = mapSupabaseUserToAuthUser(session?.user ?? null);
      set((state) => ({
        auth: {
          ...state.auth,
          user: mappedUser,
          accessToken: session?.access_token ?? '',
        },
      }));
      // Save the user and access token to localStorage and Cookies
      if (session?.user) {
        localStorage.setItem('user', JSON.stringify(mappedUser));
        Cookies.set(ACCESS_TOKEN, JSON.stringify(session?.access_token));
      } else {
        localStorage.removeItem('user');
        Cookies.remove(ACCESS_TOKEN);
      }
    }
  );

  return {
    auth: {
      user: initialUser,
      accessToken: initToken || '',
      setUser: (user) => set((state) => ({
        auth: { ...state.auth, user },
      })),
      setAccessToken: (accessToken) => set((state) => {
        Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
        return { auth: { ...state.auth, accessToken } };
      }),
      resetAccessToken: () => set((state) => {
        Cookies.remove(ACCESS_TOKEN);
        return { auth: { ...state.auth, accessToken: '' } };
      }),
      reset: () => set((state) => {
        Cookies.remove(ACCESS_TOKEN);
        localStorage.removeItem('user');
        return { auth: { ...state.auth, user: null, accessToken: '' } };
      }),
    },
  };
});













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

// export const useAuth = () => useAuthStore((state) => state.auth)
