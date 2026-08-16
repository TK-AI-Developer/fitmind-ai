import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, X, Sparkles } from 'lucide-react';
import AICoach from './AICoach';

interface GlobalAICoachDrawerProps {
  user: any;
}

export default function GlobalAICoachDrawer({ user }: GlobalAICoachDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          id="global-ai-coach-btn"
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 border border-purple-500/30 cursor-pointer"
          title="Consult AI Wellness Coach"
        >
          {/* Pulse Glow Effect */}
          <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping opacity-75 group-hover:opacity-100 transition-opacity" />
          
          <Brain className="w-6 h-6 relative z-10 animate-pulse" />
          
          {/* Tooltip on hover */}
          <span className="absolute right-14 bg-slate-950/95 border border-slate-900 text-purple-300 text-[10px] font-bold font-mono py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            CONSULT COACH
          </span>
        </button>
      </div>

      {/* Drawer Overlay & Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              id="global-ai-coach-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Slide-out Sidebar Panel */}
            <motion.div
              id="global-ai-coach-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] md:w-[520px] bg-[#070b13] border-l border-slate-900 shadow-2xl z-50 flex flex-col h-screen overflow-hidden"
            >
              {/* Drawer Top Header controls */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950/60 border-b border-slate-900/80 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-spin-slow" />
                  <span className="text-xs font-bold font-mono tracking-widest text-purple-400 uppercase">Interactive Companion</span>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-gray-400 hover:text-white transition border border-slate-850"
                  title="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Core AICoach View component */}
              <div className="flex-1 overflow-hidden bg-gradient-to-b from-[#070b13] to-slate-950/40">
                <AICoach />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
