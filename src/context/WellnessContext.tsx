import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  WellnessStats,
  MealItem,
  WorkoutRoutine,
  Recipe,
  CommunityPost,
  BlogArticle,
  JournalEntry,
  MoodLog,
  AIChatMessage
} from '../types';
import {
  INITIAL_USER,
  INITIAL_STATS,
  INITIAL_MEALS,
  INITIAL_WORKOUTS,
  INITIAL_RECIPES,
  INITIAL_POSTS,
  INITIAL_ARTICLES,
  INITIAL_JOURNAL_ENTRIES
} from '../data/mockData';

interface WellnessContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updateUser: (updates: Partial<User>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: WellnessStats;
  logWater: (amountMl: number) => void;
  logSteps: (stepsToAdd: number) => void;
  logCaloriesBurned: (cal: number) => void;
  updateWeight: (newWeight: number) => void;
  meals: MealItem[];
  toggleMealCompleted: (mealId: string) => void;
  replaceMeal: (mealId: string, newMeal: Partial<MealItem>) => void;
  regenerateDietPlan: () => void;
  workouts: WorkoutRoutine[];
  activeWorkout: WorkoutRoutine | null;
  setActiveWorkout: (workout: WorkoutRoutine | null) => void;
  completeWorkout: (workoutId: string) => void;
  recipes: Recipe[];
  toggleRecipeFavorite: (recipeId: string) => void;
  posts: CommunityPost[];
  toggleLikePost: (postId: string) => void;
  addPostComment: (postId: string, commentText: string) => void;
  createPost: (content: string, tag: string, image?: string) => void;
  articles: BlogArticle[];
  selectedArticle: BlogArticle | null;
  setSelectedArticle: (art: BlogArticle | null) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  moodLogs: MoodLog[];
  logMood: (mood: MoodLog['mood'], score: number, note?: string) => void;
  aiMessages: AIChatMessage[];
  isAiTyping: boolean;
  sendAiMessage: (text: string) => void;
  clearAiChat: () => void;
  isAICoachPanelOpen: boolean;
  setIsAICoachPanelOpen: (open: boolean) => void;
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  triggerCelebration: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: { id: string; title: string; time: string; read: boolean; type: string }[];
  markNotificationsAsRead: () => void;
  hasStartedApp: boolean;
  setHasStartedApp: (val: boolean) => void;
  isTransitioning: boolean;
  startAppJourney: (targetTab?: string) => void;
  returnToLanding: () => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // User state
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('fitmind_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Stats state
  const [stats, setStats] = useState<WellnessStats>(() => {
    const saved = localStorage.getItem('fitmind_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  // Meals state
  const [meals, setMeals] = useState<MealItem[]>(() => {
    const saved = localStorage.getItem('fitmind_meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });

  // Workouts state
  const [workouts, setWorkouts] = useState<WorkoutRoutine[]>(INITIAL_WORKOUTS);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutRoutine | null>(INITIAL_WORKOUTS[0]);

  // Recipes state
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('fitmind_recipes');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  // Community state
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('fitmind_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // Articles state
  const [articles, setArticles] = useState<BlogArticle[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Journal & Mood
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('fitmind_journal');
    return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ENTRIES;
  });

  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([
    { id: 'm-1', date: 'Today', mood: 'Amazing', score: 5, note: 'Slept 8 hours and energized' },
    { id: 'm-2', date: 'Yesterday', mood: 'Good', score: 4, note: 'Solid workout session' }
  ]);

  // AI Chat Messages
  const [aiMessages, setAiMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-01',
      sender: 'ai',
      text: `Hi ${user.name}! 👋 I'm your dedicated FitMind AI Wellness Coach. Today you have 520 kcal left on your nutrition goal, and you've crushed 8,456 steps! How can I support your fitness, nutrition, or mindfulness right now?`,
      timestamp: 'Just now',
      actions: [
        { label: 'Create a diet plan for today.', actionType: 'quick_reply' },
        { label: 'Make me a workout plan.', actionType: 'quick_reply' },
        { label: 'Track my progress.', actionType: 'quick_reply' }
      ]
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // UI Drawer / Modal Toggles
  const [isAICoachPanelOpen, setIsAICoachPanelOpen] = useState(true);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'n-1', title: '🔥 12-Day Streak Achieved! Keep crushing your goals.', time: '10m ago', read: false, type: 'streak' },
    { id: 'n-2', title: '💧 Hydration reminder: Drink a glass of water (250ml)', time: '45m ago', read: false, type: 'water' },
    { id: 'n-3', title: '🥗 AI Diet Planner has updated your dinner suggestions', time: '2h ago', read: true, type: 'diet' }
  ]);

  // App Started & Transition State
  const [hasStartedApp, setHasStartedApp] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const startAppJourney = (targetTab?: string) => {
    setIsTransitioning(true);
    // Smooth transition timeout: Step 1 scale -> Step 2 blur/fade -> Step 3 loader -> Step 4 ready
    setTimeout(() => {
      if (targetTab) {
        setActiveTab(targetTab);
      } else {
        setActiveTab('dashboard');
      }
      setHasStartedApp(true);
      setIsTransitioning(false);
      triggerCelebration();
    }, 1300);
  };

  const returnToLanding = () => {
    setHasStartedApp(false);
    setIsTransitioning(false);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fitmind_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fitmind_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('fitmind_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('fitmind_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('fitmind_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('fitmind_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Actions
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6C3ED9', '#8B5CF6', '#39B982', '#FF9F43', '#FF5A6A']
      });
    } catch {
      // fallback
    }
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const logWater = (amountMl: number) => {
    setStats(prev => {
      const newWater = Math.min(prev.waterTarget * 1.5, prev.water + amountMl);
      return { ...prev, water: newWater };
    });
  };

  const logSteps = (stepsToAdd: number) => {
    setStats(prev => {
      const newSteps = prev.steps + stepsToAdd;
      const todayDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
      const updatedHistory = prev.stepsHistory.map(item =>
        item.day === todayDay ? { ...item, steps: newSteps } : item
      );
      return {
        ...prev,
        steps: newSteps,
        stepsHistory: updatedHistory,
        caloriesBurned: prev.caloriesBurned + Math.round(stepsToAdd * 0.04)
      };
    });
  };

  const logCaloriesBurned = (cal: number) => {
    setStats(prev => ({
      ...prev,
      caloriesBurned: prev.caloriesBurned + cal,
      activeMinutes: prev.activeMinutes + Math.round(cal / 6)
    }));
    triggerCelebration();
  };

  const updateWeight = (newWeight: number) => {
    setStats(prev => {
      const diff = +(newWeight - prev.weight).toFixed(1);
      const newHistory = [...prev.weightHistory.slice(1), { date: 'Today', weight: newWeight }];
      return {
        ...prev,
        weight: newWeight,
        weightChangeMonth: +(prev.weightChangeMonth + diff).toFixed(1),
        weightHistory: newHistory
      };
    });
    updateUser({ weight: newWeight });
  };

  const toggleMealCompleted = (mealId: string) => {
    setMeals(prev =>
      prev.map(m => (m.id === mealId ? { ...m, isCompleted: !m.isCompleted } : m))
    );
  };

  const replaceMeal = (mealId: string, newMeal: Partial<MealItem>) => {
    setMeals(prev =>
      prev.map(m => (m.id === mealId ? { ...m, ...newMeal } : m))
    );
  };

  const regenerateDietPlan = () => {
    setMeals([
      {
        id: 'meal-alt-1',
        type: 'breakfast',
        title: 'Avocado Protein Toast & Poached Egg',
        description: 'Sourdough toast with crushed hass avocado, organic poached egg & hemp seeds.',
        calories: 360,
        protein: 19,
        carbs: 32,
        fat: 16,
        fiber: 7,
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
        time: '08:15 AM',
        isCompleted: false
      },
      {
        id: 'meal-alt-2',
        type: 'lunch',
        title: 'Sesame Seared Tuna Poke Bowl',
        description: 'Ahi tuna cubes, edamame, cucumber ribbons, and sushi rice with tamari glaze.',
        calories: 490,
        protein: 44,
        carbs: 45,
        fat: 14,
        fiber: 5,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        time: '01:15 PM',
        isCompleted: false
      },
      {
        id: 'meal-alt-3',
        type: 'snack',
        title: 'Matcha Chia Seed Energy Pudding',
        description: 'Oat milk matcha pudding topped with organic raspberries and cacao nibs.',
        calories: 190,
        protein: 12,
        carbs: 22,
        fat: 7,
        fiber: 8,
        image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80',
        time: '04:45 PM',
        isCompleted: false
      },
      {
        id: 'meal-alt-4',
        type: 'dinner',
        title: 'Lemon Herb Mediterranean Chicken',
        description: 'Tender roasted chicken breast with rosemary, roasted sweet potato wedges & asparagus.',
        calories: 470,
        protein: 46,
        carbs: 34,
        fat: 14,
        fiber: 6,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
        time: '07:45 PM',
        isCompleted: false
      }
    ]);
    triggerCelebration();
  };

  const completeWorkout = (workoutId: string) => {
    setWorkouts(prev =>
      prev.map(w =>
        w.id === workoutId ? { ...w, completedTimes: (w.completedTimes || 0) + 1 } : w
      )
    );
    const target = workouts.find(w => w.id === workoutId);
    const cal = target ? target.caloriesBurn : 300;
    logCaloriesBurned(cal);
  };

  const toggleRecipeFavorite = (recipeId: string) => {
    setRecipes(prev =>
      prev.map(r => (r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1
          };
        }
        return p;
      })
    );
  };

  const addPostComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const newComment = {
            id: 'comm-' + Date.now(),
            authorName: user.name,
            authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            text: commentText,
            timeAgo: 'Just now'
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );
  };

  const createPost = (content: string, tag: string, image?: string) => {
    const newPost: CommunityPost = {
      id: 'p-' + Date.now(),
      authorName: user.name,
      authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      authorBadge: 'FitMind Achiever ⭐',
      timeAgo: 'Just now',
      content,
      image,
      tag: tag.startsWith('#') ? tag : `#${tag}`,
      likesCount: 1,
      isLiked: true,
      commentsCount: 0,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
    triggerCelebration();
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      id: 'j-' + Date.now(),
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...entry
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    triggerCelebration();
  };

  const logMood = (mood: MoodLog['mood'], score: number, note?: string) => {
    const newLog: MoodLog = {
      id: 'm-' + Date.now(),
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood,
      score,
      note
    };
    setMoodLogs(prev => [newLog, ...prev]);
  };

  const sendAiMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setAiMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    setTimeout(() => {
      let aiReply: AIChatMessage;
      const lower = text.toLowerCase();

      if (lower.includes('diet') || lower.includes('meal') || lower.includes('food') || lower.includes('eat') || lower.includes('calories')) {
        aiReply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `Here is your customized Mediterranean High-Protein nutrition plan! You're currently at 1,280 / 2,000 kcal, leaving 520 kcal for a nourishing dinner like Wild Salmon with Herb Quinoa.`,
          timestamp: 'Just now',
          cards: [
            {
              type: 'diet',
              title: "Today's Macro Target (2,000 kcal)",
              subtitle: '130g Protein • 190g Carbs • 60g Fats',
              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
              ctaLabel: 'View Diet Plan',
              targetTab: 'diet-planner'
            }
          ],
          actions: [
            { label: 'View Diet Plan', actionType: 'navigate', targetTab: 'diet-planner' },
            { label: 'Explore Healthy Recipes', actionType: 'navigate', targetTab: 'recipes' }
          ]
        };
      } else if (lower.includes('workout') || lower.includes('exercise') || lower.includes('train') || lower.includes('hiit') || lower.includes('timer')) {
        aiReply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `I've queued the **Circuit Training – Full Body** routine for you! It features 8 compound movements with 45s work / 15s rest to burn ~320 kcal.`,
          timestamp: 'Just now',
          cards: [
            {
              type: 'workout',
              title: 'Circuit Training – Full Body',
              subtitle: '30 mins • 320 kcal • 8 Exercises',
              image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
              ctaLabel: 'Start Workout',
              targetTab: 'timer-exercises'
            }
          ],
          actions: [
            { label: 'Start Workout in Timer', actionType: 'navigate', targetTab: 'timer-exercises' },
            { label: 'See Workout Tracker', actionType: 'navigate', targetTab: 'workout-tracker' }
          ]
        };
      } else if (lower.includes('progress') || lower.includes('weight') || lower.includes('stat') || lower.includes('track')) {
        aiReply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `You're down **1.8 kg this month** (current: 67.5 kg, target: 60.0 kg)! Your active heart rate and consistency streak are performing in the top 5% of FitMind AI members.`,
          timestamp: 'Just now',
          cards: [
            {
              type: 'stats',
              title: 'Weight: 67.5 kg (-1.8 kg)',
              subtitle: '12-Day Streak 🔥 • 8,456 Steps Today',
              ctaLabel: 'See Analytics',
              targetTab: 'progress'
            }
          ],
          actions: [
            { label: 'View Full Progress', actionType: 'navigate', targetTab: 'progress' }
          ]
        };
      } else if (lower.includes('water') || lower.includes('drink') || lower.includes('hydrate')) {
        aiReply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `You have consumed **7 out of 8 glasses** (1,750 / 2,000 ml) of water today. Just 1 glass left to achieve optimal cellular hydration!`,
          timestamp: 'Just now',
          actions: [
            { label: 'Drink 1 Glass (+250ml)', actionType: 'quick_reply' },
            { label: 'Open Water Tracker', actionType: 'navigate', targetTab: 'water-tracker' }
          ]
        };
      } else if (lower.includes('sleep') || lower.includes('tired') || lower.includes('stress') || lower.includes('relax') || lower.includes('meditat')) {
        aiReply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `Your nervous system recovers rapidly through **4-4-4 Box Breathing** and theta audio resonance. Let's do a 3-minute guided mindfulness loop.`,
          timestamp: 'Just now',
          actions: [
            { label: 'Start Box Breathing', actionType: 'navigate', targetTab: 'mental-wellness' },
            { label: 'Check Sleep Tracker', actionType: 'navigate', targetTab: 'sleep-tracker' }
          ]
        };
      } else {
        aiReply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `I've analyzed your wellness profile! Your metabolism is primed and you're maintaining a great 12-day streak. What would you like to focus on next?`,
          timestamp: 'Just now',
          actions: [
            { label: 'Create a diet plan for today.', actionType: 'quick_reply' },
            { label: 'Make me a workout plan.', actionType: 'quick_reply' },
            { label: 'Track my progress.', actionType: 'quick_reply' }
          ]
        };
      }

      setAiMessages(prev => [...prev, aiReply]);
      setIsAiTyping(false);
    }, 700);
  };

  const clearAiChat = () => {
    setAiMessages([
      {
        id: 'msg-init',
        sender: 'ai',
        text: `Chat reset! I'm ready to craft your next customized workout, macro meal plan, or relaxation session.`,
        timestamp: 'Just now',
        actions: [
          { label: 'Create a diet plan for today.', actionType: 'quick_reply' },
          { label: 'Make me a workout plan.', actionType: 'quick_reply' }
        ]
      }
    ]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <WellnessContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        activeTab,
        setActiveTab,
        stats,
        logWater,
        logSteps,
        logCaloriesBurned,
        updateWeight,
        meals,
        toggleMealCompleted,
        replaceMeal,
        regenerateDietPlan,
        workouts,
        activeWorkout,
        setActiveWorkout,
        completeWorkout,
        recipes,
        toggleRecipeFavorite,
        posts,
        toggleLikePost,
        addPostComment,
        createPost,
        articles,
        selectedArticle,
        setSelectedArticle,
        journalEntries,
        addJournalEntry,
        moodLogs,
        logMood,
        aiMessages,
        isAiTyping,
        sendAiMessage,
        clearAiChat,
        isAICoachPanelOpen,
        setIsAICoachPanelOpen,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        triggerCelebration,
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationsAsRead,
        hasStartedApp,
        setHasStartedApp,
        isTransitioning,
        startAppJourney,
        returnToLanding
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};
