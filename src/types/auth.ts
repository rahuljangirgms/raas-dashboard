// src/types/auth.ts
import { User } from '@supabase/supabase-js';

// Custom AuthUser type
export interface AuthUser {
  accountNo: string;
  email: string;
  role: string[];
  exp: number;
}

// Utility function to map Supabase User to AuthUser
export const mapSupabaseUserToAuthUser = (user: User | null): AuthUser | null => {
  if (!user) return null;

  return {
    accountNo: user.id,  // Mapping Supabase user ID to accountNo
    email: user.email || "",
    role: [],  // Implement role fetching logic if necessary
    exp: 0,    // Implement expiration logic if necessary
  };
};
