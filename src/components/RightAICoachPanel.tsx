import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Maximize2,
  Minimize2,
  Utensils,
  Dumbbell,
  TrendingUp,
  ChefHat,
  Crown,
  ChevronRight,
  RefreshCw,
  Zap
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function RightAICoachPanel() {
  const {
    user,
    aiMessages,
    isAiTyping,
    sendAiMessage,
    clearAiChat,
    setActiveTab,
    isAICoachPanelOpen,
    setIsAICoachPanelOpen,
    setIsUpgradeModalOpen
  } = useWellness();

  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, isAiTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendAiMessage(inputVal);
    setInputVal('');
  };

  const handleQuickPrompt = (prompt: string) => {
    sendAiMessage(prompt);
  };

  if (!isAICoachPanelOpen) {
    return null;
  }

  const quickActions = [
    { label: 'Diet Plan', tab: 'diet-planner', icon: Utensils, bg: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20' },
    { label: 'Workout', tab: 'workout-tracker', icon: Dumbbell, bg: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20' },
    { label: 'Progress', tab: 'progress', icon: TrendingUp, bg: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20' },
    { label: 'Recipes', tab: 'recipes', icon: ChefHat, bg: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20' },
  ];

  return (
    <aside
      className={`fixed lg:static top-0 right-0 h-full z-40 bg-white border-l border-[#E8EAF0] flex flex-col shadow-2xl lg:shadow-none transition-all duration-300 ${
        isExpanded ? 'w-full sm:w-[480px]' : 'w-full sm:w-80 xl:w-[340px]'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#E8EAF0] flex items-center justify-between bg-white/95 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6C3ED9] to-[#8B5CF6] flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1F2437] font-display flex items-center space-x-1.5">
              <span>AI Wellness Coach</span>
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            </h3>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
              🟢 Online & Active
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={clearAiChat}
            className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"
            title="Reset Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition hidden sm:block"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsAICoachPanelOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
            title="Close Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto bg-[#F7F8FC]/50 text-left">
        {aiMessages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isAi
                    ? 'bg-white text-gray-800 border border-[#E8EAF0] rounded-tl-sm'
                    : 'bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] text-white rounded-tr-sm shadow-purple-500/20'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* AI Structured Card Payload */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="mt-2.5 space-y-2">
                    {msg.cards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF0] overflow-hidden"
                      >
                        {card.image && (
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                        )}
                        <h5 className="font-bold text-gray-900 font-display text-xs">{card.title}</h5>
                        <p className="text-[10px] text-gray-500 mt-0.5">{card.subtitle}</p>
                        {card.ctaLabel && (
                          <button
                            onClick={() => card.targetTab && setActiveTab(card.targetTab)}
                            className="w-full mt-2 py-1.5 rounded-lg bg-[#6C3ED9] hover:bg-[#8B5CF6] text-white text-[11px] font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <span>{card.ctaLabel}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Action Button Chips */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {msg.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => {
                          if (act.actionType === 'navigate' && act.targetTab) {
                            setActiveTab(act.targetTab);
                          } else if (act.actionType === 'quick_reply') {
                            handleQuickPrompt(act.label);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#6C3ED9] text-[10px] font-semibold border border-purple-200/60 transition cursor-pointer flex items-center space-x-1"
                      >
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
            </motion.div>
          );
        })}

        {/* AI Typing Indicator */}
        {isAiTyping && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1.5 p-3 rounded-2xl bg-white border border-[#E8EAF0] text-gray-400 text-xs w-24"
          >
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
          </motion.div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Access Action Grid */}
      <div className="px-3.5 py-2.5 border-t border-[#E8EAF0] bg-white">
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 text-left">
          Quick AI Actions
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {quickActions.map((qa, i) => {
            const Icon = qa.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(qa.tab)}
                className={`p-2 rounded-xl border border-transparent transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${qa.bg}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-bold">{qa.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Message Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-[#E8EAF0] bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask AI Coach anything..."
            className="w-full bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#8B5CF6] focus:bg-white text-xs text-gray-800 placeholder-gray-400 rounded-full pl-4 pr-10 py-2.5 outline-none transition"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isAiTyping}
            className="absolute right-1.5 p-2 rounded-full bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] text-white disabled:opacity-40 hover:opacity-95 shadow-sm transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Bottom Promo Card: "Unlock Your Best Self" */}
      <div className="p-3.5 bg-gradient-to-br from-[#100B24] via-[#19102F] to-[#2D124D] border-t border-purple-900/40 text-left relative overflow-hidden">
        <div className="flex items-center space-x-2.5 mb-1">
          <div className="p-1.5 rounded-lg bg-amber-400 text-slate-950">
            <Crown className="w-3.5 h-3.5 fill-current" />
          </div>
          <h4 className="text-xs font-bold text-white font-display">Unlock Your Best Self</h4>
        </div>
        <p className="text-[10px] text-purple-200/70 leading-snug mb-2.5">
          Go Premium and get access to advanced AI tools, custom workouts & unlimited plans.
        </p>
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-pink-500 hover:opacity-95 text-white text-[11px] font-bold shadow-md shadow-purple-950/40 transition flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Upgrade Now</span>
        </button>
      </div>
    </aside>
  );
}
