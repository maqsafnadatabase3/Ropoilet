import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row'];
type Notification = Database['public']['Tables']['notifications']['Row'];

interface SubscriptionStore {
  plans: SubscriptionPlan[];
  loading: boolean;
  error: string | null;
  fetchPlans: () => Promise<void>;
  createPlan: (plan: Omit<SubscriptionPlan, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePlan: (id: string, updates: Partial<SubscriptionPlan>) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
  notifyUsers: (notification: Omit<Notification, 'id' | 'created_at' | 'read'>) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  plans: [],
  loading: false,
  error: null,

  fetchPlans: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      set({ plans: data || [] });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createPlan: async (plan) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .insert([{
          ...plan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      // Log the change in history
      await supabase.from('subscription_plan_history').insert({
        plan_id: data.id,
        change_type: 'created',
        new_data: data,
        changed_by: (await supabase.auth.getUser()).data.user?.id,
      });

      set({ plans: [...get().plans, data] });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updatePlan: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      // Get the current plan data
      const currentPlan = get().plans.find(p => p.id === id);
      
      const { data, error } = await supabase
        .from('subscription_plans')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Log the change in history
      await supabase.from('subscription_plan_history').insert({
        plan_id: id,
        change_type: 'updated',
        previous_data: currentPlan,
        new_data: data,
        changed_by: (await supabase.auth.getUser()).data.user?.id,
      });

      // Notify affected users
      const { data: subscribers } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('plan_id', id)
        .eq('status', 'active');

      if (subscribers) {
        await get().notifyUsers({
          title: 'Subscription Plan Updated',
          body: `The subscription plan "${data.name}" has been updated.`,
          type: 'subscription_update',
          user_id: subscribers[0].user_id,
        });
      }

      set({ plans: get().plans.map(p => p.id === id ? data : p) });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deletePlan: async (id) => {
    set({ loading: true, error: null });
    try {
      const currentPlan = get().plans.find(p => p.id === id);
      
      const { error } = await supabase
        .from('subscription_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log the deletion in history
      await supabase.from('subscription_plan_history').insert({
        plan_id: id,
        change_type: 'deleted',
        previous_data: currentPlan,
        new_data: null,
        changed_by: (await supabase.auth.getUser()).data.user?.id,
      });

      // Notify affected users
      const { data: subscribers } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('plan_id', id)
        .eq('status', 'active');

      if (subscribers) {
        await get().notifyUsers({
          title: 'Subscription Plan Deleted',
          body: `The subscription plan "${currentPlan?.name}" has been discontinued.`,
          type: 'subscription_delete',
          user_id: subscribers[0].user_id,
        });
      }

      set({ plans: get().plans.filter(p => p.id !== id) });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  notifyUsers: async (notification) => {
    try {
      await supabase
        .from('notifications')
        .insert([{
          ...notification,
          read: false,
        }]);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  },
}));