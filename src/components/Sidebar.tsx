import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Bot,
  Utensils,
  Dumbbell,
  Timer,
  TrendingUp,
  HeartPulse,
  Droplet,
  Moon,
  Users,
  ChefHat,
  FileText,
  Settings,
  Crown,
  Sparkles,
  Heart,
  ChevronRight,
  ShieldCheck,
  Home
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { MOTIVATIONAL_QUOTES } from '../data/mockData';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  const { activeTab, setActiveTab, setIsUpgradeModalOpen, user, returnToLanding } = useWellness();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-coach', label: 'AI Coach', icon: Bot, isNew: true },
    { id: 'diet-planner', label: 'Diet Planner', icon: Utensils },
    { id: 'workout-tracker', label: 'Workout Tracker', icon: Dumbbell },
    { id: 'timer-exercises', label: 'Timer & Exercises', icon: Timer },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'mental-wellness', label: 'Mental Wellness', icon: HeartPulse },
    { id: 'water-tracker', label: 'Water Tracker', icon: Droplet },
    { id: 'sleep-tracker', label: 'Sleep Tracker', icon: Moon },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'blog', label: 'Blog & Articles', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const todayQuote = MOTIVATIONAL_QUOTES[0];

  return (
    <aside className="w-72 bg-[#100B24] text-gray-200 flex flex-col h-screen border-r border-purple-950/40 select-none overflow-y-auto shrink-0 transition-all duration-300">
      
      {/* Top Brand Logo */}
      <div className="p-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('dashboard')}>
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C3ED9] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-purple-900/40 p-2">
            {/* Abstract Lotus / Brain Wellness SVG Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
              <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
              <path d="M6 10a6 6 0 0 0 12 0" />
              <path d="M12 16v6" />
              <path d="M8 22h8" />
              <path d="M4 14c0 3 3.5 5 8 5s8-2 8-5" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#100B24] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                FitMind<span className="text-purple-400">.AI</span>
              </span>
            </div>
            <p className="text-[10px] text-purple-300/70 font-medium tracking-wide">
              Strong Body. Clear Mind. Smarter You.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3.5 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-purple-300/40 uppercase">
          Menu Navigation
        </div>

        <button
          onClick={() => {
            if (onCloseMobile) onCloseMobile();
            returnToLanding();
          }}
          className="w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-purple-300 hover:text-white hover:bg-purple-900/30 transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <Home className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>Landing Page</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
            Hero
          </span>
        </button>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer relative ${
                isActive
                  ? 'text-white font-bold shadow-md shadow-purple-900/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarIndicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] -z-10 shadow-lg shadow-purple-600/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-purple-300 group-hover:scale-110'
                  }`}
                />
                <span className="tracking-wide">{item.label}</span>
              </div>

              {item.isNew && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm animate-pulse">
                  New
                </span>
              )}

              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-white/80" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Bottom Cards */}
      <div className="p-3.5 space-y-3 border-t border-white/[0.06] bg-[#0A0718]/40">
        
        {/* Upgrade to Premium Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-900/50 via-[#19102F] to-pink-950/40 border border-purple-500/20 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
          
          <div className="flex items-center space-x-2.5 mb-1.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 shadow-sm">
              <Crown className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-white font-display">Upgrade to Premium</span>
          </div>

          <p className="text-[11px] text-purple-200/70 leading-relaxed mb-3">
            Unlock advanced AI vision coaching, custom macro algorithms & bio-rhythms.
          </p>

          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-pink-500 hover:opacity-95 shadow-md shadow-purple-900/40 transition flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upgrade Now</span>
          </button>
        </div>

        {/* Daily Motivation Card */}
        <div className="p-3 rounded-2xl bg-[#19102F]/60 border border-white/[0.04] flex items-start space-x-2.5">
          <div className="p-1.5 rounded-xl bg-pink-500/10 text-pink-400 shrink-0 mt-0.5">
            <Heart className="w-3.5 h-3.5 animate-pulse text-pink-400" />
          </div>
          <div className="flex-1">
            <div className="text-[9px] font-bold uppercase tracking-wider text-pink-300/60 mb-0.5">Daily Motivation</div>
            <p className="text-[11px] text-gray-300 italic font-medium leading-snug">
              "{todayQuote.quote}"
            </p>
          </div>
        </div>

      </div>

    </aside>
  );
}
