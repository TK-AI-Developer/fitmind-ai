import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Search,
  Clock,
  BookOpen,
  Bookmark,
  Share2,
  X,
  Sparkles,
  ChevronRight,
  User
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { BlogArticle } from '../types';

export default function BlogPage() {
  const { articles, selectedArticle, setSelectedArticle, triggerCelebration } = useWellness();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const categories = ['All', 'Nutrition', 'Fitness', 'Science', 'Mental Health'];

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    triggerCelebration();
  };

  const filteredArticles = articles.filter((a) => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const summaryText = a.excerpt || a.summary || '';
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summaryText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAF0]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#1F2437] flex items-center space-x-2.5">
            <FileText className="w-6 h-6 text-purple-600" />
            <span>AI Wellness Research & Insights</span>
          </h1>
          <p className="text-xs text-gray-500">
            Evidence-based fitness science, metabolic recovery protocols, and longevity guides.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health articles..."
            className="w-full bg-white border border-[#E8EAF0] focus:border-purple-500 rounded-full pl-10 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none transition"
          />
        </div>
      </div>

      {/* Category Filter */}
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const isBookmarked = bookmarkedIds.includes(article.id);
          const readTimeStr = article.readTime || `${article.readTimeMinutes || 5} min read`;
          const summaryStr = article.excerpt || article.summary || 'Evidence-based protocol and research insights.';

          return (
            <motion.div
              key={article.id}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white border border-[#E8EAF0] shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold text-gray-800 uppercase">
                  {article.category}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(article.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-600 transition shadow-sm"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-purple-600 text-purple-600' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-purple-300" />
                    <span>{readTimeStr}</span>
                  </span>
                  <span className="text-[10px] text-gray-300">{article.date}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold font-display text-gray-900 group-hover:text-purple-600 transition leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {summaryStr}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs font-semibold text-gray-600 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-purple-600" />
                    <span>{article.author}</span>
                  </span>

                  <span className="text-xs font-bold text-[#6C3ED9] group-hover:translate-x-1 transition-transform flex items-center">
                    Read Article
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E8EAF0] shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="px-2.5 py-1 rounded-md bg-purple-600 text-[10px] font-bold uppercase">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display mt-2 leading-tight">
                      {selectedArticle.title}
                    </h2>
                    <div className="flex items-center space-x-3 text-xs text-purple-200 mt-2">
                      <span>By {selectedArticle.author}</span>
                      <span>•</span>
                      <span>{selectedArticle.readTime || `${selectedArticle.readTimeMinutes || 5} mins`}</span>
                      <span>•</span>
                      <span>{selectedArticle.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Key Insights Box */}
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 mb-6 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-purple-900 font-display">AI Key Takeaway</h4>
                  <p className="text-xs text-purple-800 leading-relaxed mt-1">
                    {selectedArticle.excerpt || selectedArticle.summary || 'Evidence-based longevity protocols.'}
                  </p>
                </div>
              </div>

              {/* Content body */}
              <div className="prose prose-purple max-w-none text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
                {Array.isArray(selectedArticle.content) ? (
                  selectedArticle.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{selectedArticle.content}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
