
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Users, Search } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'direct' | 'team' | 'announcement';
}

const Messages = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Admin',
      content: 'Welcome to RoPilot! Here are some tips to get started...',
      timestamp: '2024-01-20 10:30',
      type: 'announcement'
    },
    {
      id: '2',
      sender: 'John Doe',
      content: 'Hey team, I need help with the new AI assistant feature.',
      timestamp: '2024-01-20 09:15',
      type: 'team'
    },
    {
      id: '3',
      sender: 'Jane Smith',
      content: 'The analytics dashboard looks great! Can we add more metrics?',
      timestamp: '2024-01-19 16:45',
      type: 'direct'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Implement send message logic
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-600';
      case 'team': return 'bg-purple-600';
      case 'direct': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Messages</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Users className="w-4 h-4 mr-2" />
          New Group Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Messages</CardTitle>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{message.sender}</span>
                      <Badge className={getMessageTypeColor(message.type)}>
                        {message.type}
                      </Badge>
                    </div>
                    <span className="text-gray-400 text-sm">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-300">{message.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Message Input */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-gray-700 border-gray-600 text-white flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Team Members</CardTitle>
              <CardDescription className="text-gray-400">Active team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Johnson'].map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">{member.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="text-white text-sm">{member}</span>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Create Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
