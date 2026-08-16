import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Dumbbell,
  Sparkles,
  Flame,
  Clock,
  Layers,
  ChevronRight,
  Sliders,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { TimerConfig } from '../types';

export default function ExerciseTimer() {
  const { activeWorkout, completeWorkout, triggerCelebration } = useWellness();

  const [mode, setMode] = useState<'Tabata' | 'HIIT' | 'Circuit' | 'EMOM' | 'Custom'>('Circuit');
  const [phase, setPhase] = useState<'prepare' | 'work' | 'rest' | 'finished'>('prepare');
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Interval presets in seconds
  const modeDefaults: Record<string, { work: number; rest: number; rounds: number; prepare: number }> = {
    Tabata: { work: 20, rest: 10, rounds: 8, prepare: 5 },
    HIIT: { work: 45, rest: 15, rounds: 6, prepare: 5 },
    Circuit: { work: 45, rest: 15, rounds: 8, prepare: 5 },
    EMOM: { work: 50, rest: 10, rounds: 5, prepare: 5 },
    Custom: { work: 30, rest: 15, rounds: 5, prepare: 5 }
  };

  const [workSec, setWorkSec] = useState(modeDefaults.Circuit.work);
  const [restSec, setRestSec] = useState(modeDefaults.Circuit.rest);
  const [totalRounds, setTotalRounds] = useState(modeDefaults.Circuit.rounds);
  const [timeLeft, setTimeLeft] = useState(modeDefaults.Circuit.prepare);

  const currentExerciseIndex = (currentRound - 1) % (activeWorkout?.exercises.length || 1);
  const currentExercise = activeWorkout?.exercises[currentExerciseIndex] || {
    id: 'ex-def',
    name: 'Bodyweight High Knees',
    category: 'hiit',
    targetMuscles: ['Core', 'Cardio'],
    difficulty: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
    tips: ['Keep core braced', 'Land lightly on balls of feet']
  };

  const nextExerciseIndex = currentRound % (activeWorkout?.exercises.length || 1);
  const nextExercise = activeWorkout?.exercises[nextExerciseIndex] || {
    name: 'Push-Up to Plank'
  };

  // Change mode
  const handleSelectMode = (newMode: 'Tabata' | 'HIIT' | 'Circuit' | 'EMOM' | 'Custom') => {
    setMode(newMode);
    setIsRunning(false);
    setPhase('prepare');
    setCurrentRound(1);
    const conf = modeDefaults[newMode];
    setWorkSec(conf.work);
    setRestSec(conf.rest);
    setTotalRounds(conf.rounds);
    setTimeLeft(conf.prepare);
  };

  // Sound cue simulation
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = phase === 'work' ? 880 : 520;
      gain.gain.value = 0.1;
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // Audio not permitted without user gesture in some contexts
    }
  };

  // Timer Tick Engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && phase !== 'finished') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev > 1) return prev - 1;

          // Transition phases
          playBeep();
          if (phase === 'prepare') {
            setPhase('work');
            return workSec;
          } else if (phase === 'work') {
            if (currentRound >= totalRounds) {
              setPhase('finished');
              setIsRunning(false);
              triggerCelebration();
              if (activeWorkout) completeWorkout(activeWorkout.id);
              return 0;
            } else {
              setPhase('rest');
              return restSec;
            }
          } else if (phase === 'rest') {
            setCurrentRound(r => r + 1);
            setPhase('work');
            return workSec;
          }
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, phase, currentRound, totalRounds, workSec, restSec]);

  const handleReset = () => {
    setIsRunning(false);
    setPhase('prepare');
    setCurrentRound(1);
    setTimeLeft(modeDefaults[mode].prepare);
  };

  const handleSkip = () => {
    if (phase === 'prepare') {
      setPhase('work');
      setTimeLeft(workSec);
    } else if (phase === 'work') {
      if (currentRound >= totalRounds) {
        setPhase('finished');
        setIsRunning(false);
      } else {
        setPhase('rest');
        setTimeLeft(restSec);
      }
    } else if (phase === 'rest') {
      setCurrentRound(r => r + 1);
      setPhase('work');
      setTimeLeft(workSec);
    }
  };

  // Progress percentage
  const totalPhaseTime = phase === 'prepare' ? 5 : phase === 'work' ? workSec : restSec;
  const progressPercent = phase === 'finished' ? 100 : Math.max(0, ((totalPhaseTime - timeLeft) / totalPhaseTime) * 100);

  const phaseColor =
    phase === 'work'
      ? 'from-[#6C3ED9] to-[#8B5CF6]'
      : phase === 'rest'
      ? 'from-[#06B6D4] to-[#3B82F6]'
      : phase === 'prepare'
      ? 'from-[#FF9F43] to-[#FF5A6A]'
      : 'from-[#39B982] to-[#10B981]';

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <Clock className="w-6 h-6 text-purple-600" />
            <span>AI Interval Workout Timer</span>
          </h1>
          <p className="text-xs text-gray-500">
            Guided HIIT & Circuit pacing with biometrically synchronized work/rest cycles.
          </p>
        </div>

        {/* Sound toggle & routine title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition flex items-center space-x-1.5 text-xs font-semibold cursor-pointer ${
              soundEnabled
                ? 'bg-purple-50 text-purple-600 border-purple-200'
                : 'bg-gray-100 text-gray-400 border-gray-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Mode Chips */}
      <div className="flex flex-wrap gap-2">
        {(['Tabata', 'HIIT', 'Circuit', 'EMOM', 'Custom'] as const).map((m) => (
          <button
            key={m}
            onClick={() => handleSelectMode(m)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === m
                ? 'bg-[#100B24] text-white shadow-md shadow-purple-950/20'
                : 'bg-white text-gray-600 border border-[#E8EAF0] hover:border-purple-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Main Timer Display Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#100B24] via-[#19102F] to-[#251442] text-white border border-purple-900/40 shadow-2xl relative overflow-hidden text-center">
        
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-6">
          
          {/* Phase Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>
              {phase === 'prepare' ? 'Get Ready' : phase === 'work' ? 'Work Interval 🔥' : phase === 'rest' ? 'Rest & Breathe 💧' : 'Routine Complete! 🏆'}
            </span>
          </div>

          {/* Large Glowing Circular Timer */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-purple-950"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.8)] transition-all duration-300"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="2.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            {/* Center Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tighter text-white">
                00:{timeLeft.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-purple-300 font-medium uppercase tracking-wider mt-1">
                Round {currentRound} of {totalRounds}
              </span>
            </div>
          </div>

          {/* Current Exercise Detail Banner */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md w-full flex items-center justify-between">
            <div className="flex items-center space-x-3 text-left">
              <img
                src={currentExercise.thumbnail}
                alt={currentExercise.name}
                className="w-12 h-12 rounded-xl object-cover border border-white/20"
              />
              <div>
                <h4 className="text-sm font-bold text-white font-display">{currentExercise.name}</h4>
                <p className="text-[11px] text-purple-300">
                  Target: {currentExercise.targetMuscles?.join(', ') || 'Full Body'}
                </p>
              </div>
            </div>

            <div className="text-right text-[11px] text-gray-400">
              <span>Next:</span>
              <div className="text-pink-300 font-semibold">{nextExercise.name}</div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={handleReset}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#6C3ED9] via-[#8B5CF6] to-pink-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-950/60 transition flex items-center space-x-2 cursor-pointer scale-105"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Interval</span>
                </>
              )}
            </button>

            <button
              onClick={handleSkip}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Skip Round"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Routine Exercises List Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-gray-900">
            Routine Exercise Breakdown ({activeWorkout?.title || 'Circuit Training'})
          </h3>
          <span className="text-xs font-mono font-bold text-purple-600">
            {activeWorkout?.exercises.length || 8} Movements
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(activeWorkout?.exercises || []).map((ex, idx) => {
            const isCurrent = idx === currentExerciseIndex && phase === 'work';
            return (
              <div
                key={ex.id}
                className={`p-3.5 rounded-2xl border transition flex items-center space-x-3.5 ${
                  isCurrent
                    ? 'bg-purple-50/80 border-purple-300 ring-2 ring-purple-400/20'
                    : 'bg-[#F7F8FC] border-[#E8EAF0]'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-white font-mono text-xs font-bold text-gray-600 flex items-center justify-center shrink-0 border border-gray-200">
                  {idx + 1}
                </span>
                <img
                  src={ex.thumbnail}
                  alt={ex.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <h5 className="text-xs font-bold text-gray-900">{ex.name}</h5>
                  <p className="text-[10px] text-gray-500">
                    {ex.durationSec ? `${ex.durationSec}s Work` : `${ex.reps || '12 reps'}`} • {ex.equipment}
                  </p>
                </div>
                {isCurrent && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold uppercase animate-pulse">
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
