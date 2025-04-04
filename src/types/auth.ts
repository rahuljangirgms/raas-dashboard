// src/types/auth.ts
import { User } from '@supabase/supabase-js';

// Custom AuthUser type for your application
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
    accountNo: user.id,        // Use Supabase user ID as accountNo
    email: user.email || "",    // Ensure email is a string
    role: [],                  // Implement role fetching if needed
    exp: 0,                    // Set expiration as needed
  };
};
