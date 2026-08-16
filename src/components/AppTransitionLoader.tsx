import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, Flame, Heart, CheckCircle2 } from 'lucide-react';

export default function AppTransitionLoader() {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Synchronizing metabolic profile...',
    'Calibrating AI nutrition & macro split...',
    'Loading custom workout programs...',
    'Initializing AI Wellness Coach...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-[#0E091E] flex flex-col items-center justify-center text-white px-4 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

      {/* Main Center Logo & Loader */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm space-y-6">
        
        {/* Animated Concentric Glowing Rings & Lotus Logo */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#6C3ED9] via-pink-500 to-purple-400 blur-md opacity-40"
          />
          
          {/* Logo Badge */}
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E1138] to-[#0E091E] border border-purple-400/50 shadow-2xl shadow-purple-900/60 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-pink-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.3L12 22l5.5-1.7c2.7-1.8 4.5-4.8 4.5-8.3 0-5.5-4.5-10-10-10z" />
              <path d="M12 6c-2.5 3-4 6-4 8 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-1.5-5-4-8z" fill="#8B5CF6" fillOpacity="0.4" />
              <path d="M12 10c-1.1 1.5-2 3-2 4 0 1.1.9 2 2 2s2-.9 2-2c0-1-.9-2.5-2-4z" fill="#EC4899" fillOpacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Brand & Progress Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
            <span>FitMind AI Engine</span>
          </div>

          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            Preparing your wellness journey...
          </h2>

          <p className="text-xs text-purple-200/70 font-mono h-5 transition-all">
            {steps[stepIndex]}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-64 bg-purple-950/60 rounded-full h-1.5 overflow-hidden border border-purple-800/40 p-0.5">
          <motion.div
            initial={{ width: '10%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.25, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-[#6C3ED9] via-pink-500 to-[#8B5CF6] rounded-full shadow-sm shadow-pink-500/50"
          />
        </div>
      </div>
    </motion.div>
  );
}
