
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Users, Settings, MessageSquare, Ban, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [features, setFeatures] = useState({
    aiAssistant: true,
    analytics: true,
    bugTracker: true,
    messaging: true,
    subscriptions: true
  });

  const [bannedUsers] = useState([
    { id: '1', email: 'spammer@example.com', reason: 'Spam activity', bannedAt: '2024-01-15' },
    { id: '2', email: 'abuser@example.com', reason: 'Terms violation', bannedAt: '2024-01-10' }
  ]);

  const [users] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', subscription: 'premium', status: 'active', lastActive: '2024-01-20' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', subscription: 'free', status: 'active', lastActive: '2024-01-19' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', subscription: 'enterprise', status: 'inactive', lastActive: '2024-01-15' }
  ]);

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handleBroadcastMessage = () => {
    // Implement broadcast message functionality
    console.log('Broadcasting message to all users');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <Badge className="bg-red-600">Admin Access</Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1,247</div>
                <p className="text-xs text-green-400">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Subscriptions</CardTitle>
                <Settings className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">432</div>
                <p className="text-xs text-green-400">+8% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Support Tickets</CardTitle>
                <MessageSquare className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">23</div>
                <p className="text-xs text-red-400">+3 since yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Banned Users</CardTitle>
                <Ban className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12</div>
                <p className="text-xs text-gray-400">Security actions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-gray-400">Manage user accounts and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={user.subscription === 'enterprise' ? 'bg-yellow-600' : user.subscription === 'premium' ? 'bg-purple-600' : 'bg-gray-600'}>
                          {user.subscription}
                        </Badge>
                        <Badge className={user.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">Ban</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Feature Management</CardTitle>
              <CardDescription className="text-gray-400">Enable or disable app features globally</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <div>
                    <Label className="text-white capitalize">{feature.replace(/([A-Z])/g, ' $1')}</Label>
                    <p className="text-gray-400 text-sm">Control access to {feature} functionality</p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => handleFeatureToggle(feature as keyof typeof features)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messaging">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Broadcast Message</CardTitle>
                <CardDescription className="text-gray-400">Send a message to all users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Message Title</Label>
                  <Input className="bg-gray-700 border-gray-600 text-white" placeholder="Enter message title" />
                </div>
                <div>
                  <Label className="text-gray-300">Message Content</Label>
                  <textarea 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white"
                    placeholder="Enter your message..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleBroadcastMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Send to All Users
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Targeted Messaging</CardTitle>
                <CardDescription className="text-gray-400">Send messages to specific groups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Target Group</Label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white">
                    <option>All Users</option>
                    <option>Premium Users</option>
                    <option>Enterprise Users</option>
                    <option>Free Users</option>
                    <option>Inactive Users</option>
                  </select>
                </div>
                <div>
                  <Label className="text-gray-300">Message</Label>
                  <textarea 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white"
                    placeholder="Enter targeted message..."
                    rows={3}
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Send to Group
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Security & Bans</CardTitle>
              <CardDescription className="text-gray-400">Manage banned users and IP addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Banned Users</h3>
                  <Button className="bg-red-600 hover:bg-red-700">Add Ban</Button>
                </div>
                {bannedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white">{user.email}</p>
                      <p className="text-gray-400 text-sm">Reason: {user.reason}</p>
                      <p className="text-gray-400 text-xs">Banned: {user.bannedAt}</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Unban</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
