import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dumbbell,
  Play,
  Clock,
  Flame,
  CheckCircle,
  Plus,
  Sparkles,
  Trophy,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { WorkoutRoutine } from '../types';

export default function WorkoutPlanner() {
  const {
    workouts,
    setActiveWorkout,
    completeWorkout,
    setActiveTab,
    triggerCelebration
  } = useWellness();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = ['All', 'hiit', 'strength', 'yoga', 'cardio'];

  const filteredWorkouts = workouts.filter((w) => {
    const matchesCat = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || w.difficulty === selectedDifficulty;
    return matchesCat && matchesDiff;
  });

  const handleLaunchTimer = (workout: WorkoutRoutine) => {
    setActiveWorkout(workout);
    setActiveTab('timer-exercises');
    triggerCelebration();
  };

  const handleComplete = (workoutId: string) => {
    completeWorkout(workoutId);
    triggerCelebration();
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <Dumbbell className="w-6 h-6 text-purple-600" />
            <span>AI Workout Hub & Training Routines</span>
          </h1>
          <p className="text-xs text-gray-500">
            Progressive overload tracking, heart-rate zone intervals, and dynamic exercise libraries.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('timer-exercises')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-md shadow-purple-600/20"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Launch Active Timer</span>
        </button>
      </div>

      {/* Filter Category Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#100B24] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-[#E8EAF0] hover:border-purple-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400 font-semibold">Intensity:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-purple-100 text-purple-700 font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <motion.div
            key={workout.id}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold text-gray-800 uppercase">
                {workout.difficulty}
              </span>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="flex items-center space-x-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>{workout.caloriesBurn} kcal</span>
                </span>
                <span className="flex items-center space-x-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-purple-300" />
                  <span>{workout.durationMinutes} mins</span>
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold font-display text-gray-900 group-hover:text-purple-600 transition">
                  {workout.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>

                <div className="flex items-center space-x-2 mt-3 text-[11px] text-gray-500">
                  <Layers className="w-3.5 h-3.5 text-purple-600" />
                  <span>{workout.exercises.length} Guided Movements</span>
                  {workout.completedTimes && workout.completedTimes > 0 && (
                    <span className="text-emerald-600 font-bold ml-auto flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Done {workout.completedTimes}x
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleLaunchTimer(workout)}
                  className="flex-1 py-2 rounded-xl bg-[#6C3ED9] hover:bg-[#8B5CF6] text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-purple-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start in Timer</span>
                </button>

                <button
                  onClick={() => handleComplete(workout.id)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-emerald-50 hover:text-emerald-600 text-gray-600 transition cursor-pointer"
                  title="Mark Completed"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
