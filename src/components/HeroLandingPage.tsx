import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Flame,
  Dumbbell,
  Utensils,
  Brain,
  TrendingUp,
  Droplet,
  Moon,
  Bot,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Zap,
  Activity,
  Heart,
  ShieldCheck,
  Send,
  Users,
  Award,
  ChevronRight
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import heroModelImg from '../assets/images/fitmind_hero_model_1786919479470.jpg';

export default function HeroLandingPage() {
  const { startAppJourney, setIsAuthModalOpen } = useWellness();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive AI Coach chat demo in the AI Coach Promo section
  const [demoInput, setDemoInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'user', text: 'Create a workout plan for me.' },
    { sender: 'ai', text: "Absolutely! I've created a personalized 4-day workout plan based on your goals. 💪" },
    { sender: 'user', text: 'What should I eat for recovery tonight?' },
    { sender: 'ai', text: 'A balanced bowl of grilled salmon, quinoa, and steamed broccoli (480 kcal, 38g protein) will optimize your muscle glycogen recovery! 🥗' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleSendDemoMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoInput.trim()) return;

    const userText = demoInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setDemoInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "I've tailored your daily targets to match that perfectly! Let's explore your full dashboard.";
      if (userText.toLowerCase().includes('diet') || userText.toLowerCase().includes('food') || userText.toLowerCase().includes('cal')) {
        reply = "I've mapped out your macro split: 145g Protein, 180g Carbs, 55g Healthy Fats with Mediterranean anti-inflammatory recipes! 🥑";
      } else if (userText.toLowerCase().includes('workout') || userText.toLowerCase().includes('exercise')) {
        reply = "Let's kick off with 25 minutes of HIIT & Core strength, followed by mobility cooldown stretches. ⏱️";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 700);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'How does FitMind AI personalize my wellness plan?',
      a: 'FitMind AI evaluates your unique lifestyle, metabolic profile, workout preferences, sleep metrics, and nutrition targets to build dynamic, real-time programs that adapt as you log daily progress.'
    },
    {
      q: 'Can I customize diet restrictions like Keto, Vegan, or Mediterranean?',
      a: 'Yes. The AI Diet Planner supports full dietary archetype switching, macro distribution adjustments, ingredient replacements, and custom calorie targets tailored to your metabolic goal.'
    },
    {
      q: 'Are the workout timers and interval tools included?',
      a: 'FitMind AI provides a full suite of interval training timers (Tabata, HIIT, EMOM, AMRAP, Circuit) complete with voice cues, set progress, and automatic calorie calculations.'
    },
    {
      q: 'Is my health and fitness data secure?',
      a: 'Your information is protected with end-to-end encryption. You have complete ownership and control of all logged metrics, journals, and private coach conversations.'
    }
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#0C081A] text-gray-100 overflow-x-hidden selection:bg-purple-600/30 font-sans relative"
    >
      {/* Background Ambient Glow & AI Mesh Particles */}
      <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-purple-700/15 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[550px] h-[550px] bg-pink-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION                                                         */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0E091E]/80 backdrop-blur-xl border-b border-purple-900/40 shadow-lg shadow-purple-950/20 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C3ED9] via-[#8B5CF6] to-pink-500 p-[1.5px] shadow-lg shadow-purple-900/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0E091E] rounded-[10px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-300 group-hover:text-pink-300 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.3L12 22l5.5-1.7c2.7-1.8 4.5-4.8 4.5-8.3 0-5.5-4.5-10-10-10z" />
                  <path d="M12 6c-2.5 3-4 6-4 8 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-1.5-5-4-8z" fill="#8B5CF6" fillOpacity="0.4" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight text-white flex items-center space-x-1.5">
                <span>FitMind</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
              </span>
              <p className="text-[10px] text-purple-300/70 font-medium tracking-wide hidden sm:block">
                Strong Body. Clear Mind. Smarter You.
              </p>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold text-gray-300 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3.5 py-1.5 rounded-full text-purple-300 hover:text-white hover:bg-white/5 transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('ai-coach-promo')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>AI Coach</span>
            </button>
            <button
              onClick={() => scrollToSection('wellness-modules')}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition"
            >
              Wellness
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-purple-200 hover:text-white hover:bg-white/5 transition cursor-pointer"
            >
              Sign In
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => startAppJourney('dashboard')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 transition cursor-pointer flex items-center space-x-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0E091E] border-b border-purple-900/40 px-6 py-5 space-y-3"
            >
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-semibold text-gray-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="w-full text-left py-2 text-sm font-semibold text-gray-300"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="w-full text-left py-2 text-sm font-semibold text-gray-300"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('ai-coach-promo')}
                className="w-full text-left py-2 text-sm font-semibold text-gray-300 flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>AI Coach</span>
              </button>
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    startAppJourney('dashboard');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-pink-500 text-xs font-bold text-white text-center shadow-lg shadow-purple-900/50"
                >
                  Get Started →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN HERO SECTION                                                      */}
      {/* ========================================================================= */}
      <section className="relative pt-28 sm:pt-36 pb-20 lg:pt-40 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE CONTENT (7 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left z-10"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-bold tracking-wide shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>Your AI-Powered Wellness Companion</span>
            </motion.div>

            {/* Large Cinematic Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                Transform Your Body. <br />
                Strengthen Your Mind. <br />
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
                  Powered by AI.
                </span>
              </h1>
            </div>

            {/* Premium Description */}
            <p className="text-sm sm:text-base lg:text-lg text-purple-100/70 max-w-xl leading-relaxed font-normal">
              FitMind AI creates personalized workouts, smart diet plans, wellness insights and daily guidance designed around your goals.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              
              {/* Primary Main CTA */}
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 20px 35px -10px rgba(139, 92, 246, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startAppJourney('dashboard')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/40 hover:opacity-95 transition-all flex items-center justify-center space-x-3 cursor-pointer group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('features')}
                className="px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] text-white border border-purple-500/20 font-bold text-sm sm:text-base transition-all flex items-center justify-center space-x-2.5 cursor-pointer backdrop-blur-md"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Play className="w-3 h-3 text-purple-300 fill-current ml-0.5" />
                </div>
                <span>Explore Features</span>
              </motion.button>
            </div>

            {/* Micro Trust Proof */}
            <div className="flex items-center space-x-6 pt-4 border-t border-purple-900/30 text-xs text-purple-200/60">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Real-Time AI Adaptation</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Evidence-Based</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT SIDE HERO VISUAL — AI FITNESS MODEL & 4 FLOATING CARDS (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[560px]"
          >
            {/* Background Glows & Lavender Orbs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#6C3ED9]/30 via-pink-500/20 to-purple-400/30 blur-2xl" />
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '24s' }} />
            </div>

            {/* Model Card Frame with Parallax Shift */}
            <motion.div
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
              }}
              className="relative z-10 w-72 sm:w-84 md:w-96 rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-purple-500/30 via-purple-900/10 to-transparent backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-950/60"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-950">
                <img
                  src={heroModelImg}
                  alt="FitMind AI Athletic Model"
                  className="w-full h-full object-cover object-center scale-[1.02] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C081A] via-transparent to-transparent opacity-60" />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-left">
                  <div>
                    <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">AI Fitness Diagnostics</div>
                    <div className="text-xs font-bold text-white">Metabolic & Cardio Optimization</div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </motion.div>

            {/* ================================================================= */}
            {/* 4 FLOATING AI WELLNESS CARDS (GLASSMORPHISM)                     */}
            {/* ================================================================= */}

            {/* CARD 1 — Daily Progress: 🔥 12 Day Streak */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
              className="absolute -top-4 -left-2 sm:-left-8 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#1A1135]/85 backdrop-blur-xl border border-purple-400/30 shadow-xl shadow-purple-950/40 text-left max-w-[170px] sm:max-w-[190px]"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
                  <Flame className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-white">12 Day Streak</div>
                  <div className="text-[10px] text-amber-300 font-medium">Keep your momentum!</div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2 — Calories: 1,280 kcal */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5.1, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-2 sm:-left-6 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#1A1135]/85 backdrop-blur-xl border border-purple-400/30 shadow-xl shadow-purple-950/40 text-left flex items-center space-x-3"
            >
              {/* Circular SVG progress */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-purple-950"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-pink-500"
                    strokeDasharray="72, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <Flame className="w-4 h-4 text-pink-400 absolute" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white">1,280 kcal</div>
                <div className="text-[10px] text-purple-300 font-medium">Daily Active Burn</div>
              </div>
            </motion.div>

            {/* CARD 3 — Workout: 💪 Today's Workout */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/4 -right-2 sm:-right-8 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#1A1135]/85 backdrop-blur-xl border border-purple-400/30 shadow-xl shadow-purple-950/40 text-left max-w-[170px] sm:max-w-[190px] space-y-2"
            >
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Dumbbell className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Today's Workout</div>
                  <div className="text-[10px] text-purple-300">Full Body Strength • 25m</div>
                </div>
              </div>
              <div className="w-full bg-purple-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full w-3/4 rounded-full" />
              </div>
            </motion.div>

            {/* CARD 4 — AI Coach: 🤖 AI Coach Online */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -bottom-6 -right-2 sm:-right-4 z-20 p-3 sm:p-3.5 rounded-2xl bg-[#1A1135]/85 backdrop-blur-xl border border-emerald-400/30 shadow-xl shadow-purple-950/40 text-left flex items-center space-x-2.5"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#1A1135] animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white flex items-center space-x-1">
                  <span>AI Coach Online</span>
                </div>
                <div className="text-[9px] text-emerald-300">Ready to help you reach goals</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HERO BOTTOM STATS                                                      */}
      {/* ========================================================================= */}
      <section className="relative py-12 border-y border-purple-900/30 bg-purple-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-1.5"
            >
              <div className="text-3xl sm:text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">
                10K+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-purple-300/80">Active Users</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-1.5"
            >
              <div className="text-3xl sm:text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-400">
                50K+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-purple-300/80">Workouts Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-1.5"
            >
              <div className="text-3xl sm:text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">
                1M+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-purple-300/80">Calories Tracked</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-1.5"
            >
              <div className="text-3xl sm:text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-400">
                98%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-purple-300/80">User Satisfaction</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURES SECTION                                                       */}
      {/* ========================================================================= */}
      <section id="features" className="py-24 sm:py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-pink-400" />
            <span>Comprehensive Wellness Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Everything You Need for a <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
              Healthier, Stronger You
            </span>
          </h2>
          <p className="text-sm sm:text-base text-purple-200/70">
            A cohesive suite of AI wellness modules that seamlessly sync nutrition, physical conditioning, and mental resilience.
          </p>
        </div>

        {/* 6 Animated Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          
          {/* Card 1: AI Diet Planner */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(192, 132, 252, 0.5)' }}
            className="p-7 rounded-3xl bg-[#140D2B]/70 backdrop-blur-xl border border-purple-900/40 shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl group-hover:scale-110 transition-transform">
                🍽️
              </div>
              <h3 className="text-xl font-bold font-display text-white group-hover:text-purple-300 transition">
                AI Diet Planner
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Personalized meals based on your goals. Dynamic recipes, exact macro distributions (Protein, Carbs, Fats), and allergen filtering.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-purple-900/30 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Automatic Calorie Sync</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: Smart Workout Tracker */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(192, 132, 252, 0.5)' }}
            className="p-7 rounded-3xl bg-[#140D2B]/70 backdrop-blur-xl border border-purple-900/40 shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl group-hover:scale-110 transition-transform">
                💪
              </div>
              <h3 className="text-xl font-bold font-display text-white group-hover:text-purple-300 transition">
                Smart Workout Tracker
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                AI-powered workouts built for your fitness level. Complete with HIIT, Tabata, and strength interval timers that guide every rep.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-purple-900/30 flex items-center justify-between text-xs font-bold text-purple-300">
              <span>Adaptive Difficulty Scaling</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3: AI Wellness Coach */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(192, 132, 252, 0.5)' }}
            className="p-7 rounded-3xl bg-[#140D2B]/70 backdrop-blur-xl border border-purple-900/40 shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/30 flex items-center justify-center text-pink-400 text-2xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-xl font-bold font-display text-white group-hover:text-pink-300 transition">
                AI Wellness Coach
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Get instant guidance whenever you need it. Ask about post-workout nutrition, recovery protocols, or quick habit adjustments 24/7.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-purple-900/30 flex items-center justify-between text-xs font-bold text-pink-400 relative z-10">
              <span>Context-Aware Memory</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 4: Mental Wellness */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(192, 132, 252, 0.5)' }}
            className="p-7 rounded-3xl bg-[#140D2B]/70 backdrop-blur-xl border border-purple-900/40 shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                🧠
              </div>
              <h3 className="text-xl font-bold font-display text-white group-hover:text-blue-300 transition">
                Mental Wellness & Breath
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Track your mood, stress, and mental health journey. Includes guided 4-4-4 box breathing visualizers and gratitude journaling.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-purple-900/30 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Mood Analytics & Audio</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 5: Progress Analytics */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(192, 132, 252, 0.5)' }}
            className="p-7 rounded-3xl bg-[#140D2B]/70 backdrop-blur-xl border border-purple-900/40 shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition">
                Progress Analytics
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                See your improvement with smart insights. Interactive charts for weight trends, steps consistency, workout frequency, and BMR.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-purple-900/30 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Predictive Trends</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 6: Sleep & Water Tracking */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(192, 132, 252, 0.5)' }}
            className="p-7 rounded-3xl bg-[#140D2B]/70 backdrop-blur-xl border border-purple-900/40 shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl group-hover:scale-110 transition-transform">
                💧 🌙
              </div>
              <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition">
                Sleep & Water Tracking
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Build healthier daily habits. Monitor hydration levels, sleep cycle efficiency (REM/Deep), and circadian consistency.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-purple-900/30 flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>Smart Hydration Reminders</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS SECTION                                                   */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-24 border-t border-purple-900/30 bg-purple-950/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <span>Streamlined 3-Step Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
              How FitMind AI Works
            </h2>
            <p className="text-sm sm:text-base text-purple-200/70">
              Achieve sustainable physical vitality and mental clarity in three frictionless steps.
            </p>
          </div>

          {/* 3 Step Cards with animated connection */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-[#140D2B]/80 backdrop-blur-xl border border-purple-500/20 text-left space-y-5 relative shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C3ED9] to-[#8B5CF6] text-white font-display font-black text-xl flex items-center justify-center shadow-lg shadow-purple-900/40">
                01
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Tell Us Your Goals
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
                Select your focus areas:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Weight loss', 'Muscle building', 'Better fitness', 'Mental wellness', 'Healthy lifestyle'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] font-semibold text-purple-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Step 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-8 rounded-3xl bg-[#140D2B]/80 backdrop-blur-xl border border-pink-500/20 text-left space-y-5 relative shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-display font-black text-xl flex items-center justify-center shadow-lg shadow-pink-900/40">
                02
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Let AI Build Your Plan
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
                FitMind AI instantly analyzes metabolic math to curate:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-purple-200/90 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Personalized 4-Phase Workout Routines</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Macro-Calculated Meal Schedules</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Adaptive Daily Habit Recommendations</span>
                </li>
              </ul>
            </motion.div>

            {/* Step 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-[#140D2B]/80 backdrop-blur-xl border border-emerald-500/20 text-left space-y-5 relative shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-display font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
                03
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Track. Improve. Transform.
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
                Seamlessly log metrics and watch your personal streak grow:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-purple-300">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Progress & BMR</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Calories Burned</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center space-x-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sleep & Recovery</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center space-x-1.5">
                  <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hydration Target</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Center Action */}
          <div className="mt-14 text-center">
            <button
              onClick={() => startAppJourney('dashboard')}
              className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-purple-400/30 text-xs font-bold transition shadow-lg inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>Experience The Interactive Flow Now</span>
              <ArrowRight className="w-4 h-4 text-purple-300" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. AI COACH PROMO SECTION                                                 */}
      {/* ========================================================================= */}
      <section id="ai-coach-promo" className="py-24 sm:py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#1B1038] via-[#140A2B] to-[#0E061E] border border-purple-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left: AI Coach Interactive Simulated Chat UI (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Chat Window Box */}
              <div className="rounded-2xl bg-[#0C081A]/90 border border-purple-500/30 shadow-2xl p-5 space-y-4 text-left">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6C3ED9] to-pink-500 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span>FitMind AI Coach</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-purple-300/70">Personalized Health Intelligence</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-mono">
                    24/7 Active
                  </span>
                </div>

                {/* Message Stream */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] text-white rounded-tr-xs'
                            : 'bg-purple-950/70 border border-purple-800/40 text-purple-100 rounded-tl-xs shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-purple-950/70 border border-purple-800/40 text-purple-300 px-3 py-2 rounded-2xl text-xs flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendDemoMessage} className="flex items-center space-x-2 pt-2 border-t border-purple-900/40">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Ask about diet, workouts, recovery..."
                    className="flex-1 bg-purple-950/40 border border-purple-800/40 focus:border-purple-400 rounded-xl px-3.5 py-2 text-xs text-white placeholder-purple-300/40 outline-none transition"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            </div>

            {/* Right: Content & Try AI Coach Button (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Next-Generation Wellness Logic</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white leading-tight">
                Your Personal AI <br />
                <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
                  Wellness Coach
                </span>
              </h2>

              <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed font-normal">
                Ask anything. Get personalized guidance. Stay motivated every day. Whether you need a 10-minute desk stretch, meal swaps for restaurant dining, or sleep hygiene science — your AI coach is always ready.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-purple-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Instant macro calculations & recipe substitutions</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-purple-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Personalized workout routines based on equipment available</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-purple-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Daily encouragement, streaks, and motivation</span>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => startAppJourney('ai-coach')}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-[#8B5CF6] text-white font-bold text-sm shadow-xl shadow-purple-950/60 hover:opacity-95 transition flex items-center space-x-2 cursor-pointer"
                >
                  <span>Try AI Coach</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. FAQ ACCORDION SECTION                                                  */}
      {/* ========================================================================= */}
      <section id="wellness-modules" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/60">
            Everything you need to know about FitMind AI and its wellness architecture.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#140D2B]/70 border border-purple-900/40 overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left text-sm font-bold text-white hover:text-purple-300 transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-xs text-purple-200/70 leading-relaxed border-t border-purple-900/30 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PREMIUM FULL-WIDTH CTA SECTION                                        */}
      {/* ========================================================================= */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-pink-500 text-center space-y-6 text-white shadow-2xl shadow-purple-900/50 relative overflow-hidden">
            
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Ready to Become Your Best Self?
              </h2>
              <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-medium">
                Start your personalized AI wellness journey today.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startAppJourney('dashboard')}
                className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white text-purple-950 font-black text-sm sm:text-base shadow-2xl hover:bg-purple-50 transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Start Your Journey</span>
              </motion.button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. MINIMAL FOOTER                                                         */}
      {/* ========================================================================= */}
      <footer className="border-t border-purple-900/40 bg-[#090514] py-12 text-xs text-purple-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-900/30">
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C3ED9] to-pink-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">FitMind AI</div>
                <div className="text-[10px] text-purple-300/70">Strong Body. Clear Mind. Smarter You.</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-purple-200/80">
              <button onClick={() => scrollToSection('features')} className="hover:text-white transition">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition">How It Works</button>
              <button onClick={() => scrollToSection('ai-coach-promo')} className="hover:text-white transition">AI Coach</button>
              <button onClick={() => startAppJourney('dashboard')} className="hover:text-white transition">Dashboard</button>
              <button onClick={() => startAppJourney('diet-planner')} className="hover:text-white transition">Diet Planner</button>
              <button onClick={() => startAppJourney('workout-tracker')} className="hover:text-white transition">Workouts</button>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} FitMind AI. All rights reserved. Evidence-based fitness science.</p>
            <div className="flex items-center space-x-6">
              <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
              <span className="hover:text-white transition cursor-pointer">Security</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
