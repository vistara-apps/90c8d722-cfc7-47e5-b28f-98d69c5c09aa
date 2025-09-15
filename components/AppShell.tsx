'use client';

import { useState } from 'react';
import { Home, Calendar, MessageCircle, BookOpen, User } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AppShell({ children, activeTab = 'home', onTabChange }: AppShellProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'forum', icon: MessageCircle, label: 'Community' },
    { id: 'content', icon: BookOpen, label: 'Learn' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="bg-surface shadow-sm border-b border-gray-100">
        <div className="container py-4">
          <h1 className="text-display text-primary">LunaFlow</h1>
          <p className="text-caption mt-1">Your personal cycle companion</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-lg">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-surface border-t border-gray-100 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-md transition-all duration-200 ${
                currentTab === id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted hover:text-text hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
