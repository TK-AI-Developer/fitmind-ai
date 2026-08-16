import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bell,
  Flame,
  Bot,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User as UserIcon,
  Crown,
  Check,
  Activity,
  Droplet,
  LogOut,
  Settings as SettingsIcon,
  ShieldCheck
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { SEARCH_SUGGESTIONS } from '../data/mockData';

interface TopNavbarProps {
  onToggleMobileSidebar: () => void;
}

export default function TopNavbar({ onToggleMobileSidebar }: TopNavbarProps) {
  const {
    user,
    activeTab,
    setActiveTab,
    isAICoachPanelOpen,
    setIsAICoachPanelOpen,
    setIsUpgradeModalOpen,
    setIsAuthModalOpen,
    triggerCelebration,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationsAsRead,
    returnToLanding
  } = useWellness();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter(s =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_SUGGESTIONS.slice(0, 5);

  const handleSelectSuggestion = (tab: string, label: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E8EAF0] px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Left: Mobile Hamburger & Search Bar */}
        <div className="flex items-center space-x-3 flex-1 max-w-xl">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar Container */}
          <div ref={searchRef} className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search workouts, recipes, articles, trackers..."
                className="w-full bg-[#F7F8FC] hover:bg-[#F0F2F9] focus:bg-white text-sm text-[#1F2437] placeholder-gray-400 rounded-full pl-10 pr-4 py-2 border border-[#E8EAF0] focus:border-[#8B5CF6] focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Suggestions Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#E8EAF0] shadow-xl p-2 z-50 overflow-hidden text-left"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Quick Suggestions
                  </div>
                  <div className="space-y-0.5">
                    {filteredSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSuggestion(item.tab, item.label)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-gray-700 hover:bg-[#EDE9FE] hover:text-[#6C3ED9] transition font-medium text-left cursor-pointer"
                      >
                        <div className="flex items-center space-x-2.5">
                          <Search className="w-3.5 h-3.5 text-gray-400" />
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md font-semibold font-mono">
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Action Widgets */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5 shrink-0">
          
          {/* 12-Day Streak Badge with confetti on click */}
          <button
            onClick={triggerCelebration}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 text-orange-600 hover:bg-orange-500/20 transition cursor-pointer group"
            title="Click to celebrate streak!"
          >
            <Flame className="w-4 h-4 text-orange-500 group-hover:scale-125 transition-transform" />
            <span className="text-xs font-bold font-display tracking-tight text-orange-600">
              {user.streak} Day Streak
            </span>
          </button>

          {/* AI Coach Toggle (Mobile / Floating trigger) */}
          <button
            onClick={() => setIsAICoachPanelOpen(!isAICoachPanelOpen)}
            className={`p-2 rounded-full border transition flex items-center justify-center cursor-pointer ${
              isAICoachPanelOpen
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200'
                : 'bg-[#F7F8FC] text-gray-600 border-[#E8EAF0] hover:text-purple-600 hover:border-purple-300'
            }`}
            title="Toggle AI Coach Panel"
          >
            <Bot className="w-4 h-4" />
          </button>

          {/* Notifications Bell Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsAsRead();
              }}
              className="p-2 rounded-full bg-[#F7F8FC] text-gray-600 border border-[#E8EAF0] hover:text-purple-600 hover:border-purple-300 transition relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF5A6A] rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-[#E8EAF0] shadow-xl p-3 z-50 text-left"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-800 font-display">Notifications</span>
                    <span className="text-[10px] text-purple-600 font-semibold cursor-pointer" onClick={markNotificationsAsRead}>
                      Mark all as read
                    </span>
                  </div>

                  <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto mt-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 px-1 flex items-start space-x-2.5 text-xs">
                        <div className="p-1.5 rounded-full bg-purple-50 text-purple-600 shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium leading-snug">{n.title}</p>
                          <span className="text-[10px] text-gray-400 mt-0.5 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Pill Dropdown */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2.5 p-1 sm:pl-2 sm:pr-3 rounded-full bg-[#F7F8FC] hover:bg-[#EDE9FE] border border-[#E8EAF0] transition cursor-pointer"
            >
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500/30"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-gray-800 leading-tight flex items-center space-x-1">
                  <span>{user.name}</span>
                </span>
                <span className="text-[9px] font-semibold text-purple-600 uppercase tracking-wider">
                  {user.isPremium ? 'Pro Plan' : 'Free Member'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* User Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-[#E8EAF0] shadow-xl p-2 z-50 text-left"
                >
                  <div className="p-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-bold text-gray-800">{user.name}</p>
                    <p className="text-[10px] text-gray-400">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      returnToLanding();
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-purple-700 hover:bg-purple-50 transition font-medium cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Hero Landing Page</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition font-medium cursor-pointer"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-gray-400" />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUpgradeModalOpen(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-amber-600 hover:bg-amber-50 transition font-medium cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>Membership Tier</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-gray-500 hover:bg-gray-50 transition font-medium cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                    <span>Switch Profile</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </header>
  );
}
