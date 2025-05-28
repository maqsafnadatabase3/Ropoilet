export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          role: 'admin' | 'game_owner' | 'player'
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name: string
          role?: 'admin' | 'game_owner' | 'player'
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'game_owner' | 'player'
          avatar_url?: string | null
        }
      }
      games: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          owner_id: string
          status: 'active' | 'development' | 'maintenance'
          game_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          owner_id: string
          status?: 'active' | 'development' | 'maintenance'
          game_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          owner_id?: string
          status?: 'active' | 'development' | 'maintenance'
          game_url?: string | null
        }
      }
      game_stats: {
        Row: {
          id: string
          game_id: string
          active_players: number
          total_visits: number
          avg_session_time: number
          revenue_today: number
          updated_at: string
        }
        Insert: {
          id?: string
          game_id: string
          active_players: number
          total_visits: number
          avg_session_time: number
          revenue_today: number
          updated_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          active_players?: number
          total_visits?: number
          avg_session_time?: number
          revenue_today?: number
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          tier: 'free' | 'premium' | 'enterprise'
          status: 'active' | 'cancelled' | 'expired'
          created_at: string
          expires_at: string | null
          price: number
        }
        Insert: {
          id?: string
          user_id: string
          tier: 'free' | 'premium' | 'enterprise'
          status?: 'active' | 'cancelled' | 'expired'
          created_at?: string
          expires_at?: string | null
          price: number
        }
        Update: {
          id?: string
          user_id?: string
          tier?: 'free' | 'premium' | 'enterprise'
          status?: 'active' | 'cancelled' | 'expired'
          created_at?: string
          expires_at?: string | null
          price?: number
        }
      }
      revenue: {
        Row: {
          id: string
          created_at: string
          amount: number
          type: 'subscription' | 'in_game' | 'other'
          game_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          amount: number
          type: 'subscription' | 'in_game' | 'other'
          game_id?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          amount?: number
          type?: 'subscription' | 'in_game' | 'other'
          game_id?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}