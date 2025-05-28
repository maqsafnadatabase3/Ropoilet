
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Subscriptions = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '3 Projects',
        'Basic AI Assistant',
        'Community Support',
        '1GB Storage'
      ],
      icon: <Check className="w-5 h-5" />,
      color: 'bg-gray-600',
      current: user?.subscription.tier === 'free'
    },
    {
      name: 'Premium',
      price: 9.99,
      period: 'month',
      description: 'For serious developers',
      features: [
        'Unlimited Projects',
        'Advanced AI Assistant',
        'Priority Support',
        '10GB Storage',
        'Real-time Analytics',
        'Team Collaboration'
      ],
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-purple-600',
      current: user?.subscription.tier === 'premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 29.99,
      period: 'month',
      description: 'For teams and studios',
      features: [
        'Everything in Premium',
        'Advanced Admin Controls',
        'Custom Integrations',
        'Unlimited Storage',
        'Dedicated Support',
        'White-label Options'
      ],
      icon: <Crown className="w-5 h-5" />,
      color: 'bg-yellow-600',
      current: user?.subscription.tier === 'enterprise'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h1>
        <p className="text-gray-400">Upgrade to unlock more features and boost your productivity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`bg-gray-800 border-gray-700 relative ${plan.popular ? 'border-purple-500' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {plan.icon}
              </div>
              <CardTitle className="text-white">{plan.name}</CardTitle>
              <CardDescription className="text-gray-400">{plan.description}</CardDescription>
              <div className="text-3xl font-bold text-white">
                ${plan.price}
                <span className="text-lg font-normal text-gray-400">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan.current ? 'bg-gray-600' : plan.color}`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {user?.subscription.tier !== 'free' && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Current Subscription</CardTitle>
            <CardDescription className="text-gray-400">Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">
                  {user.subscription.tier.charAt(0).toUpperCase() + user.subscription.tier.slice(1)} Plan
                </p>
                <p className="text-gray-400 text-sm">
                  {user.subscription.expiresAt ? `Expires: ${new Date(user.subscription.expiresAt).toLocaleDateString()}` : 'Active'}
                </p>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Subscriptions;
