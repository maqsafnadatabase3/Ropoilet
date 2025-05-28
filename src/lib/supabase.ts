import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

// Type definitions for our database tables
export type Profile = Tables['profiles']['Row'];
export type Game = Tables['games']['Row'];
export type GameStats = Tables['game_stats']['Row'];
export type Subscription = Tables['subscriptions']['Row'];
export type Revenue = Tables['revenue']['Row'];

// Helper functions for data fetching
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchGames(userId?: string) {
  let query = supabase.from('games').select('*');
  if (userId) {
    query = query.eq('owner_id', userId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchGameStats(gameId: string) {
  const { data, error } = await supabase
    .from('game_stats')
    .select('*')
    .eq('game_id', gameId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchRevenue(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('revenue')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  if (error) throw error;
  return data;
}

export async function fetchSubscriptions(userId?: string) {
  let query = supabase.from('subscriptions').select('*');
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Real-time subscriptions
export function subscribeToGameStats(gameId: string, callback: (payload: GameStats) => void) {
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
}

export function subscribeToRevenue(callback: (payload: Revenue) => void) {
  return supabase
    .channel('revenue')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'revenue',
      },
      (payload) => callback(payload.new as Revenue)
    )
    .subscribe();
}