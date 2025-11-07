import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Hook for real-time paper submissions
export const useRealtimePaperSubmissions = (callback?: (payload: any) => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('paper-submissions-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'paper_submissions'
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          console.log('New paper submission:', payload);
          callback?.(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [callback]);
};

// Hook for real-time EcoBox device updates
export const useRealtimeEcoBoxUpdates = (callback?: (payload: any) => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('ecobox-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'ecobox_devices'
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          console.log('EcoBox device updated:', payload);
          callback?.(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [callback]);
};

// Hook for real-time notifications
export const useRealtimeNotifications = (userId: string, callback?: (payload: any) => void) => {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          console.log('New notification:', payload);
          callback?.(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, callback]);
};

// Hook for real-time leaderboard updates
export const useRealtimeLeaderboard = (callback?: (payload: any) => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('leaderboard-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          if (payload.new && payload.old && 
              (payload.new as any).total_papers !== (payload.old as any).total_papers) {
            console.log('Leaderboard update:', payload);
            callback?.(payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [callback]);
};

// Generic hook for any table changes
export const useRealtimeTable = (
  table: string, 
  event: 'INSERT' | 'UPDATE' | 'DELETE' = 'INSERT',
  filter?: string,
  callback?: (payload: any) => void
) => {
  useEffect(() => {
    const config: any = {
      event,
      schema: 'public',
      table
    };

    if (filter) {
      config.filter = filter;
    }

    const channel = supabase
      .channel(`${table}-${event}-changes`)
      .on('postgres_changes', config, callback || (() => {}))
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event, filter, callback]);
};