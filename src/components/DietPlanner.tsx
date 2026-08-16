import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Utensils,
  Sparkles,
  RefreshCw,
  Flame,
  CheckCircle,
  Clock,
  ChevronRight,
  Plus,
  Sliders,
  Check,
  Zap,
  TrendingUp,
  Apple
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { MealItem } from '../types';

export default function DietPlanner() {
  const {
    meals,
    stats,
    toggleMealCompleted,
    regenerateDietPlan,
    triggerCelebration,
    setActiveTab
  } = useWellness();

  const [dietType, setDietType] = useState('Mediterranean High-Protein');
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      regenerateDietPlan();
      setIsRegenerating(false);
      triggerCelebration();
    }, 700);
  };

  const completedMealsCount = meals.filter(m => m.isCompleted).length;
  const totalMealCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <Utensils className="w-6 h-6 text-orange-500" />
            <span>AI Macro Diet & Meal Planner</span>
          </h1>
          <p className="text-xs text-gray-500">
            Scientifically calibrated calorie & macro splits dynamically aligned with your workouts.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-md shadow-purple-600/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate AI Plan</span>
          </button>
        </div>
      </div>

      {/* Top Macro Summary Bento */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAF0] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
              {dietType}
            </span>
            <h2 className="text-lg font-bold font-display text-gray-900">
              Daily Target: {calorieGoal} kcal <span className="text-xs font-normal text-gray-400">({completedMealsCount}/{meals.length} Meals Logged)</span>
            </h2>
          </div>

          {/* Quick Diet Archetype Picker */}
          <div className="flex items-center space-x-2">
            {['Mediterranean High-Protein', 'Keto Low-Carb', 'Plant-Based Muscle'].map((dt) => (
              <button
                key={dt}
                onClick={() => {
                  setDietType(dt);
                  handleRegenerate();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  dietType === dt
                    ? 'bg-[#100B24] text-white shadow-xs'
                    : 'bg-[#F7F8FC] text-gray-600 hover:bg-gray-100'
                }`}
              >
                {dt.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Macro Progress Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          
          <div className="p-3.5 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Protein</span>
            <div className="text-sm font-mono font-bold text-gray-900 mt-0.5">
              {stats.nutrition.protein}g <span className="text-[10px] text-gray-400 font-normal">/ {stats.nutrition.proteinTarget}g</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#8B5CF6] h-full rounded-full"
                style={{ width: `${Math.min(100, (stats.nutrition.protein / stats.nutrition.proteinTarget) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Carbohydrates</span>
            <div className="text-sm font-mono font-bold text-gray-900 mt-0.5">
              {stats.nutrition.carbs}g <span className="text-[10px] text-gray-400 font-normal">/ {stats.nutrition.carbsTarget}g</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#FF9F43] h-full rounded-full"
                style={{ width: `${Math.min(100, (stats.nutrition.carbs / stats.nutrition.carbsTarget) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Healthy Fats</span>
            <div className="text-sm font-mono font-bold text-gray-900 mt-0.5">
              {stats.nutrition.fat}g <span className="text-[10px] text-gray-400 font-normal">/ {stats.nutrition.fatTarget}g</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#FF5A6A] h-full rounded-full"
                style={{ width: `${Math.min(100, (stats.nutrition.fat / stats.nutrition.fatTarget) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF0]">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Dietary Fiber</span>
            <div className="text-sm font-mono font-bold text-gray-900 mt-0.5">
              {stats.nutrition.fiber}g <span className="text-[10px] text-gray-400 font-normal">/ {stats.nutrition.fiberTarget}g</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#39B982] h-full rounded-full"
                style={{ width: `${Math.min(100, (stats.nutrition.fiber / stats.nutrition.fiberTarget) * 100)}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* 4 Daily Meal Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-gray-900">Today's Curated Meals</h3>
          <button
            onClick={() => setActiveTab('recipes')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700"
          >
            Browse Recipe Vault →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meals.map((meal) => (
            <motion.div
              key={meal.id}
              whileHover={{ y: -2 }}
              className={`p-5 rounded-3xl border transition flex flex-col justify-between space-y-4 ${
                meal.isCompleted
                  ? 'bg-purple-50/40 border-purple-200 shadow-sm'
                  : 'bg-white border-[#E8EAF0] shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 text-[10px] font-bold uppercase">
                        {meal.type}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {meal.time}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold font-display text-gray-900 mt-1">
                      {meal.title}
                    </h4>
                  </div>
                </div>

                {/* Completed Checkbox */}
                <button
                  onClick={() => {
                    toggleMealCompleted(meal.id);
                    triggerCelebration();
                  }}
                  className={`p-2 rounded-xl border transition cursor-pointer ${
                    meal.isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-purple-300'
                  }`}
                  title={meal.isCompleted ? 'Completed' : 'Mark as eaten'}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{meal.description}</p>

              {/* Macro breakdown pill */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center space-x-2 text-gray-500 font-mono text-[11px]">
                  <span><strong>{meal.protein}g</strong> P</span>
                  <span>•</span>
                  <span><strong>{meal.carbs}g</strong> C</span>
                  <span>•</span>
                  <span><strong>{meal.fat}g</strong> F</span>
                </div>

                <span className="font-mono font-bold text-purple-600 text-sm">
                  {meal.calories} kcal
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
