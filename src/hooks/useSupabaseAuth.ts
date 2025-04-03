import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { AuthUser, mapSupabaseUserToAuthUser } from '@/types/auth';
import { Session } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const { data: currentSession, error } = supabase.auth.getSession();
    if (error) {
      setUser(null);
      setSession(null);
    } else {
      setUser(mapSupabaseUserToAuthUser(currentSession?.user));
      setSession(currentSession);
    }
    setLoading(false);

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession?.user) {
        setUser(mapSupabaseUserToAuthUser(newSession.user));
      } else {
        setUser(null);
      }
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Sign-in error:', error);
      return;
    }
    setUser(mapSupabaseUserToAuthUser(data.user));
    setSession(data.session);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return { user, session, loading, signIn, signOut };
};
