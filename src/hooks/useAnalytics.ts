
import { useState, useEffect } from 'react';

interface AnalyticsData {
  playerCount: number;
  revenue: number;
  sessionTime: number;
  retentionRate: number;
  deviceBreakdown: { mobile: number; desktop: number; tablet: number };
  regionData: { name: string; players: number }[];
  dailyStats: { date: string; players: number; revenue: number }[];
}

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        // Simulate real analytics calculation
        const now = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          
          // Calculate realistic player count based on time and day
          const dayOfWeek = date.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const baseCount = isWeekend ? 1500 : 1200;
          const variance = Math.random() * 400 - 200;
          const players = Math.max(0, Math.floor(baseCount + variance));
          
          // Revenue calculation (roughly $0.50-$1.20 per player)
          const revenuePerPlayer = 0.5 + Math.random() * 0.7;
          const revenue = Math.floor(players * revenuePerPlayer);
          
          return {
            date: date.toISOString().split('T')[0],
            players,
            revenue
          };
        }).reverse();

        // Calculate current metrics
        const currentPlayers = last7Days[last7Days.length - 1]?.players || 0;
        const totalRevenue = last7Days.reduce((sum, day) => sum + day.revenue, 0);
        
        // Session time calculation (15-45 minutes average)
        const baseSessionTime = 25;
        const sessionVariance = (Math.random() - 0.5) * 10;
        const sessionTime = Math.max(10, baseSessionTime + sessionVariance);
        
        // Retention rate (85-95%)
        const retentionRate = 85 + Math.random() * 10;
        
        // Device breakdown (realistic mobile-heavy distribution)
        const mobile = 45 + Math.random() * 10;
        const desktop = 35 + Math.random() * 10;
        const tablet = 100 - mobile - desktop;
        
        // Regional data
        const regions = [
          { name: 'North America', baseShare: 35 },
          { name: 'Europe', baseShare: 25 },
          { name: 'Asia', baseShare: 30 },
          { name: 'South America', baseShare: 7 },
          { name: 'Other', baseShare: 3 }
        ];
        
        const regionData = regions.map(region => ({
          name: region.name,
          players: Math.floor((currentPlayers * region.baseShare / 100) * (0.8 + Math.random() * 0.4))
        }));

        const analyticsData: AnalyticsData = {
          playerCount: currentPlayers,
          revenue: totalRevenue,
          sessionTime,
          retentionRate,
          deviceBreakdown: { mobile, desktop, tablet },
          regionData,
          dailyStats: last7Days
        };

        setData(analyticsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    
    // Update analytics every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
