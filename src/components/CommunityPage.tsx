import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Heart,
  MessageSquare,
  Share2,
  Image,
  Send,
  Sparkles,
  Trophy,
  Award,
  Flame,
  Plus
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function CommunityPage() {
  const { posts, toggleLikePost, addPostComment, createPost, user } = useWellness();

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('#ConsistencyIsKey');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    createPost(newPostContent, newPostTag);
    setNewPostContent('');
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId] || '';
    if (!text.trim()) return;
    addPostComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <Users className="w-6 h-6 text-purple-600" />
            <span>FitMind AI Community Hub</span>
          </h1>
          <p className="text-xs text-gray-500">
            Share training milestones, healthy recipes, and celebrate consistency with fellow members.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Weekly Sprint: 70k Step Challenge</span>
        </div>
      </div>

      {/* Create New Post Widget */}
      <div className="p-5 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-3">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
          />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-900">{user.name}</h4>
            <span className="text-[10px] text-purple-600 font-semibold">{user.plan || 'Pro Member'}</span>
          </div>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Share your workout achievement, meal prep wins, or wellness tips..."
            rows={3}
            className="w-full p-3.5 bg-[#F7F8FC] border border-[#E8EAF0] focus:border-purple-500 focus:bg-white rounded-2xl text-xs text-gray-800 placeholder-gray-400 outline-none resize-none transition"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2">
              <select
                value={newPostTag}
                onChange={(e) => setNewPostTag(e.target.value)}
                className="bg-[#F7F8FC] border border-[#E8EAF0] text-gray-700 text-xs rounded-xl px-3 py-1.5 font-medium outline-none"
              >
                <option>#ConsistencyIsKey</option>
                <option>#MealPrepWins</option>
                <option>#MindfulLiving</option>
                <option>#HIITChallenge</option>
                <option>#HydrationGoal</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-bold transition disabled:opacity-40 flex items-center space-x-1.5 cursor-pointer shadow-md shadow-purple-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>

      {/* Community Feed Stream */}
      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4 text-left"
          >
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/10"
                />
                <div>
                  <h4 className="text-sm font-bold font-display text-gray-900">{post.authorName}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-purple-600 font-semibold">{post.authorBadge}</span>
                    <span className="text-[10px] text-gray-400">• {post.timeAgo}</span>
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
                {post.tag}
              </span>
            </div>

            {/* Content text */}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{post.content}</p>

            {/* Optional Photo Attachment */}
            {post.image && (
              <div className="rounded-2xl overflow-hidden max-h-80 border border-[#E8EAF0]">
                <img src={post.image} alt="Community Post" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Interaction Buttons */}
            <div className="flex items-center space-x-6 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <button
                onClick={() => toggleLikePost(post.id)}
                className={`flex items-center space-x-1.5 transition cursor-pointer ${
                  post.isLiked ? 'text-red-500 font-bold' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{post.likesCount} Likes</span>
              </button>

              <button
                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                className="flex items-center space-x-1.5 hover:text-purple-600 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{post.commentsCount} Comments</span>
              </button>

              <button className="flex items-center space-x-1.5 hover:text-purple-600 transition cursor-pointer ml-auto">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Comment Section Dropdown */}
            {(activeCommentPostId === post.id || (post.comments && post.comments.length > 0)) && (
              <div className="pt-3 space-y-3 bg-[#F7F8FC] p-4 rounded-2xl">
                {/* Existing comments */}
                {post.comments?.map((c) => (
                  <div key={c.id} className="flex items-start space-x-2.5 text-xs">
                    <img src={c.authorAvatar} alt={c.authorName} className="w-6 h-6 rounded-full object-cover" />
                    <div className="flex-1 bg-white p-2.5 rounded-xl border border-[#E8EAF0]">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-gray-900 text-[11px]">{c.authorName}</span>
                        <span className="text-[9px] text-gray-400">{c.timeAgo}</span>
                      </div>
                      <p className="text-gray-700 text-[11px]">{c.text}</p>
                    </div>
                  </div>
                ))}

                {/* Add new comment */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    placeholder="Write a supportive comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCommentSubmit(post.id);
                    }}
                    className="flex-1 bg-white border border-[#E8EAF0] focus:border-purple-500 rounded-xl px-3 py-1.5 text-xs text-gray-800 outline-none"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="p-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  );
}
