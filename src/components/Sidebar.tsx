import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Bot, 
  Bug, 
  BarChart3, 
  Settings, 
  LogOut,
  Gamepad2,
  MessageSquare,
  CreditCard,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: FolderOpen, label: 'Projects' },
    { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
    { to: '/bug-tracker', icon: Bug, label: 'Bug Tracker' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', icon: Shield, label: 'Admin Panel' });
  }

  return (
    <div className="w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">RoPilot</h1>
            <p className="text-xs text-purple-400">Roblox Dev Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'text-gray-400 hover:text-white'}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800/50">
        <div className="space-y-2">
          <button className="nav-link w-full text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button 
            onClick={logout}
            className="nav-link w-full text-gray-400 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
        
        {/* User Info */}
        <div className="mt-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{user?.name || 'User'}</p>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${user?.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                <p className="text-gray-400 text-xs capitalize">
                  {user?.subscription.tier || 'Free'} Plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;