export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  streak: number;
  isPremium: boolean;
  plan?: string;
  bio?: string;
  age?: number;
  weight?: number;
  targetWeight?: number;
  height?: number;
  activityLevel?: string;
  fitnessGoal?: string;
  dietPreference?: string;
  calorieTarget?: number;
  waterTarget?: number;
  sleepTarget?: number;
  createdAt?: string;
  profile?: any;
}

export interface WellnessStats {
  weight: number;
  weightChangeMonth: number;
  weightHistory: { date: string; weight: number }[];
  calories: number;
  calorieTarget: number;
  caloriesBurned: number;
  calorieBurnTarget: number;
  steps: number;
  stepsTarget: number;
  activeMinutes: number;
  activeMinutesTarget: number;
  water: number;
  waterTarget: number;
  sleep: number;
  sleepTarget: number;
  sleepQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  heartRate: number;
  heartRateStatus: 'Normal' | 'Elevated' | 'Resting';
  heartRateHistory: { time: string; bpm: number }[];
  stepsHistory: { day: string; steps: number }[];
  activeTimeHistory: { day: string; mins: number }[];
  caloriesBurnedHistory: { day: string; cal: number }[];
  sleepHistory: { day: string; hours: number; quality: string }[];
  nutrition: {
    protein: number;
    proteinTarget: number;
    carbs: number;
    carbsTarget: number;
    fat: number;
    fatTarget: number;
    fiber: number;
    fiberTarget: number;
  };
}

export interface MealItem {
  id: string;
  type: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  image: string;
  time: string;
  isCompleted?: boolean;
  ingredients?: string[];
  instructions?: string[];
}

export interface DietPlan {
  id: string;
  dayName: string;
  date: string;
  totalCalories: number;
  targetCalories: number;
  meals: MealItem[];
  waterMl: number;
  notes?: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'core' | 'hiit';
  targetMuscles: string[];
  sets?: number;
  reps?: string;
  durationSec?: number;
  caloriesBurnEstimate: number;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  animationUrl?: string;
  tips?: string[];
  isCompleted?: boolean;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  durationMinutes: number;
  caloriesBurn: number;
  exercisesCount?: number;
  image: string;
  exercises: ExerciseItem[];
  isRecommended?: boolean;
  completedTimes?: number;
}

export interface TimerConfig {
  mode: 'Tabata' | 'HIIT' | 'Circuit' | 'EMOM' | 'Custom';
  workSec: number;
  restSec: number;
  rounds: number;
  currentRound: number;
  prepareSec: number;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'navigate' | 'quick_reply' | 'open_modal';
    targetTab?: string;
    payload?: any;
  }[];
  cards?: {
    type: 'diet' | 'workout' | 'stats' | 'recipe';
    title: string;
    subtitle: string;
    image?: string;
    metrics?: { label: string; value: string }[];
    ctaLabel?: string;
    targetTab?: string;
  }[];
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'High Protein' | 'Weight Loss';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTimeMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Chef';
  rating: number;
  image: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  isFavorite?: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorBadge: string;
  timeAgo: string;
  content: string;
  image?: string;
  tag: string;
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
  comments?: {
    id: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    timeAgo: string;
  }[];
}

export interface BlogArticle {
  id: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Mental Health' | 'Productivity' | 'Science';
  readTimeMinutes?: number;
  readTime?: string;
  author: string;
  authorRole: string;
  date: string;
  image: string;
  excerpt?: string;
  summary?: string;
  content: string[] | string;
  tags?: string[];
  isFeatured?: boolean;
  isSaved?: boolean;
}

export interface MoodLog {
  id: string;
  date: string;
  mood: 'Amazing' | 'Good' | 'Neutral' | 'Tired' | 'Stressed';
  score: number;
  note?: string;
  tags?: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  gratitude?: string[];
  gratitudeItems?: string[];
  tags?: string[];
}

export interface MeditationTrack {
  id: string;
  title: string;
  category: string;
  duration?: string;
  durationMinutes?: number;
  ambientSound?: string;
  icon?: string;
  description?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsersToday?: number;
  premiumSubscribers?: number;
  premiumUsers?: number;
  revenueThisMonth?: number;
  totalSessions?: number;
  totalKcalBurned?: number;
  users?: any[];
}
