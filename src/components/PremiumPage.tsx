import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PremiumPageProps {
  user: any;
  onRefreshUser: () => void;
  setActiveTab: (tab: string) => void;
}

export default function PremiumPage({ user, onRefreshUser, setActiveTab }: PremiumPageProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.id}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.5 }
        });
        onRefreshUser();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success || user.isPremium) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center min-h-[80vh] text-left">
        <div className="max-w-md w-full bg-slate-950/60 border border-slate-900 p-8 rounded-3xl shadow-2xl space-y-6 text-center">
          <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-400 border border-purple-500/20 mb-2">
            <Sparkles className="w-10 h-10 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display text-white">Pro Membership Activated!</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Congratulations! You are now a premium member of FitMind AI. Enjoy unlimited context-aware AI coaching sessions, dynamic plan compilations, and advanced health reports.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-sm transition"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6 max-w-4xl mx-auto text-left overflow-y-auto h-screen">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-900">
        <h1 className="text-2xl font-bold font-display text-white flex items-center space-x-2.5">
          <Sparkles className="w-6 h-6 text-yellow-400 fill-current" />
          <span>Premium SaaS Upgrades</span>
        </h1>
        <p className="text-xs text-gray-400">Unlock full-stack AI coaching, automatic macros, and weekly reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Pricing details */}
        <div className="p-8 rounded-3xl bg-purple-950/15 border-2 border-purple-500 flex flex-col justify-between space-y-8 relative">
          <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-purple-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
            Best Value
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-purple-400">Pro Premium Package</div>
            <div className="flex items-baseline space-x-1">
              <span className="text-5xl font-mono font-extrabold text-white">$19</span>
              <span className="text-gray-500 text-sm">/ month</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Provides full-stack diagnostic algorithms to construct custom, safe wellness strategies.
            </p>

            <div className="border-t border-purple-900/40 pt-5 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Unlimited server-side AI Coach sessions</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>AI Diet Plan dynamic regeneration</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Dumbbell / Home workout plan compilations</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-purple-950/25 disabled:opacity-50"
          >
            {loading ? (
              <span>Activating Premium...</span>
            ) : (
              <>
                <span>Upgrade Premium Now</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </>
            )}
          </button>
        </div>

        {/* Right Side: Security guarantee */}
        <div className="p-8 rounded-3xl bg-slate-950/60 border border-slate-900 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-900 border border-slate-850 rounded-2xl text-purple-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Secure SaaS Encryption</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We process subscription tokens using sandbox mock gateways. No real currency is charged during this build checkout simulator. Your profile parameters and health indices remain 100% confidential.
            </p>
          </div>

          <div className="p-4 bg-slate-900/50 border border-slate-900 rounded-2xl text-xs space-y-2 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <span>Cancel membership in 1 click at any time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <span>Full compliance with HIPAA data formats</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
