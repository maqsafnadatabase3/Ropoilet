import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface GameStats {
  id: string;
  game_id: string;
  active_players: number;
  total_visits: number;
  avg_session_time: number;
  engagement_rate: number;
  server_status: 'online' | 'offline' | 'maintenance';
  updated_at: string;
}

export interface Revenue {
  id: string;
  game_id: string;
  amount: number;
  type: 'subscription' | 'in_game' | 'other';
  transaction_date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  subscription_tier: 'free' | 'premium' | 'enterprise';
  created_at: string;
}

// Helper functions for data fetching
export const fetchGameStats = async (gameId: string): Promise<GameStats | null> => {
  const { data, error } = await supabase
    .from('game_stats')
    .select('*')
    .eq('game_id', gameId)
    .single();

  if (error) {
    console.error('Error fetching game stats:', error);
    return null;
  }

  return data;
};

export const fetchRevenue = async (
  startDate: string,
  endDate: string
): Promise<Revenue[]> => {
  const { data, error } = await supabase
    .from('revenue')
    .select('*')
    .gte('transaction_date', startDate)
    .lte('transaction_date', endDate)
    .order('transaction_date', { ascending: false });

  if (error) {
    console.error('Error fetching revenue:', error);
    return [];
  }

  return data || [];
};

export const subscribeToGameStats = (
  gameId: string,
  callback: (payload: GameStats) => void
) => {
  return supabase
    .channel(`game_stats:${gameId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'game_stats',
        filter: `game_id=eq.${gameId}`,
      },
      (payload) => callback(payload.new as GameStats)
    )
    .subscribe();
};

export const checkUserRole = async (userId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking user role:', error);
    return null;
  }

  return data?.role || null;
};