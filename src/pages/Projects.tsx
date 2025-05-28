
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, Settings } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'development' | 'maintenance';
  lastUpdated: string;
  teamMembers: number;
  gameId?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Medieval RPG',
      description: 'Epic fantasy adventure game with quests, dungeons, and magic systems.',
      status: 'active',
      lastUpdated: '2024-01-15',
      teamMembers: 5,
      gameId: '123456789'
    },
    {
      id: '2',
      name: 'Space Adventure',
      description: 'Sci-fi exploration game with spaceship combat and alien worlds.',
      status: 'development',
      lastUpdated: '2024-01-14',
      teamMembers: 3
    },
    {
      id: '3',
      name: 'Racing Championship',
      description: 'High-speed racing game with customizable cars and tracks.',
      status: 'maintenance',
      lastUpdated: '2024-01-10',
      teamMembers: 2,
      gameId: '987654321'
    }
  ]);

  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name,
        description: newProject.description,
        status: 'development',
        lastUpdated: new Date().toISOString().split('T')[0],
        teamMembers: 1
      };
      setProjects([...projects, project]);
      setNewProject({ name: '', description: '' });
      setIsDialogOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'development': return 'bg-blue-500';
      case 'maintenance': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Project</DialogTitle>
              <DialogDescription className="text-gray-400">
                Set up a new Roblox game project to start development.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Project Name</label>
                <Input
                  placeholder="Enter project name..."
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Description</label>
                <Input
                  placeholder="Describe your game..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Button onClick={handleCreateProject} className="w-full bg-purple-600 hover:bg-purple-700">
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{project.name}</CardTitle>
                <Badge className={`${getStatusColor(project.status)} text-white`}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription className="text-gray-400">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.lastUpdated}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {project.teamMembers}
                  </div>
                </div>
                {project.gameId && (
                  <div className="text-xs text-gray-500">
                    Game ID: {project.gameId}
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    Open
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Settings className="w-4 h-4" />
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

export default Projects;
