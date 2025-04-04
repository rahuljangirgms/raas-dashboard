// src/hooks/useSupabaseAuth.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { authService } from '@/services/authService';
import { AuthUser, mapSupabaseUserToAuthUser } from '@/types/auth';
import { Session } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { user, error } = await authService.validateSession();
      if (error) {
        setUser(null);
        setSession(null);
      } else {
        setUser(user);
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      }
      setLoading(false);
    };

    fetchSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, newSession: Session | null) => {
        setSession(newSession);
        // Ensure newSession?.user is converted to null if undefined
        setUser(mapSupabaseUserToAuthUser(newSession?.user ?? null));
      }
    );

    // Clean up subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user, error } = await authService.signIn(email, password);
    if (error) {
    //   console.error('Sign-in error:', error);
      return;
    }
    setUser(user);
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setSession(null);
  };

  return { user, session, loading, signIn, signOut };
};
