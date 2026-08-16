import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  X,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, updateUser, triggerCelebration } = useWellness();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateUser({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@fitmind.ai`
    });
    triggerCelebration();
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-md w-full border border-[#E8EAF0] shadow-2xl p-6 relative text-left"
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6C3ED9] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold font-display text-gray-900">Switch Wellness Profile</h2>
          <p className="text-xs text-gray-500">
            Enter your name to personalize your local FitMind AI session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tayyaba"
              className="w-full p-3 bg-[#F7F8FC] border border-[#E8EAF0] focus:border-purple-500 focus:bg-white rounded-xl text-xs text-gray-800 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@fitmind.ai"
              className="w-full p-3 bg-[#F7F8FC] border border-[#E8EAF0] focus:border-purple-500 focus:bg-white rounded-xl text-xs text-gray-800 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Update Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
