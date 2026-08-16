import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HeartPulse,
  Smile,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Plus,
  Heart,
  CheckCircle,
  Clock,
  Volume2
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { MEDITATION_TRACKS } from '../data/mockData';

export default function MentalWellness() {
  const {
    journalEntries,
    addJournalEntry,
    moodLogs,
    logMood,
    triggerCelebration
  } = useWellness();

  // Breathing Box state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCount, setBreathCount] = useState(4);
  const [selectedMood, setSelectedMood] = useState<string>('Great');

  // Journal form state
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalGratitude, setJournalGratitude] = useState('');
  const [activeAudioTrack, setActiveAudioTrack] = useState<string | null>(null);

  // 4-4-4-4 Box Breathing Engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathCount(prev => {
          if (prev > 1) return prev - 1;

          // Transition phases
          if (breathingPhase === 'Inhale') {
            setBreathingPhase('Hold');
          } else if (breathingPhase === 'Hold') {
            setBreathingPhase('Exhale');
          } else if (breathingPhase === 'Exhale') {
            setBreathingPhase('Rest');
          } else if (breathingPhase === 'Rest') {
            setBreathingPhase('Inhale');
          }
          return 4;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase]);

  const handleMoodSelect = (mood: any, score: number) => {
    setSelectedMood(mood);
    logMood(mood, score, `Logged as ${mood}`);
    triggerCelebration();
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTitle.trim() || !journalContent.trim()) return;

    addJournalEntry({
      title: journalTitle,
      content: journalContent,
      mood: selectedMood as any,
      gratitude: journalGratitude ? [journalGratitude] : ['Grateful for health & resilience'],
      tags: ['Mindfulness', 'Reflection']
    });

    setJournalTitle('');
    setJournalContent('');
    setJournalGratitude('');
  };

  const moods = [
    { label: 'Amazing', emoji: '🤩', score: 5, color: 'text-amber-500 bg-amber-50' },
    { label: 'Great', emoji: '😊', score: 4, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Okay', emoji: '😐', score: 3, color: 'text-blue-500 bg-blue-50' },
    { label: 'Tired', emoji: '😴', score: 2, color: 'text-purple-500 bg-purple-50' },
    { label: 'Stressed', emoji: '😰', score: 1, color: 'text-red-500 bg-red-50' }
  ];

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <HeartPulse className="w-6 h-6 text-pink-500" />
            <span>Mindfulness & Mental Resilience</span>
          </h1>
          <p className="text-xs text-gray-500">
            Regulate vagal tone with box breathing, track daily emotional states, and preserve mindful journal reflections.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-100">
          <Heart className="w-4 h-4 text-pink-500 fill-current" />
          <span>Mindfulness Streak: 8 Days</span>
        </div>
      </div>

      {/* 1. Daily Mood Check-In Widget */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold font-display text-gray-900">How are you feeling right now?</h3>
            <p className="text-xs text-gray-400">Log your emotional baseline to tailor your AI workout pacing.</p>
          </div>
          <span className="text-xs font-bold text-purple-600">Current: {selectedMood}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => handleMoodSelect(m.label, m.score)}
              className={`p-3.5 rounded-2xl border transition flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${
                selectedMood === m.label
                  ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-2 ring-purple-400/20'
                  : 'border-[#E8EAF0] bg-[#F7F8FC] hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-bold text-gray-800">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive 4-4-4 Box Breathing Visualizer & Audio Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Breathing Engine Card (6 cols) */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-[#100B24] via-[#1E1138] to-[#2B144E] text-white border border-purple-900/40 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex justify-between items-center text-xs">
            <span className="text-purple-300 font-bold uppercase tracking-wider">Parasympathetic Reset</span>
            <span className="text-pink-300 font-mono font-bold">4-4-4 Box Loop</span>
          </div>

          {/* Animated Expanding/Contracting Breathing Ring */}
          <div className="relative my-8 w-56 h-56 flex items-center justify-center">
            <motion.div
              animate={{
                scale:
                  breathingPhase === 'Inhale'
                    ? [1, 1.35]
                    : breathingPhase === 'Hold'
                    ? 1.35
                    : breathingPhase === 'Exhale'
                    ? [1.35, 1]
                    : 1
              }}
              transition={{
                duration: 4,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 border-2 border-pink-400/50 blur-xs"
            />

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs font-mono font-bold uppercase text-pink-300 tracking-widest">
                {breathingPhase}
              </span>
              <span className="text-5xl font-extrabold font-mono text-white my-1">
                {breathCount}
              </span>
              <span className="text-[10px] text-purple-200/70">seconds</span>
            </div>
          </div>

          <button
            onClick={() => setBreathingActive(!breathingActive)}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#6C3ED9] to-pink-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-purple-900/40 transition flex items-center space-x-2 cursor-pointer"
          >
            {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{breathingActive ? 'Pause Session' : 'Start 4-4-4 Breathing'}</span>
          </button>
        </div>

        {/* Guided Ambient Audio Tracks (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold font-display text-gray-900 flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Binaural & Theta Meditation Audio</span>
              </h3>
              <span className="text-[10px] text-gray-400">High Fidelity Audio</span>
            </div>

            <div className="space-y-2.5">
              {MEDITATION_TRACKS.map((track) => {
                const isPlaying = activeAudioTrack === track.id;

                return (
                  <div
                    key={track.id}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isPlaying
                        ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400/20'
                        : 'bg-[#F7F8FC] border-[#E8EAF0]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900 font-display">{track.title}</h5>
                        <span className="text-[10px] text-gray-400">
                          {track.category} • {track.duration}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveAudioTrack(isPlaying ? null : track.id);
                        triggerCelebration();
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-purple-600 hover:text-white text-purple-600 border border-[#E8EAF0] transition shadow-xs cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-pink-50/60 border border-pink-100 text-xs text-pink-900 flex items-center space-x-2">
            <Heart className="w-4 h-4 text-pink-500 shrink-0" />
            <span>Listening to 432Hz theta waves lowers systolic blood pressure within 5 minutes.</span>
          </div>
        </div>

      </div>

      {/* 3. Mindful Gratitude Journal Form & Past Entries */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-gray-900">Mindful Gratitude Journal</h3>
            <p className="text-xs text-gray-400">Reflect on daily milestones and anchor positive neurological pathways.</p>
          </div>
          <span className="text-xs font-bold text-purple-600">{journalEntries.length} Saved Entries</span>
        </div>

        <form onSubmit={handleSaveJournal} className="space-y-3 bg-[#F7F8FC] p-4 rounded-2xl border border-[#E8EAF0]">
          <input
            type="text"
            value={journalTitle}
            onChange={(e) => setJournalTitle(e.target.value)}
            placeholder="Journal Title (e.g., Morning Breakthrough & Post-Workout Clarity)"
            className="w-full p-2.5 bg-white border border-[#E8EAF0] focus:border-purple-500 rounded-xl text-xs text-gray-800 outline-none"
          />

          <textarea
            value={journalContent}
            onChange={(e) => setJournalContent(e.target.value)}
            placeholder="Write your mindful reflections, thoughts, and lessons today..."
            rows={3}
            className="w-full p-3 bg-white border border-[#E8EAF0] focus:border-purple-500 rounded-xl text-xs text-gray-800 outline-none resize-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <input
              type="text"
              value={journalGratitude}
              onChange={(e) => setJournalGratitude(e.target.value)}
              placeholder="What is 1 thing you are deeply grateful for right now?"
              className="w-full sm:w-2/3 p-2 bg-white border border-[#E8EAF0] focus:border-purple-500 rounded-xl text-xs text-gray-800 outline-none"
            />

            <button
              type="submit"
              disabled={!journalTitle.trim() || !journalContent.trim()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#6C3ED9] hover:bg-[#8B5CF6] text-white text-xs font-bold transition disabled:opacity-40 flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-purple-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Reflection</span>
            </button>
          </div>
        </form>

        {/* Existing Journal Entries Feed */}
        <div className="space-y-3">
          {journalEntries.map((entry) => (
            <div key={entry.id} className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 font-display">{entry.title}</h4>
                <span className="text-[10px] text-gray-400">{entry.date}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{entry.content}</p>
              {entry.gratitude && entry.gratitude.length > 0 && (
                <div className="text-[11px] text-purple-700 font-semibold flex items-center space-x-1.5 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>Gratitude: "{entry.gratitude[0]}"</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
