import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Sparkles,
  Check,
  X,
  Zap,
  ShieldCheck,
  Star,
  ArrowRight
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function UpgradeModal() {
  const { isUpgradeModalOpen, setIsUpgradeModalOpen, updateUser, triggerCelebration } = useWellness();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedTier, setSelectedTier] = useState<'pro' | 'elite'>('pro');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isUpgradeModalOpen) return null;

  const handleUpgrade = () => {
    setIsSuccess(true);
    triggerCelebration();
    updateUser({ isPremium: true, plan: selectedTier === 'elite' ? 'Elite AI Coach' : 'FitMind Pro' });
    setTimeout(() => {
      setIsSuccess(false);
      setIsUpgradeModalOpen(false);
    }, 1800);
  };

  const proFeatures = [
    'Unlimited AI Coach conversations & voice mode',
    'Dynamic macro calorie & custom grocery plans',
    'Unlimited HIIT & Interval workout routines',
    'Full access to 100+ gourmet fitness recipes',
    'Advanced circadian sleep & recovery metrics'
  ];

  const eliteFeatures = [
    'Everything in FitMind Pro',
    '1-on-1 AI Biometric Computer Vision analysis',
    'Continuous metabolic glucose synchronization',
    'Priority neural response latency (<200ms)',
    'VIP Community verified badge & challenges'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8EAF0] shadow-2xl p-6 sm:p-8 relative text-left overflow-hidden"
      >
        <button
          onClick={() => setIsUpgradeModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-purple-200/40 to-transparent blur-2xl pointer-events-none" />

        <div className="text-center max-w-md mx-auto space-y-2 mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[11px] font-bold shadow-sm">
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>Unlock Premium AI Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 leading-tight">
            Elevate Your Body & Mind
          </h2>

          <p className="text-xs text-gray-500">
            Choose your AI tier and accelerate your transformation with personalized health biometrics.
          </p>

          {/* Monthly / Yearly Switch */}
          <div className="pt-3 flex items-center justify-center space-x-3">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#100B24] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <span>Yearly</span>
              <span className="px-1.5 py-0.2 bg-emerald-400 text-slate-950 text-[9px] font-extrabold rounded-md uppercase">
                Save 35%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* FitMind Pro Card */}
          <div
            onClick={() => setSelectedTier('pro')}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
              selectedTier === 'pro'
                ? 'border-purple-600 bg-purple-50/40 shadow-md ring-2 ring-purple-400/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold font-display text-gray-900">FitMind Pro</span>
                {selectedTier === 'pro' && (
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold font-display text-gray-900">
                {billingCycle === 'yearly' ? '$9.99' : '$14.99'} <span className="text-xs font-normal text-gray-400">/ mo</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Ideal for daily fitness & nutrition optimization.</p>

              <div className="space-y-2 pt-4">
                {proFeatures.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2 text-[11px] text-gray-700">
                    <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FitMind Elite Card */}
          <div
            onClick={() => setSelectedTier('elite')}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between relative ${
              selectedTier === 'elite'
                ? 'border-purple-600 bg-purple-50/40 shadow-md ring-2 ring-purple-400/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[9px] font-extrabold uppercase">
              Most Popular
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold font-display text-gray-900">FitMind Elite</span>
                {selectedTier === 'elite' && (
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold font-display text-gray-900">
                {billingCycle === 'yearly' ? '$18.99' : '$24.99'} <span className="text-xs font-normal text-gray-400">/ mo</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">For athletes & longevity biohackers.</p>

              <div className="space-y-2 pt-4">
                {eliteFeatures.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2 text-[11px] text-gray-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 fill-current" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <button
          onClick={handleUpgrade}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-pink-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
        >
          {isSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Membership Upgraded! Welcome to Pro 🚀</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Start 7-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-gray-400 mt-3">
          Cancel anytime with 1-click. 100% money-back guarantee within 30 days.
        </p>
      </motion.div>
    </div>
  );
}
