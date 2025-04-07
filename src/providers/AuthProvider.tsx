'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ requiresEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial session check and subscription to auth changes
    const getSession = async () => {
      setIsLoading(true);
      
      try {
        // Get the current session if any
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
      } catch (error) {
        console.error("Unexpected error getting session:", error);
      } finally {
        setIsLoading(false);
      }

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        }
      );

      // Cleanup function to unsubscribe when the component unmounts
      return () => subscription.unsubscribe();
    };

    getSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Unexpected sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          // Redirect back to our app after email verification
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined
        }
      });
      
      if (error) {
        console.error("Sign up error:", error);
        throw error;
      }
      
      // Check if user needs to confirm their email
      if (data?.user?.identities?.length === 0) {
        return { requiresEmailConfirmation: true };
      }
      
      return {};
    } catch (error) {
      console.error("Unexpected sign up error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Unexpected sign out error:", error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};