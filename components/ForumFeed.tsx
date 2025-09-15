'use client';

import { useState } from 'react';
import { MessageCircle, Send, Heart, Reply } from 'lucide-react';
import { ForumFeedProps } from '../lib/types';
import { formatDate } from '../lib/utils';

export function ForumFeed({ posts, onNewPost, onReply, isLoading = false }: ForumFeedProps) {
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onNewPost(newPostContent);
      setNewPostContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (postId: string) => {
    const content = replyContent[postId];
    if (!content?.trim()) return;

    setIsSubmitting(true);
    try {
      await onReply(postId, content);
      setReplyContent(prev => ({ ...prev, [postId]: '' }));
      setShowReplyForm(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateReplyContent = (postId: string, content: string) => {
    setReplyContent(prev => ({ ...prev, [postId]: content }));
  };

  return (
    <div className="space-y-lg">
      {/* New Post Form */}
      <div className="card">
        <div className="flex items-center gap-2 mb-md">
          <MessageCircle className="text-primary" size={20} />
          <h2 className="text-heading">Share Anonymously</h2>
        </div>

        <form onSubmit={handleNewPost} className="space-y-sm">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Ask a question or share your experience... Your post will be anonymous."
            className="w-full px-sm py-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            maxLength={500}
          />
          
          <div className="flex justify-between items-center">
            <span className="text-caption">
              {newPostContent.length}/500 characters
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !newPostContent.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={16} />
              {isSubmitting ? 'Posting...' : 'Post Anonymously'}
            </button>
          </div>
        </form>

        <div className="mt-sm p-sm bg-accent/10 rounded-md">
          <p className="text-caption">
            🔒 <strong>Privacy:</strong> Your posts are completely anonymous. No one can see your identity.
          </p>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-md">
        {isLoading ? (
          <div className="space-y-md">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="card text-center py-lg">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-md" />
            <h3 className="text-heading mb-2">No posts yet</h3>
            <p className="text-body">Be the first to start a conversation!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.postId} className="card">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Anonymous</p>
                    <p className="text-caption">{formatDate(new Date(post.createdAt))}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-md">
                <p className="text-body whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-4 text-caption">
                <button
                  onClick={() => setShowReplyForm(showReplyForm === post.postId ? null : post.postId)}
                  className="flex items-center gap-1 hover:text-primary transition-colors duration-200"
                >
                  <Reply size={14} />
                  Reply
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                  <Heart size={14} />
                  Support
                </button>
                {post.replies && post.replies.length > 0 && (
                  <span>{post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</span>
                )}
              </div>

              {/* Reply Form */}
              {showReplyForm === post.postId && (
                <div className="mt-md pt-md border-t border-gray-100">
                  <div className="flex gap-2">
                    <textarea
                      value={replyContent[post.postId] || ''}
                      onChange={(e) => updateReplyContent(post.postId, e.target.value)}
                      placeholder="Write a supportive reply..."
                      className="flex-1 px-sm py-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={2}
                      maxLength={300}
                    />
                    <button
                      onClick={() => handleReply(post.postId)}
                      disabled={isSubmitting || !replyContent[post.postId]?.trim()}
                      className="btn-primary px-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {post.replies && post.replies.length > 0 && (
                <div className="mt-md pt-md border-t border-gray-100 space-y-sm">
                  {post.replies.map(reply => (
                    <div key={reply.commentId} className="flex gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">Anonymous</span>
                          <span className="text-caption">{formatDate(new Date(reply.createdAt))}</span>
                        </div>
                        <p className="text-sm text-body">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
