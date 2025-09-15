'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { CycleInputForm } from '../components/CycleInputForm';
import { SymptomLogger } from '../components/SymptomLogger';
import { CalendarView } from '../components/CalendarView';
import { ForumFeed } from '../components/ForumFeed';
import { ContentCard } from '../components/ContentCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { Calendar, Heart, TrendingUp, Users } from 'lucide-react';
import { CycleEntry, SymptomLog, ForumPost, ContentSnippet } from '../lib/types';
import { generateMockCycleEntries, predictNextCycle, formatDate, getCurrentCyclePhase } from '../lib/utils';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [cycleEntries, setCycleEntries] = useState<CycleEntry[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  // Mock user ID (in real app, this would come from authentication)
  const userId = 'user-123';

  // Initialize with mock data
  useEffect(() => {
    const mockEntries = generateMockCycleEntries(userId);
    setCycleEntries(mockEntries);

    // Mock forum posts
    setForumPosts([
      {
        postId: '1',
        userId: 'anonymous-1',
        content: 'Does anyone else get really bad cramps on day 2? Looking for natural remedies that actually work.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        anonymous: true,
        replies: [
          {
            commentId: '1-1',
            postId: '1',
            userId: 'anonymous-2',
            content: 'Heat pads and magnesium supplements have been game changers for me!',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            anonymous: true,
          }
        ]
      },
      {
        postId: '2',
        userId: 'anonymous-3',
        content: 'Is it normal to feel super emotional during ovulation? My mood swings are intense.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        anonymous: true,
      }
    ]);
  }, [userId]);

  // Mock content snippets
  const contentSnippets: ContentSnippet[] = [
    {
      id: '1',
      title: 'Nutrition During Your Menstrual Phase',
      content: 'During menstruation, your body needs extra iron and nutrients. Focus on iron-rich foods like spinach, lentils, and lean meats. Dark chocolate can also help with cravings and provides magnesium for cramp relief.',
      category: 'nutrition',
      cyclePhase: 'menstrual',
      isPremium: false,
    },
    {
      id: '2',
      title: 'Advanced Hormone Optimization Strategies',
      content: 'Learn how to naturally balance your hormones through targeted nutrition, specific exercise timing, and lifestyle modifications. This comprehensive guide covers seed cycling, adaptogenic herbs, and meal timing strategies that can significantly improve your cycle regularity and reduce PMS symptoms.',
      category: 'wellness',
      cyclePhase: 'luteal',
      isPremium: true,
    },
    {
      id: '3',
      title: 'Exercise During Ovulation',
      content: 'Your energy peaks during ovulation! This is the perfect time for high-intensity workouts, strength training, and challenging activities. Your body can handle more stress and recover faster.',
      category: 'exercise',
      cyclePhase: 'ovulation',
      isPremium: false,
    }
  ];

  const handleCycleSubmit = async (startDate: Date, endDate?: Date) => {
    setIsLoading(true);
    try {
      const newEntry: CycleEntry = {
        entryId: `entry-${Date.now()}`,
        userId,
        startDate,
        endDate,
        cycleLength: 28, // This would be calculated based on previous entries
        periodLength: endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : undefined,
      };
      
      setCycleEntries(prev => [newEntry, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSymptomSubmit = async (symptomData: Omit<SymptomLog, 'logId' | 'userId'>) => {
    setIsLoading(true);
    try {
      const newSymptom: SymptomLog = {
        logId: `symptom-${Date.now()}`,
        userId,
        ...symptomData,
      };
      
      setSymptoms(prev => [newSymptom, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPost = async (content: string) => {
    const newPost: ForumPost = {
      postId: `post-${Date.now()}`,
      userId: `anonymous-${Date.now()}`,
      content,
      createdAt: new Date(),
      anonymous: true,
    };
    
    setForumPosts(prev => [newPost, ...prev]);
  };

  const handleReply = async (postId: string, content: string) => {
    // In a real app, this would make an API call
    console.log('Reply to post:', postId, content);
  };

  const handleUnlockContent = async (contentId: string) => {
    // In a real app, this would trigger a blockchain transaction
    console.log('Unlocking content:', contentId);
  };

  // Get current cycle info for dashboard
  const latestEntry = cycleEntries[0];
  const nextCycle = latestEntry ? predictNextCycle(cycleEntries) : null;
  const currentPhase = latestEntry ? getCurrentCyclePhase(new Date(), latestEntry) : null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-lg">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 gap-md">
              {/* Next Period Prediction */}
              {nextCycle && (
                <div className="card bg-gradient-to-r from-primary/10 to-purple-100">
                  <div className="flex items-center gap-2 mb-sm">
                    <Calendar className="text-primary" size={20} />
                    <h3 className="text-heading">Next Period</h3>
                  </div>
                  <p className="text-display text-primary">
                    {formatDate(nextCycle.startDate)}
                  </p>
                  <p className="text-caption mt-1">
                    Predicted based on your cycle history
                  </p>
                </div>
              )}

              {/* Current Phase */}
              {currentPhase && (
                <div className="card">
                  <div className="flex items-center gap-2 mb-sm">
                    <Heart className="text-primary" size={20} />
                    <h3 className="text-heading">Current Phase</h3>
                  </div>
                  <p className="text-lg font-semibold capitalize">{currentPhase}</p>
                  <p className="text-caption mt-1">
                    {currentPhase === 'menstrual' && 'Focus on rest and iron-rich foods'}
                    {currentPhase === 'follicular' && 'Great time to start new projects'}
                    {currentPhase === 'ovulation' && 'Peak energy and fertility'}
                    {currentPhase === 'luteal' && 'Time to slow down and prepare'}
                  </p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-md">
                <div className="card text-center">
                  <TrendingUp className="text-accent mx-auto mb-2" size={24} />
                  <p className="text-display">{cycleEntries.length}</p>
                  <p className="text-caption">Cycles Tracked</p>
                </div>
                <div className="card text-center">
                  <Users className="text-accent mx-auto mb-2" size={24} />
                  <p className="text-display">{forumPosts.length}</p>
                  <p className="text-caption">Community Posts</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-md">
              <h2 className="text-heading">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-sm">
                <PrimaryButton onClick={() => setActiveTab('calendar')}>
                  📅 View Calendar
                </PrimaryButton>
                <PrimaryButton onClick={() => setSelectedDate(new Date())}>
                  💜 Log Today's Symptoms
                </PrimaryButton>
                <PrimaryButton onClick={() => setActiveTab('forum')}>
                  💬 Browse Community
                </PrimaryButton>
              </div>
            </div>

            {/* Today's Content */}
            {currentPhase && (
              <div className="space-y-md">
                <h2 className="text-heading">Recommended for You</h2>
                {contentSnippets
                  .filter(content => content.cyclePhase === currentPhase)
                  .slice(0, 1)
                  .map(content => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      onUnlock={handleUnlockContent}
                    />
                  ))}
              </div>
            )}
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-lg">
            <CalendarView
              entries={cycleEntries}
              symptoms={symptoms}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
            
            {selectedDate && (
              <SymptomLogger
                date={selectedDate}
                onSubmit={handleSymptomSubmit}
                isLoading={isLoading}
              />
            )}
            
            <CycleInputForm
              onSubmit={handleCycleSubmit}
              isLoading={isLoading}
            />
          </div>
        );

      case 'forum':
        return (
          <ForumFeed
            posts={forumPosts}
            onNewPost={handleNewPost}
            onReply={handleReply}
            isLoading={isLoading}
          />
        );

      case 'content':
        return (
          <div className="space-y-lg">
            <div className="text-center mb-lg">
              <h2 className="text-display mb-2">Expert Content</h2>
              <p className="text-body">Curated articles and tips from health professionals</p>
            </div>
            
            <div className="space-y-md">
              {contentSnippets.map(content => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onUnlock={handleUnlockContent}
                />
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-lg">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-md">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-heading mb-2">Your Profile</h2>
              <p className="text-body">Anonymous User</p>
            </div>

            <div className="card">
              <h3 className="text-heading mb-md">Cycle Statistics</h3>
              <div className="space-y-sm">
                <div className="flex justify-between">
                  <span className="text-body">Cycles Tracked:</span>
                  <span className="font-medium">{cycleEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Symptoms Logged:</span>
                  <span className="font-medium">{symptoms.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Community Posts:</span>
                  <span className="font-medium">{forumPosts.length}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-heading mb-md">Privacy & Data</h3>
              <p className="text-body mb-md">
                Your data is stored securely and anonymously. You have full control over your information.
              </p>
              <PrimaryButton variant="destructive">
                Delete All Data
              </PrimaryButton>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </AppShell>
  );
}
