import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Moon,
  Shield,
  CreditCard,
  Save,
  Sparkles,
  Crown,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function Settings() {
  const { user, updateUser, setIsUpgradeModalOpen, triggerCelebration } = useWellness();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [targetWeight, setTargetWeight] = useState(user.targetWeight || 60);
  const [notifications, setNotifications] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      targetWeight
    });
    setSavedSuccess(true);
    triggerCelebration();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <SettingsIcon className="w-6 h-6 text-purple-600" />
            <span>Account & Wellness Preferences</span>
          </h1>
          <p className="text-xs text-gray-500">
            Manage biometrics targets, AI telemetry configurations, and plan subscription.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Your wellness profile and preferences have been updated successfully!</span>
        </motion.div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-display text-gray-900 flex items-center space-x-2">
            <User className="w-4 h-4 text-purple-600" />
            <span>Personal Profile & Biometrics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-[#F7F8FC] border border-[#E8EAF0] focus:border-purple-500 focus:bg-white rounded-xl text-xs text-gray-800 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-[#F7F8FC] border border-[#E8EAF0] focus:border-purple-500 focus:bg-white rounded-xl text-xs text-gray-800 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Target Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={targetWeight}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
                className="w-full p-2.5 bg-[#F7F8FC] border border-[#E8EAF0] focus:border-purple-500 focus:bg-white rounded-xl text-xs text-gray-800 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Current Active Plan</label>
              <div className="flex items-center justify-between p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl text-xs font-bold text-purple-900">
                <span className="flex items-center space-x-1.5">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>FitMind Pro Tier</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="text-[11px] text-purple-600 hover:text-purple-800 font-bold"
                >
                  Manage Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & AI Sync */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-display text-gray-900 flex items-center space-x-2">
            <Bell className="w-4 h-4 text-purple-600" />
            <span>AI Reminders & Smart Notifications</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0] cursor-pointer">
              <div>
                <div className="text-xs font-bold text-gray-900">Hydration & Water Drink Prompts</div>
                <div className="text-[11px] text-gray-500">Receive periodic fluid reminders based on active temperature</div>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0] cursor-pointer">
              <div>
                <div className="text-xs font-bold text-gray-900">Circadian Wind-down Alarms</div>
                <div className="text-[11px] text-gray-500">Automatic 45-minute bedtime blue light alerts</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-purple-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition flex items-center space-x-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>

      </form>

    </div>
  );
}
