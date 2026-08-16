import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Sparkles,
  Send,
  RefreshCw,
  Utensils,
  Dumbbell,
  TrendingUp,
  ChefHat,
  Mic,
  Smile,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function AICoach() {
  const {
    user,
    aiMessages,
    isAiTyping,
    sendAiMessage,
    clearAiChat,
    setActiveTab,
    triggerCelebration
  } = useWellness();

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
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

  const handleVoiceSimulation = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      sendAiMessage('Recommend a high-protein post-workout meal under 500 calories.');
      triggerCelebration();
    }, 2000);
  };

  const suggestedPrompts = [
    { title: 'Personalized Diet', prompt: 'Create a Mediterranean high-protein meal plan for fat loss.' },
    { title: 'Workout Program', prompt: 'Make me a 30-minute HIIT circuit for core and endurance.' },
    { title: 'Recovery & Sleep', prompt: 'How do I optimize deep sleep recovery after heavy lifting?' },
    { title: 'Hydration Strategy', prompt: 'How much water and electrolytes should I drink today?' }
  ];

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <Bot className="w-6 h-6 text-purple-600" />
            <span>FitMind AI Coach & Wellness Advisor</span>
          </h1>
          <p className="text-xs text-gray-500">
            Real-time biometric analysis, dynamic meal swaps, customized exercise routines, and mental resilience coaching.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={clearAiChat}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold border border-[#E8EAF0] shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Conversation</span>
          </button>
        </div>
      </div>

      {/* Suggested Topic Starter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => sendAiMessage(p.prompt)}
            className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] hover:border-purple-300 hover:bg-purple-50/40 transition text-left cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
                {p.title}
              </span>
              <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-relaxed">
                "{p.prompt}"
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#6C3ED9] group-hover:translate-x-1 transition-transform flex items-center mt-2">
              Ask Coach <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </button>
        ))}
      </div>

      {/* Full Chat Engine Card */}
      <div className="rounded-3xl bg-white border border-[#E8EAF0] shadow-sm flex flex-col h-[560px] overflow-hidden">
        
        {/* Chat Stream */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[#F7F8FC]/50">
          {aiMessages.map((msg) => {
            const isAi = msg.sender === 'ai';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isAi
                      ? 'bg-white text-gray-800 border border-[#E8EAF0] rounded-tl-sm'
                      : 'bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] text-white rounded-tr-sm shadow-purple-600/20'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* AI Structured Payload Cards */}
                  {msg.cards && msg.cards.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {msg.cards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0] overflow-hidden"
                        >
                          {card.image && (
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-28 object-cover rounded-xl mb-2"
                            />
                          )}
                          <h5 className="font-bold text-gray-900 font-display text-xs">{card.title}</h5>
                          <p className="text-[11px] text-gray-500 mt-0.5">{card.subtitle}</p>
                          {card.ctaLabel && (
                            <button
                              onClick={() => card.targetTab && setActiveTab(card.targetTab)}
                              className="w-full mt-2.5 py-1.5 rounded-xl bg-[#6C3ED9] hover:bg-[#8B5CF6] text-white text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                            >
                              <span>{card.ctaLabel}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Action Pills */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => {
                            if (act.actionType === 'navigate' && act.targetTab) {
                              setActiveTab(act.targetTab);
                            } else if (act.actionType === 'quick_reply') {
                              sendAiMessage(act.label);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6C3ED9] text-xs font-bold border border-purple-200 transition cursor-pointer flex items-center space-x-1"
                        >
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 mt-1 px-2">{msg.timestamp}</span>
              </motion.div>
            );
          })}

          {isAiTyping && (
            <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-white border border-[#E8EAF0] text-gray-400 text-xs w-24">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-[#E8EAF0] bg-white flex items-center space-x-2.5">
          <button
            type="button"
            onClick={handleVoiceSimulation}
            className={`p-2.5 rounded-2xl border transition cursor-pointer ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#F7F8FC] text-gray-500 hover:text-purple-600'
            }`}
            title="Voice Query Simulation"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={isListening ? 'Listening...' : 'Ask your AI Coach about diets, routines, macros, or recovery...'}
            className="flex-1 bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#8B5CF6] focus:bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 rounded-2xl px-4 py-3 outline-none transition"
          />

          <button
            type="submit"
            disabled={!inputVal.trim() || isAiTyping}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-95 text-white font-bold text-xs sm:text-sm transition disabled:opacity-40 flex items-center space-x-1.5 cursor-pointer shadow-md shadow-purple-600/20"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
