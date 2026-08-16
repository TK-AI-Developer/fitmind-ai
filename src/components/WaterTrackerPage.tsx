import React from 'react';
import { motion } from 'motion/react';
import {
  Droplet,
  Plus,
  Minus,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from 'recharts';
import { useWellness } from '../context/WellnessContext';

export default function WaterTrackerPage() {
  const { stats, logWater, triggerCelebration } = useWellness();

  const glassesCount = Math.round(stats.water / 250);
  const targetGlasses = Math.round(stats.waterTarget / 250);
  const percentage = Math.min(100, Math.round((stats.water / stats.waterTarget) * 100));

  const handleAddGlass = (ml: number) => {
    logWater(ml);
    triggerCelebration();
  };

  const waterHistoryData = [
    { day: 'Mon', ml: 2000 },
    { day: 'Tue', ml: 2250 },
    { day: 'Wed', ml: 1750 },
    { day: 'Thu', ml: 2500 },
    { day: 'Fri', ml: 2000 },
    { day: 'Sat', ml: 2250 },
    { day: 'Sun', ml: stats.water }
  ];

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <Droplet className="w-6 h-6 text-blue-500" />
            <span>AI Smart Hydration Tracker</span>
          </h1>
          <p className="text-xs text-gray-500">
            Maintain optimal cellular electrolyte balance and cognitive performance with personalized fluid pacing.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>Hydration Goal: {stats.waterTarget} ml / day</span>
        </div>
      </div>

      {/* Main Hydration Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Interactive Water Bottle Visualizer (6 cols) */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-[#100B24] via-[#151936] to-[#1E2958] text-white border border-blue-900/40 shadow-xl flex flex-col items-center justify-between relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="w-full flex justify-between items-center text-xs">
            <span className="text-blue-300 font-bold uppercase tracking-wider">Hydration Level</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold">
              {percentage}% Complete
            </span>
          </div>

          {/* Animated Water Reservoir Glass */}
          <div className="relative my-8 w-36 h-60 sm:w-44 sm:h-72 rounded-3xl border-4 border-white/20 bg-white/5 p-2 backdrop-blur-xs flex flex-col justify-end overflow-hidden shadow-2xl">
            <motion.div
              className="w-full rounded-2xl bg-gradient-to-t from-blue-600 via-cyan-400 to-blue-400 relative overflow-hidden"
              style={{ height: `${percentage}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              {/* Wave shimmer */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-white/40 blur-xs rounded-full" />
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white drop-shadow-md">
                {stats.water} <span className="text-sm">ml</span>
              </span>
              <span className="text-xs text-white/80 font-medium">
                {glassesCount} of {targetGlasses} Glasses
              </span>
            </div>
          </div>

          {/* Quick Increment Buttons */}
          <div className="flex items-center space-x-3 w-full max-w-xs">
            <button
              onClick={() => handleAddGlass(250)}
              className="flex-1 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-500/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+1 Glass (250ml)</span>
            </button>

            <button
              onClick={() => handleAddGlass(500)}
              className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+Bottle (500ml)</span>
            </button>
          </div>
        </div>

        {/* Right 7-Day Chart & AI Insights (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Weekly Water Intake Chart */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-display text-gray-900">7-Day Hydration Consistency</h3>
              <span className="text-xs font-mono font-bold text-blue-600">Avg: 2,150 ml</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterHistoryData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip
                    formatter={(val) => [`${val} ml`, 'Water']}
                    contentStyle={{ backgroundColor: '#100B24', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Bar dataKey="ml" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Hydration Schedule & Tips */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-3">
            <h4 className="text-sm font-bold font-display text-gray-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>AI Recommended Hydration Schedule</span>
            </h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/60 text-xs">
                <span className="font-semibold text-blue-900">07:30 AM — Morning Wake-up Flush</span>
                <span className="font-mono text-blue-600 font-bold">500 ml</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs">
                <span className="font-semibold text-gray-700">11:00 AM — Mid-Morning Focus Boost</span>
                <span className="font-mono text-gray-500 font-bold">350 ml</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs">
                <span className="font-semibold text-gray-700">03:30 PM — Pre-Workout Hydration</span>
                <span className="font-mono text-gray-500 font-bold">500 ml</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs">
                <span className="font-semibold text-gray-700">08:00 PM — Evening Recovery Sip</span>
                <span className="font-mono text-gray-500 font-bold">250 ml</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
