import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { User as AppUser } from '@/types';

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  school: string;
  role: 'student' | 'teacher';
  class?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from database
          const { data: profile } = await supabase
            .from('profiles')
            .select(`
              *,
              schools:school_id(name),
              school_classes:class_id(name, grade)
            `)
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              firstName: profile.first_name,
              lastName: profile.last_name,
              email: profile.email,
              role: profile.role,
              school: profile.schools?.name || '',
              schoolId: profile.school_id || '',
              class: profile.school_classes?.name || '',
              level: profile.level,
              totalPapers: profile.total_papers,
              achievements: [], // Will be loaded separately
              streak: profile.streak,
              joinedDate: new Date(profile.joined_date),
              lastActive: new Date(profile.last_active)
            });
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: 'არასწორი ელ-ფოსტა ან პაროლი' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'შესვლისას მოხდა შეცდომა' };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.role
          }
        }
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          return { success: false, error: 'მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს' };
        }
        return { success: false, error: authError.message };
      }

      // If user is created and confirmed, update profile with additional info
      if (authData.user && !authError) {
        // Find school by name
        const { data: schools } = await supabase
          .from('schools')
          .select('id')
          .eq('name', data.school)
          .limit(1);

        let schoolId = null;
        let classId = null;

        if (schools && schools.length > 0) {
          schoolId = schools[0].id;
          
          // Find class if specified
          if (data.class && data.role === 'student') {
            const { data: classes } = await supabase
              .from('school_classes')
              .select('id')
              .eq('school_id', schoolId)
              .eq('name', data.class)
              .limit(1);
              
            if (classes && classes.length > 0) {
              classId = classes[0].id;
            }
          }
        }

        // Update profile with school and class info
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            school_id: schoolId,
            class_id: classId
          })
          .eq('id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'რეგისტრაციისას მოხდა შეცდომა' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    login,
    register,
    logout,
    isAuthenticated: !!session,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};