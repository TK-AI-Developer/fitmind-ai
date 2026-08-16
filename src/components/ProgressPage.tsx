import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Flame,
  Award,
  Calendar,
  Trophy,
  Sparkles,
  Scale,
  Activity,
  Heart,
  ChevronRight,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import { useWellness } from '../context/WellnessContext';
import { ACHIEVEMENTS_LIST } from '../data/mockData';

export default function ProgressPage() {
  const { stats, updateWeight, user, triggerCelebration } = useWellness();

  const [weightInput, setWeightInput] = useState('');
  const [activeTimeframe, setActiveTimeframe] = useState<'30D' | '90D' | '1Y'>('30D');

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(weightInput);
    if (!isNaN(val) && val > 30 && val < 250) {
      updateWeight(val);
      setWeightInput('');
      triggerCelebration();
    }
  };

  const detailedWeightData = [
    { date: 'Jan 01', weight: 69.8, bodyFat: 23.5 },
    { date: 'Jan 15', weight: 69.1, bodyFat: 23.0 },
    { date: 'Feb 01', weight: 68.4, bodyFat: 22.4 },
    { date: 'Feb 15', weight: 68.0, bodyFat: 22.0 },
    { date: 'Today', weight: stats.weight, bodyFat: 21.6 }
  ];

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <span>AI Progress Analytics & Milestones</span>
          </h1>
          <p className="text-xs text-gray-500">
            Comprehensive body composition trends, metabolic rate trajectory, and achievement badges.
          </p>
        </div>

        {/* Quick Log Weight */}
        <form onSubmit={handleWeightSubmit} className="flex items-center space-x-2">
          <input
            type="number"
            step="0.1"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            placeholder="Log weight (kg)"
            className="w-36 bg-white border border-[#E8EAF0] focus:border-purple-500 rounded-xl px-3 py-1.5 text-xs text-gray-800 outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-[#6C3ED9] hover:bg-[#8B5CF6] text-white text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log</span>
          </button>
        </form>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Weight Trajectory */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Current Weight</span>
            <div className="text-2xl font-bold font-display text-gray-900">
              {stats.weight} <span className="text-xs text-gray-400 font-normal">kg</span>
            </div>
            <span className="text-xs font-bold text-emerald-600">
              ↓ 1.8 kg this month
            </span>
          </div>
        </div>

        {/* Total Calorie Burn */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-500 shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Total Calories Burned</span>
            <div className="text-2xl font-bold font-display text-gray-900">
              14,850 <span className="text-xs text-gray-400 font-normal">kcal</span>
            </div>
            <span className="text-xs font-semibold text-orange-600">
              Top 8% this month
            </span>
          </div>
        </div>

        {/* Consistency Streak */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Consistency Streak</span>
            <div className="text-2xl font-bold font-display text-gray-900">
              {user.streak} <span className="text-xs text-gray-400 font-normal">Days</span>
            </div>
            <span className="text-xs font-bold text-purple-600">
              Personal Record 🔥
            </span>
          </div>
        </div>

      </div>

      {/* Weight & Body Fat Long-term Chart */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-gray-900">Weight & Body Composition Trajectory</h3>
            <p className="text-xs text-gray-400">Target goal: 60.0 kg (Healthy BMI: 21.4)</p>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#F7F8FC] p-1 rounded-xl border border-[#E8EAF0]">
            {(['30D', '90D', '1Y'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTimeframe(t)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTimeframe === t ? 'bg-purple-600 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={detailedWeightData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#100B24', borderRadius: '12px', border: 'none', color: '#fff' }}
              />
              <Area type="monotone" dataKey="weight" stroke="#6C3ED9" strokeWidth={3} fill="url(#weightGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-gray-900">Achievement & Milestone Badges</h3>
            <p className="text-xs text-gray-400">Earn badges by upholding daily healthy routines.</p>
          </div>
          <span className="text-xs font-bold text-purple-600">3/6 Unlocked</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACHIEVEMENTS_LIST.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between space-y-2 transition ${
                ach.unlocked
                  ? 'bg-purple-50/70 border-purple-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-50 grayscale'
              }`}
            >
              <span className="text-3xl">{ach.icon}</span>
              <div>
                <h5 className="text-xs font-bold text-gray-900">{ach.title}</h5>
                <p className="text-[10px] text-gray-500 mt-0.5">{ach.description}</p>
              </div>
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                ach.unlocked ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {ach.unlocked ? 'Earned' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
