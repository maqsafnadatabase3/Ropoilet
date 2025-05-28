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
      subscription_plans: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          duration: 'monthly' | 'yearly'
          features: string[]
          is_public: boolean
          limits: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          duration: 'monthly' | 'yearly'
          features: string[]
          is_public?: boolean
          limits?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          duration?: 'monthly' | 'yearly'
          features?: string[]
          is_public?: boolean
          limits?: Json
          created_at?: string
          updated_at?: string
        }
      }
      subscription_plan_history: {
        Row: {
          id: string
          plan_id: string
          change_type: 'created' | 'updated' | 'deleted'
          previous_data: Json | null
          new_data: Json
          changed_by: string
          created_at: string
        }
        Insert: {
          id?: string
          plan_id: string
          change_type: 'created' | 'updated' | 'deleted'
          previous_data?: Json | null
          new_data: Json
          changed_by: string
          created_at?: string
        }
        Update: {
          id?: string
          plan_id?: string
          change_type?: 'created' | 'updated' | 'deleted'
          previous_data?: Json | null
          new_data?: Json
          changed_by?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          body: string
          read: boolean
          type: 'subscription_update' | 'subscription_delete' | 'general'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          body: string
          read?: boolean
          type: 'subscription_update' | 'subscription_delete' | 'general'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          body?: string
          read?: boolean
          type?: 'subscription_update' | 'subscription_delete' | 'general'
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired'
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: 'active' | 'cancelled' | 'expired'
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: 'active' | 'cancelled' | 'expired'
          created_at?: string
          expires_at?: string | null
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