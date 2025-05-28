
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Bug, AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react';

interface BugReport {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  project: string;
  assignee?: string;
  reporter: string;
  createdAt: string;
  discordMessageId?: string;
}

const BugTracker = () => {
  const [bugs, setBugs] = useState<BugReport[]>([
    {
      id: '1',
      title: 'Player spawn glitch in medieval castle',
      description: 'Players sometimes spawn inside walls when joining the game.',
      priority: 'high',
      status: 'open',
      project: 'Medieval RPG',
      reporter: 'PlayerTester123',
      createdAt: '2024-01-15',
      discordMessageId: 'msg_123456'
    },
    {
      id: '2',
      title: 'Shop GUI not responding to clicks',
      description: 'The purchase button in the shop sometimes becomes unresponsive.',
      priority: 'medium',
      status: 'in-progress',
      project: 'Space Adventure',
      assignee: 'dev_sarah',
      reporter: 'BugHunter42',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Car physics acting weird on certain tracks',
      description: 'Cars flip unexpectedly on track 3 and 7.',
      priority: 'high',
      status: 'resolved',
      project: 'Racing Championship',
      assignee: 'dev_mike',
      reporter: 'RaceFan88',
      createdAt: '2024-01-10'
    }
  ]);

  const [newBug, setNewBug] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    project: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateBug = () => {
    if (newBug.title.trim() && newBug.description.trim() && newBug.project) {
      const bug: BugReport = {
        id: Date.now().toString(),
        title: newBug.title,
        description: newBug.description,
        priority: newBug.priority,
        status: 'open',
        project: newBug.project,
        reporter: 'Current User',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setBugs([bug, ...bugs]);
      setNewBug({ title: '', description: '', priority: 'medium', project: '' });
      setIsDialogOpen(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-gray-400" />;
      default: return <Bug className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bug Tracker</h1>
          <p className="text-gray-400 mt-2">Track and manage bugs across all your projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Report Bug
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Report New Bug</DialogTitle>
              <DialogDescription className="text-gray-400">
                Describe the issue you encountered in detail.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Bug Title</label>
                <Input
                  placeholder="Brief description of the bug..."
                  value={newBug.title}
                  onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Project</label>
                <Select value={newBug.project} onValueChange={(value) => setNewBug({ ...newBug, project: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select project..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Medieval RPG">Medieval RPG</SelectItem>
                    <SelectItem value="Space Adventure">Space Adventure</SelectItem>
                    <SelectItem value="Racing Championship">Racing Championship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Priority</label>
                <Select value={newBug.priority} onValueChange={(value: any) => setNewBug({ ...newBug, priority: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Description</label>
                <Textarea
                  placeholder="Detailed description of the bug, steps to reproduce, expected vs actual behavior..."
                  value={newBug.description}
                  onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={4}
                />
              </div>
              <Button onClick={handleCreateBug} className="w-full bg-red-600 hover:bg-red-700">
                Report Bug
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-sm text-gray-400">Open</p>
                <p className="text-xl font-bold text-white">{bugs.filter(b => b.status === 'open').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-xl font-bold text-white">{bugs.filter(b => b.status === 'in-progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Resolved</p>
                <p className="text-xl font-bold text-white">{bugs.filter(b => b.status === 'resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bug className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-xl font-bold text-white">{bugs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bug List */}
      <div className="space-y-4">
        {bugs.map((bug) => (
          <Card key={bug.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(bug.status)}
                    <h3 className="text-lg font-semibold text-white">{bug.title}</h3>
                    <Badge className={getPriorityColor(bug.priority)}>{bug.priority}</Badge>
                    <Badge variant="outline" className={getStatusColor(bug.status)}>
                      {bug.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 mb-3">{bug.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Project: {bug.project}</span>
                    <span>Reporter: {bug.reporter}</span>
                    {bug.assignee && <span>Assignee: {bug.assignee}</span>}
                    <span>Created: {bug.createdAt}</span>
                    {bug.discordMessageId && (
                      <span className="flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Discord
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Assign
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BugTracker;
