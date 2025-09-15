'use client';

import { BookOpen, Lock, Star } from 'lucide-react';
import { ContentSnippet } from '../lib/types';

interface ContentCardProps {
  content: ContentSnippet;
  onUnlock?: (contentId: string) => void;
  isUnlocking?: boolean;
}

export function ContentCard({ content, onUnlock, isUnlocking = false }: ContentCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nutrition': return 'bg-green-100 text-green-700';
      case 'exercise': return 'bg-blue-100 text-blue-700';
      case 'wellness': return 'bg-purple-100 text-purple-700';
      case 'education': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPhaseEmoji = (phase: string) => {
    switch (phase) {
      case 'menstrual': return '🔴';
      case 'follicular': return '🌱';
      case 'ovulation': return '🌟';
      case 'luteal': return '🌙';
      default: return '📖';
    }
  };

  return (
    <div className="card relative">
      {/* Premium Badge */}
      {content.isPremium && (
        <div className="absolute top-2 right-2">
          <div className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star size={12} />
            Premium
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-2 mb-sm">
        <BookOpen className="text-primary mt-1" size={20} />
        <div className="flex-1">
          <h3 className="text-heading mb-1">{content.title}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(content.category)}`}>
              {content.category}
            </span>
            <span className="text-caption flex items-center gap-1">
              {getPhaseEmoji(content.cyclePhase)}
              {content.cyclePhase} phase
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-body">
        {content.isPremium ? (
          <div>
            <p className="mb-md">{content.content.substring(0, 150)}...</p>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-md text-center">
              <Lock className="text-gray-400 mx-auto mb-2" size={24} />
              <p className="text-sm text-gray-600 mb-md">
                Unlock this premium content to read the full article with expert insights.
              </p>
              <button
                onClick={() => onUnlock?.(content.id)}
                disabled={isUnlocking}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUnlocking ? 'Unlocking...' : 'Unlock for $2'}
              </button>
            </div>
          </div>
        ) : (
          <p>{content.content}</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-md pt-sm border-t border-gray-100">
        <p className="text-caption">
          ✨ <strong>Expert-vetted content</strong> curated for your cycle phase
        </p>
      </div>
    </div>
  );
}
