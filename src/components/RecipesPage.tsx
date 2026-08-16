import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChefHat,
  Search,
  Clock,
  Flame,
  Heart,
  Star,
  Sparkles,
  X,
  CheckCircle,
  Utensils
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { Recipe } from '../types';

export default function RecipesPage() {
  const { recipes, toggleRecipeFavorite, triggerCelebration } = useWellness();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeRecipeModal, setActiveRecipeModal] = useState<Recipe | null>(null);

  const categories = ['All', 'High Protein', 'Weight Loss', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const filteredRecipes = recipes.filter((r) => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory || r.tags.includes(selectedCategory);
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <ChefHat className="w-6 h-6 text-purple-600" />
            <span>AI Nutrition & Gourmet Recipes</span>
          </h1>
          <p className="text-xs text-gray-500">
            Scientifically crafted, high-protein and antioxidant recipes tailored to metabolic targets.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search healthy recipes..."
            className="w-full bg-white border border-[#E8EAF0] focus:border-purple-500 rounded-full pl-10 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none transition"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#6C3ED9] to-[#8B5CF6] text-white shadow-md shadow-purple-600/30'
                : 'bg-white text-gray-600 border border-[#E8EAF0] hover:border-purple-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipes Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setActiveRecipeModal(recipe)}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Category Badge */}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold text-gray-800 uppercase">
                {recipe.category}
              </span>

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRecipeFavorite(recipe.id);
                  triggerCelebration();
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-600 hover:text-red-500 transition shadow-sm cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="flex items-center space-x-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>{recipe.calories} kcal</span>
                </span>
                <span className="flex items-center space-x-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span>{recipe.prepTimeMinutes} mins</span>
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3
                  onClick={() => setActiveRecipeModal(recipe)}
                  className="text-base font-bold font-display text-gray-900 group-hover:text-purple-600 transition cursor-pointer"
                >
                  {recipe.title}
                </h3>
                
                {/* Macro summary */}
                <div className="flex items-center space-x-3 text-[11px] text-gray-500 font-mono mt-2">
                  <span><strong>{recipe.protein}g</strong> Protein</span>
                  <span>•</span>
                  <span><strong>{recipe.carbs}g</strong> Carbs</span>
                  <span>•</span>
                  <span><strong>{recipe.fat}g</strong> Fat</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{recipe.rating}</span>
                </div>

                <button
                  onClick={() => setActiveRecipeModal(recipe)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6C3ED9] text-xs font-bold transition cursor-pointer"
                >
                  View Recipe
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {activeRecipeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8EAF0] shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setActiveRecipeModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img
                  src={activeRecipeModal.image}
                  alt={activeRecipeModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="px-2.5 py-1 rounded-md bg-purple-600 text-[10px] font-bold uppercase">
                      {activeRecipeModal.category}
                    </span>
                    <h2 className="text-2xl font-bold font-display mt-2">{activeRecipeModal.title}</h2>
                  </div>
                </div>
              </div>

              {/* Nutrition row */}
              <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F7F8FC] text-center mb-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Calories</span>
                  <div className="text-base font-bold font-mono text-gray-900">{activeRecipeModal.calories} kcal</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Protein</span>
                  <div className="text-base font-bold font-mono text-purple-600">{activeRecipeModal.protein}g</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Carbs</span>
                  <div className="text-base font-bold font-mono text-amber-500">{activeRecipeModal.carbs}g</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Fat</span>
                  <div className="text-base font-bold font-mono text-red-500">{activeRecipeModal.fat}g</div>
                </div>
              </div>

              {/* Ingredients list */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-bold font-display text-gray-900 flex items-center space-x-2">
                  <Utensils className="w-4 h-4 text-purple-600" />
                  <span>Fresh Ingredients</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeRecipeModal.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-gray-700 p-2 rounded-xl bg-gray-50">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-step instructions */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display text-gray-900 flex items-center space-x-2">
                  <ChefHat className="w-4 h-4 text-purple-600" />
                  <span>Preparation Steps</span>
                </h4>
                <div className="space-y-2.5">
                  {activeRecipeModal.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs text-gray-700 p-3 rounded-2xl bg-[#F7F8FC]">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
