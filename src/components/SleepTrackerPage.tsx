import React from 'react';
import { motion } from 'motion/react';
import {
  Moon,
  Sparkles,
  Clock,
  Heart,
  TrendingUp,
  Activity,
  Zap,
  Bed,
  Sun,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import { useWellness } from '../context/WellnessContext';

export default function SleepTrackerPage() {
  const { stats } = useWellness();

  const sleepStagesData = [
    { name: 'Deep Sleep', hours: 2.1, percent: 28, color: '#6C3ED9' },
    { name: 'REM Sleep', hours: 1.8, percent: 24, color: '#8B5CF6' },
    { name: 'Light Sleep', hours: 3.2, percent: 43, color: '#A78BFA' },
    { name: 'Awake / Stir', hours: 0.4, percent: 5, color: '#EDE9FE' }
  ];

  const weeklySleepHistory = [
    { day: 'Mon', hours: 7.2, quality: 85 },
    { day: 'Tue', hours: 6.8, quality: 78 },
    { day: 'Wed', hours: 8.0, quality: 92 },
    { day: 'Thu', hours: 7.5, quality: 88 },
    { day: 'Fri', hours: 7.0, quality: 80 },
    { day: 'Sat', hours: 8.5, quality: 95 },
    { day: 'Sun', hours: stats.sleep, quality: 88 }
  ];

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <Moon className="w-6 h-6 text-purple-600" />
            <span>AI Circadian & Sleep Architecture</span>
          </h1>
          <p className="text-xs text-gray-500">
            Neuro-recovery analytics, REM cycle tracking, and circadian alignment metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Sleep Quality: {stats.sleepQuality} (88/100)</span>
        </div>
      </div>

      {/* Hero Sleep Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Night Summary (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-[#100B24] via-[#1A1035] to-[#2B144E] text-white border border-purple-900/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-purple-300 font-bold uppercase tracking-wider">Last Night's Sleep</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
                Optimal Recovery
              </span>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                {stats.sleep} <span className="text-xl font-normal text-purple-200">hours</span>
              </div>
              <p className="text-xs text-purple-200/70 mt-1">
                Target: {stats.sleepTarget}h • Went to bed at 11:15 PM • Woke at 06:45 AM
              </p>
            </div>
          </div>

          {/* Sleep Stages Progress Stack */}
          <div className="my-6 space-y-2">
            <div className="text-xs font-bold text-purple-200">Sleep Architecture Breakdown</div>
            <div className="w-full h-3 rounded-full bg-purple-950 flex overflow-hidden">
              <div style={{ width: '28%' }} className="bg-[#6C3ED9] h-full" title="Deep 28%" />
              <div style={{ width: '24%' }} className="bg-[#8B5CF6] h-full" title="REM 24%" />
              <div style={{ width: '43%' }} className="bg-[#C084FC] h-full" title="Light 43%" />
              <div style={{ width: '5%' }} className="bg-white/40 h-full" title="Awake 5%" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-purple-200">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6C3ED9]" />
                <span>Deep: 2.1h (28%)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span>REM: 1.8h (24%)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C084FC]" />
                <span>Light: 3.2h (43%)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <span>Awake: 25m (5%)</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3 text-xs">
            <Bed className="w-4 h-4 text-pink-300 shrink-0" />
            <span className="text-purple-200">Consistent sleep schedule boosts growth hormone release.</span>
          </div>
        </div>

        {/* 7-Day Trend Chart & Circadian Tips (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-display text-gray-900">7-Day Sleep Duration History</h3>
              <span className="text-xs font-mono font-bold text-purple-600">Weekly Avg: 7.5h</span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySleepHistory}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip
                    formatter={(val) => [`${val} hours`, 'Duration']}
                    contentStyle={{ backgroundColor: '#100B24', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Bar dataKey="hours" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Circadian Optimization Plan */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-3">
            <h4 className="text-sm font-bold font-display text-gray-900 flex items-center space-x-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>AI Circadian Rhythm Recommendations</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]">
                <div className="font-bold text-gray-900 mb-1">Morning Sunlight Exposure</div>
                <p className="text-gray-500 leading-snug">Get 10-15 mins of direct morning sun before 09:00 AM to reset cortisol clock.</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]">
                <div className="font-bold text-gray-900 mb-1">Caffeine Cut-off Window</div>
                <p className="text-gray-500 leading-snug">Stop caffeine consumption after 02:00 PM to protect deep REM cycles.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
