import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Flame,
  Droplet,
  Brain,
  Activity,
  TrendingUp,
  Play,
  Pause,
  ArrowRight,
  Heart,
  ChevronRight,
  Moon,
  Clock,
  Dumbbell,
  Utensils,
  Plus,
  RotateCcw,
  CheckCircle,
  Zap,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Tooltip
} from 'recharts';
import { useWellness } from '../context/WellnessContext';
import heroModelImg from '../assets/images/fitmind_hero_model_1786919479470.jpg';

export default function Dashboard() {
  const {
    user,
    stats,
    meals,
    workouts,
    setActiveTab,
    logWater,
    logSteps,
    setActiveWorkout,
    triggerCelebration
  } = useWellness();

  // Mini timer state for the "Current Exercise" widget
  const [timerSeconds, setTimerSeconds] = useState(24);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => (prev > 1 ? prev - 1 : 45));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const formattedTimer = `00:${timerSeconds.toString().padStart(2, '0')}`;
  const timerProgress = ((45 - timerSeconds) / 45) * 100;

  // Calorie calculations
  const caloriesLeft = Math.max(0, stats.calorieTarget - stats.calories);
  const caloriePercent = Math.min(100, Math.round((stats.calories / stats.calorieTarget) * 100));

  // Water calculations
  const waterGlasses = Math.round(stats.water / 250);
  const waterTargetGlasses = Math.round(stats.waterTarget / 250);

  const handleStartWorkout = (workout: any) => {
    setActiveWorkout(workout);
    setActiveTab('timer-exercises');
    triggerCelebration();
  };

  return (
    <div className="space-y-6 text-left pb-12">
      
      {/* 1. HERO WELLNESS SECTION & MAIN HEALTH STAT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Hero Card (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-7 relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#EDE9FE] via-[#F3E8FF] to-[#FAF5FF] border border-[#DDD6FE] overflow-hidden flex flex-col justify-between shadow-sm min-h-[300px]"
        >
          {/* Subtle Ambient Shapes */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#8B5CF6]/20 to-pink-400/20 rounded-full blur-2xl -z-0 pointer-events-none" />
          <div className="absolute bottom-[-30px] left-1/3 w-44 h-44 bg-purple-300/20 rounded-full blur-xl -z-0 pointer-events-none" />

          {/* Floating Fitness Illustration in top-right */}
          <div className="hidden sm:block absolute right-4 bottom-4 w-48 h-48 md:w-56 md:h-56 z-0 pointer-events-none">
            <motion.img
              src={heroModelImg}
              alt="Fitness Wellness"
              className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white/80"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative z-10 space-y-3 max-w-md">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 border border-purple-200 text-purple-700 text-xs font-bold tracking-wide">
              <span>Good Morning, {user.name} ☀️</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight text-[#1F2437]">
              Your Health Journey, <br />
              <span className="bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              Get personalized diet plans, smart workout recommendations, and wellness support — all in one place.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
            <button
              onClick={() => setActiveTab('ai-coach')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition flex items-center space-x-2 cursor-pointer"
            >
              <span>Ask AI Coach</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-[#E8EAF0] text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
            >
              See My Progress
            </button>
          </div>
        </motion.div>

        {/* Right 3 Stat Cards Column (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          
          {/* Top Row of 2 Small Cards */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Weight Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="p-4 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Weight</span>
                <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
              </div>
              
              <div className="my-2">
                <div className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                  {stats.weight} <span className="text-xs text-gray-400 font-normal">kg</span>
                </div>
                <div className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center">
                  <span>↓ 1.8 kg this month</span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="h-8 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.weightHistory}>
                    <Line type="monotone" dataKey="weight" stroke="#39B982" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Calories Ring Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="p-4 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Calories</span>
                <span className="p-1.5 rounded-xl bg-orange-50 text-orange-500">
                  <Flame className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="my-1 flex items-center justify-between">
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display text-gray-900 leading-tight">
                    {stats.calories.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-400">of {stats.calorieTarget} kcal</div>
                  <div className="text-[10px] font-semibold text-purple-600 mt-0.5">
                    {caloriesLeft} kcal left
                  </div>
                </div>

                {/* Mini Circular Progress Ring */}
                <div className="relative w-12 h-12 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#8B5CF6]"
                      strokeDasharray={`${caloriePercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono text-gray-700">
                    {caloriePercent}%
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Current Exercise Card (Large with Circular Animated Timer) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#100B24] via-[#19102F] to-[#20153D] text-white shadow-lg border border-purple-900/40 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  Current Exercise
                </span>
              </div>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                Round 3/8
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold font-display text-white">
                  Circuit Training – Full Body
                </h3>
                <p className="text-[11px] text-purple-200/80">
                  Next Exercise: <span className="text-pink-300 font-semibold">Jump Squats</span>
                </p>

                <div className="pt-2 flex items-center space-x-2">
                  <button
                    onClick={toggleTimer}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-90 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-md shadow-purple-900/50"
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Resume</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setActiveWorkout(workouts[0]);
                      setActiveTab('timer-exercises');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition cursor-pointer"
                  >
                    Open Timer
                  </button>
                </div>
              </div>

              {/* Large Glowing Circular Timer */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-purple-950"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-pink-400"
                    strokeDasharray={`${timerProgress}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm font-bold font-mono text-white tracking-tighter">
                    {formattedTimer}
                  </span>
                  <span className="text-[8px] text-purple-300/70 uppercase">Work</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* 2. QUICK FEATURE 4-CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* AI Diet Planner Card */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setActiveTab('diet-planner')}
          className="p-5 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md hover:border-purple-200 transition cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center space-x-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 overflow-hidden shrink-0 border border-orange-100 p-1">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80"
                alt="AI Diet"
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-gray-900 group-hover:text-purple-600 transition">
                AI Diet Planner
              </h4>
              <p className="text-[11px] text-gray-400">Personalized macro meals</p>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold text-orange-500 group-hover:text-purple-600 transition pt-1">
            <span>Create Plan</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Workout Tracker Card */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setActiveTab('workout-tracker')}
          className="p-5 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md hover:border-purple-200 transition cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center space-x-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 overflow-hidden shrink-0 border border-purple-100 p-1">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80"
                alt="Workout Tracker"
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-gray-900 group-hover:text-purple-600 transition">
                Workout Tracker
              </h4>
              <p className="text-[11px] text-gray-400">Sets, reps & routines</p>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold text-purple-600 group-hover:text-purple-700 transition pt-1">
            <span>Start Tracking</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Mental Wellness Card */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setActiveTab('mental-wellness')}
          className="p-5 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md hover:border-purple-200 transition cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center space-x-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 overflow-hidden shrink-0 border border-blue-100 p-1">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&auto=format&fit=crop&q=80"
                alt="Mental Wellness"
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-gray-900 group-hover:text-purple-600 transition">
                Mental Wellness
              </h4>
              <p className="text-[11px] text-gray-400">Guided calm & journals</p>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold text-blue-500 group-hover:text-purple-600 transition pt-1">
            <span>Start Journaling</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* AI Coach Card */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setActiveTab('ai-coach')}
          className="p-5 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md hover:border-purple-200 transition cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center space-x-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 overflow-hidden shrink-0 border border-emerald-100 p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#6C3ED9] to-[#8B5CF6] flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-gray-900 group-hover:text-purple-600 transition">
                AI Coach
              </h4>
              <p className="text-[11px] text-gray-400">Instant wellness answers</p>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:text-purple-600 transition pt-1">
            <span>Chat Now</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

      </div>

      {/* 3. TODAY'S OVERVIEW BENTO SECTION */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-display text-gray-900">Today's Overview</h2>
            <p className="text-xs text-gray-400">Real-time health telemetry & biometrics</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-50 text-[#6C3ED9] text-xs font-bold">
            Live Synchronized
          </span>
        </div>

        {/* Top 3 Metric Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Steps */}
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-500 flex items-center">
                <Activity className="w-3.5 h-3.5 text-[#8B5CF6] mr-1.5" />
                Steps
              </span>
              <span className="font-mono font-bold text-gray-900">
                {stats.steps.toLocaleString()} / {stats.stepsTarget.toLocaleString()}
              </span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.stepsHistory}>
                  <Bar dataKey="steps" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-400">
              <span>{Math.round((stats.steps / stats.stepsTarget) * 100)}% achieved</span>
              <button
                onClick={() => logSteps(1000)}
                className="text-purple-600 hover:text-purple-800 font-bold flex items-center cursor-pointer"
              >
                <Plus className="w-3 h-3 mr-0.5" /> 1K Steps
              </button>
            </div>
          </div>

          {/* Active Time */}
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-500 flex items-center">
                <Clock className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
                Active Time
              </span>
              <span className="font-mono font-bold text-gray-900">
                {Math.floor(stats.activeMinutes / 60)}h {stats.activeMinutes % 60}m / 2h
              </span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.activeTimeHistory}>
                  <Bar dataKey="mins" fill="#FF9F43" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[10px] text-gray-400">
              {Math.round((stats.activeMinutes / stats.activeMinutesTarget) * 100)}% of daily target
            </div>
          </div>

          {/* Calories Burned */}
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-500 flex items-center">
                <Flame className="w-3.5 h-3.5 text-[#FF5A6A] mr-1.5" />
                Calories Burned
              </span>
              <span className="font-mono font-bold text-gray-900">
                {stats.caloriesBurned} / {stats.calorieBurnTarget} kcal
              </span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.caloriesBurnedHistory}>
                  <Bar dataKey="cal" fill="#FF5A6A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[10px] text-gray-400">
              {Math.round((stats.caloriesBurned / stats.calorieBurnTarget) * 100)}% burned
            </div>
          </div>

        </div>

        {/* Bottom 3 Health Indicators: Water, Sleep, Heart Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          
          {/* Water Intake */}
          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#F7F8FC]">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-500 shrink-0">
              <Droplet className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Water Intake</span>
              <div className="text-sm font-bold font-display text-gray-900">
                {waterGlasses} / {waterTargetGlasses} Glasses
              </div>
              <div className="flex items-center space-x-1 mt-1.5">
                {Array.from({ length: waterTargetGlasses }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-3.5 rounded-xs transition-all ${
                      i < waterGlasses ? 'bg-blue-500 shadow-sm' : 'bg-gray-200'
                    }`}
                  />
                ))}
                <button
                  onClick={() => logWater(250)}
                  className="p-1 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-600 ml-1 transition cursor-pointer"
                  title="Drink Glass (250ml)"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Sleep */}
          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#F7F8FC]">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Sleep Duration</span>
              <div className="text-sm font-bold font-display text-gray-900">
                {stats.sleep}h <span className="text-xs text-gray-400 font-normal">/ {stats.sleepTarget}h</span>
              </div>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[10px]">
                {stats.sleepQuality} Quality
              </span>
            </div>
          </div>

          {/* Heart Rate with Animated Wave Sparkline */}
          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#F7F8FC]">
            <div className="p-3 rounded-2xl bg-red-50 text-red-500 shrink-0">
              <Heart className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Heart Rate</span>
              <div className="text-sm font-bold font-display text-gray-900">
                {stats.heartRate} <span className="text-[10px] text-gray-400 font-normal">bpm (Normal)</span>
              </div>
              <div className="h-6 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.heartRateHistory}>
                    <defs>
                      <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5A6A" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FF5A6A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="bpm" stroke="#FF5A6A" strokeWidth={1.5} fill="url(#hrGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. RECOMMENDED FOR YOU & TODAY'S DIET PLAN DUAL SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recommended Workouts (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-display text-gray-900">Recommended For You</h3>
            <button
              onClick={() => setActiveTab('workout-tracker')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 transition"
            >
              See All
            </button>
          </div>

          <div className="space-y-3">
            {workouts.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]/80 hover:border-purple-200 transition flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 font-display group-hover:text-purple-600 transition">
                      {w.title}
                    </h5>
                    <p className="text-[10px] text-gray-400">
                      {w.durationMinutes} min • {w.caloriesBurn} kcal • {w.difficulty}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleStartWorkout(w)}
                  className="p-2 rounded-xl bg-white group-hover:bg-[#6C3ED9] text-gray-700 group-hover:text-white shadow-sm border border-[#E8EAF0] transition cursor-pointer"
                  title="Start Workout"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Diet Plan (1200 kcal) & Nutrition Macros (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-gray-900">
                Today's Diet Plan <span className="text-xs font-mono font-semibold text-purple-600">(1,200 kcal)</span>
              </h3>
              <p className="text-xs text-gray-400">Macro-balanced Mediterranean nutrition</p>
            </div>
            <button
              onClick={() => setActiveTab('diet-planner')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 transition"
            >
              Full Diet Plan
            </button>
          </div>

          {/* 4 Meal Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {meals.map((meal) => (
              <div
                key={meal.id}
                onClick={() => setActiveTab('diet-planner')}
                className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]/80 hover:border-purple-200 transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="relative mb-2">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-16 object-cover rounded-xl group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[8px] font-bold text-white uppercase">
                    {meal.type}
                  </span>
                </div>
                <div>
                  <h6 className="text-[11px] font-bold text-gray-900 line-clamp-1 group-hover:text-purple-600 transition">
                    {meal.title}
                  </h6>
                  <span className="text-[10px] text-purple-600 font-mono font-bold">
                    {meal.calories} kcal
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Macro Progress Bars: Protein, Carbs, Fats, Fiber */}
          <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-100 text-center">
            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Protein</span>
              <div className="text-xs font-mono font-bold text-gray-900">
                {stats.nutrition.protein}g <span className="text-gray-400 text-[10px]">/{stats.nutrition.proteinTarget}g</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#8B5CF6] h-full rounded-full"
                  style={{ width: `${Math.min(100, (stats.nutrition.protein / stats.nutrition.proteinTarget) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Carbs</span>
              <div className="text-xs font-mono font-bold text-gray-900">
                {stats.nutrition.carbs}g <span className="text-gray-400 text-[10px]">/{stats.nutrition.carbsTarget}g</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#FF9F43] h-full rounded-full"
                  style={{ width: `${Math.min(100, (stats.nutrition.carbs / stats.nutrition.carbsTarget) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Fats</span>
              <div className="text-xs font-mono font-bold text-gray-900">
                {stats.nutrition.fat}g <span className="text-gray-400 text-[10px]">/{stats.nutrition.fatTarget}g</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#FF5A6A] h-full rounded-full"
                  style={{ width: `${Math.min(100, (stats.nutrition.fat / stats.nutrition.fatTarget) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Fiber</span>
              <div className="text-xs font-mono font-bold text-gray-900">
                {stats.nutrition.fiber}g <span className="text-gray-400 text-[10px]">/{stats.nutrition.fiberTarget}g</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#39B982] h-full rounded-full"
                  style={{ width: `${Math.min(100, (stats.nutrition.fiber / stats.nutrition.fiberTarget) * 100)}%` }}
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
