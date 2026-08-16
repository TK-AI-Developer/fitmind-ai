import {
  User,
  WellnessStats,
  WorkoutRoutine,
  MealItem,
  Recipe,
  CommunityPost,
  BlogArticle,
  MeditationTrack,
  JournalEntry
} from '../types';

export const INITIAL_USER: User = {
  id: 'user-01',
  name: 'Tayyaba',
  email: 'ktayyiba374@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  streak: 12,
  isPremium: true,
  plan: 'FitMind Pro Member',
  bio: 'AI-driven fitness & holistic wellness enthusiast. Focusing on stamina, balanced macros & mindful recovery.',
  age: 26,
  weight: 67.5,
  targetWeight: 60.0,
  height: 168,
  activityLevel: 'Moderate to High (4-5 days/week)',
  fitnessGoal: 'Fat Loss & Lean Muscle Toning',
  dietPreference: 'High Protein / Balanced Mediterranean',
  calorieTarget: 2000,
  waterTarget: 2000,
  sleepTarget: 8,
  createdAt: '2026-01-10'
};

export const INITIAL_STATS: WellnessStats = {
  weight: 67.5,
  weightChangeMonth: -1.8,
  weightHistory: [
    { date: 'Week 1', weight: 69.3 },
    { date: 'Week 2', weight: 68.8 },
    { date: 'Week 3', weight: 68.1 },
    { date: 'Week 4', weight: 67.5 }
  ],
  calories: 1280,
  calorieTarget: 2000,
  caloriesBurned: 520,
  calorieBurnTarget: 800,
  steps: 8456,
  stepsTarget: 10000,
  activeMinutes: 80,
  activeMinutesTarget: 120,
  water: 1750, // 7 glasses of 250ml
  waterTarget: 2000, // 8 glasses
  sleep: 7.5,
  sleepTarget: 8,
  sleepQuality: 'Good',
  heartRate: 72,
  heartRateStatus: 'Normal',
  heartRateHistory: [
    { time: '06:00', bpm: 62 },
    { time: '08:00', bpm: 68 },
    { time: '10:00', bpm: 128 },
    { time: '12:00', bpm: 74 },
    { time: '14:00', bpm: 76 },
    { time: '16:00', bpm: 71 },
    { time: '18:00', bpm: 84 },
    { time: '20:00', bpm: 72 },
    { time: '22:00', bpm: 65 }
  ],
  stepsHistory: [
    { day: 'Mon', steps: 6500 },
    { day: 'Tue', steps: 8900 },
    { day: 'Wed', steps: 7200 },
    { day: 'Thu', steps: 8456 },
    { day: 'Fri', steps: 9400 },
    { day: 'Sat', steps: 11200 },
    { day: 'Sun', steps: 8200 }
  ],
  activeTimeHistory: [
    { day: 'Mon', mins: 45 },
    { day: 'Tue', mins: 90 },
    { day: 'Wed', mins: 60 },
    { day: 'Thu', mins: 80 },
    { day: 'Fri', mins: 75 },
    { day: 'Sat', mins: 120 },
    { day: 'Sun', mins: 60 }
  ],
  caloriesBurnedHistory: [
    { day: 'Mon', cal: 320 },
    { day: 'Tue', cal: 580 },
    { day: 'Wed', cal: 410 },
    { day: 'Thu', cal: 520 },
    { day: 'Fri', cal: 610 },
    { day: 'Sat', cal: 780 },
    { day: 'Sun', cal: 450 }
  ],
  sleepHistory: [
    { day: 'Mon', hours: 7.2, quality: 'Good' },
    { day: 'Tue', hours: 8.0, quality: 'Excellent' },
    { day: 'Wed', hours: 6.8, quality: 'Fair' },
    { day: 'Thu', hours: 7.5, quality: 'Good' },
    { day: 'Fri', hours: 7.8, quality: 'Good' },
    { day: 'Sat', hours: 8.5, quality: 'Excellent' },
    { day: 'Sun', hours: 7.5, quality: 'Good' }
  ],
  nutrition: {
    protein: 85,
    proteinTarget: 130,
    carbs: 120,
    carbsTarget: 190,
    fat: 42,
    fatTarget: 60,
    fiber: 18,
    fiberTarget: 28
  }
};

export const INITIAL_MEALS: MealItem[] = [
  {
    id: 'meal-01',
    type: 'breakfast',
    title: 'Oats with Fruits & Chia',
    description: 'Rolled oats with fresh blueberries, sliced bananas, chia seeds, and raw almond butter.',
    calories: 350,
    protein: 16,
    carbs: 52,
    fat: 9,
    fiber: 8,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&auto=format&fit=crop&q=80',
    time: '08:00 AM',
    isCompleted: true,
    ingredients: ['1/2 cup rolled oats', '1 cup unsweetened almond milk', '1 tbsp chia seeds', '1/2 cup blueberries', '1/2 banana', '1 tbsp almond butter'],
    instructions: ['Simmer oats in almond milk for 5 mins.', 'Top with chia, blueberries, sliced bananas and almond butter.']
  },
  {
    id: 'meal-02',
    type: 'lunch',
    title: 'Grilled Chicken Garden Salad',
    description: 'Marinated chicken breast, baby spinach, avocado, cucumber, cherry tomatoes and lemon vinaigrette.',
    calories: 480,
    protein: 42,
    carbs: 18,
    fat: 22,
    fiber: 6,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    time: '01:00 PM',
    isCompleted: true,
    ingredients: ['150g grilled chicken breast', '2 cups mixed greens', '1/2 avocado', '1/2 cup cherry tomatoes', '1 tbsp extra virgin olive oil', 'Fresh lemon juice'],
    instructions: ['Season chicken with garlic & herbs, grill 6 mins per side.', 'Toss greens with olive oil & lemon juice, top with sliced chicken & avocado.']
  },
  {
    id: 'meal-03',
    type: 'snack',
    title: 'Greek Yogurt & Roasted Walnuts',
    description: 'High-protein non-fat Greek yogurt drizzled with raw honey and lightly crushed walnuts.',
    calories: 180,
    protein: 15,
    carbs: 12,
    fat: 8,
    fiber: 2,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    time: '04:30 PM',
    isCompleted: false,
    ingredients: ['170g 0% Greek yogurt', '15g roasted walnuts', '1 tsp organic honey'],
    instructions: ['Scoop yogurt into bowl, top with crushed walnuts and drizzle raw honey.']
  },
  {
    id: 'meal-04',
    type: 'dinner',
    title: 'Wild Salmon with Herb Quinoa',
    description: 'Pan-seared Atlantic salmon fillet served over fluffy quinoa with steamed asparagus spears.',
    calories: 490,
    protein: 38,
    carbs: 38,
    fat: 20,
    fiber: 5,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    time: '07:30 PM',
    isCompleted: false,
    ingredients: ['160g wild salmon fillet', '1/2 cup cooked tricolor quinoa', '1 cup steamed asparagus', '1 tsp ghee or olive oil', 'Dill & sea salt'],
    instructions: ['Sear salmon in hot skillet skin-side down for 4 mins, flip for 3 mins.', 'Serve hot over warm herb quinoa and tender asparagus.']
  }
];

export const INITIAL_WORKOUTS: WorkoutRoutine[] = [
  {
    id: 'wo-01',
    title: 'Circuit Training – Full Body',
    subtitle: 'High energy metabolic conditioning with compound movements',
    category: 'Circuit',
    difficulty: 'Intermediate',
    durationMinutes: 30,
    caloriesBurn: 320,
    exercisesCount: 8,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    isRecommended: true,
    completedTimes: 14,
    exercises: [
      {
        id: 'ex-01',
        name: 'Jumping Jacks Warmup',
        category: 'cardio',
        targetMuscles: ['Full Body', 'Cardio'],
        durationSec: 45,
        caloriesBurnEstimate: 12,
        equipment: 'Bodyweight',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
        tips: ['Keep light on toes', 'Maintain steady rhythm']
      },
      {
        id: 'ex-02',
        name: 'Bodyweight Squats',
        category: 'strength',
        targetMuscles: ['Quadriceps', 'Glutes'],
        sets: 3,
        reps: '15 reps',
        caloriesBurnEstimate: 35,
        equipment: 'Bodyweight',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
        tips: ['Chest up, hips down & back', 'Push through heels']
      },
      {
        id: 'ex-03',
        name: 'Push-Ups (Standard / Incline)',
        category: 'strength',
        targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
        sets: 3,
        reps: '12 reps',
        caloriesBurnEstimate: 30,
        equipment: 'Bodyweight',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&auto=format&fit=crop&q=80',
        tips: ['Keep core braced in straight plank', 'Elbows at 45 degree angle']
      },
      {
        id: 'ex-04',
        name: 'Jump Squats (Power)',
        category: 'hiit',
        targetMuscles: ['Glutes', 'Calves', 'Core'],
        durationSec: 40,
        caloriesBurnEstimate: 45,
        equipment: 'Bodyweight',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&auto=format&fit=crop&q=80',
        tips: ['Explode upwards smoothly', 'Land softly on balls of feet']
      },
      {
        id: 'ex-05',
        name: 'Mountain Climbers',
        category: 'core',
        targetMuscles: ['Abs', 'Hip Flexors', 'Deltoids'],
        durationSec: 45,
        caloriesBurnEstimate: 38,
        equipment: 'Mat',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&auto=format&fit=crop&q=80',
        tips: ['Drive knees toward chest', 'Keep back flat']
      },
      {
        id: 'ex-06',
        name: 'Dumbbell Renegade Rows',
        category: 'strength',
        targetMuscles: ['Lats', 'Rhomboids', 'Core'],
        sets: 3,
        reps: '10 reps / side',
        caloriesBurnEstimate: 40,
        equipment: 'Dumbbells',
        difficulty: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80',
        tips: ['Widen feet for stability', 'Avoid twisting hips']
      },
      {
        id: 'ex-07',
        name: 'High Knees Sprint',
        category: 'hiit',
        targetMuscles: ['Calves', 'Quads', 'Cardiovascular'],
        durationSec: 40,
        caloriesBurnEstimate: 45,
        equipment: 'Bodyweight',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&auto=format&fit=crop&q=80',
        tips: ['Pump arms dynamically', 'Lift knees past waist level']
      },
      {
        id: 'ex-08',
        name: 'Plank Hold Finisher',
        category: 'core',
        targetMuscles: ['Transverse Abdominis', 'Lower Back'],
        durationSec: 60,
        caloriesBurnEstimate: 20,
        equipment: 'Mat',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&auto=format&fit=crop&q=80',
        tips: ['Tuck tailbone slightly', 'Breathe slowly & steadily']
      }
    ]
  },
  {
    id: 'wo-02',
    title: 'HIIT Fat Burn Supercharge',
    subtitle: 'High-intensity interval blast to maximize caloric expenditure',
    category: 'HIIT',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    caloriesBurn: 250,
    exercisesCount: 6,
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600&auto=format&fit=crop&q=80',
    isRecommended: true,
    completedTimes: 9,
    exercises: []
  },
  {
    id: 'wo-03',
    title: 'Yoga For Flexibility & Flow',
    subtitle: 'Vinyasa flow sequence to open hips, relieve tension and soothe mind',
    category: 'Yoga',
    difficulty: 'Beginner',
    durationMinutes: 25,
    caloriesBurn: 180,
    exercisesCount: 7,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
    isRecommended: true,
    completedTimes: 18,
    exercises: []
  },
  {
    id: 'wo-04',
    title: 'Abs & Core Blast 360',
    subtitle: 'Target upper, lower abs, obliques and deep pelvic stabilizers',
    category: 'Core',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    caloriesBurn: 200,
    exercisesCount: 5,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    isRecommended: true,
    completedTimes: 12,
    exercises: []
  }
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-01',
    title: 'Avocado Citrus Quinoa Bowl',
    category: 'High Protein',
    calories: 420,
    protein: 24,
    carbs: 48,
    fat: 16,
    prepTimeMinutes: 15,
    difficulty: 'Easy',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    tags: ['High Protein', 'Vegetarian', 'Gluten Free'],
    ingredients: ['1 cup cooked quinoa', '1 ripe avocado, diced', '1/2 cup edamame', '1 blood orange segments', '2 tbsp roasted pumpkin seeds', 'Lime-ginger dressing'],
    instructions: ['Layer fluffy quinoa in base bowl.', 'Arrange sliced avocado, steamed edamame, and citrus segments.', 'Drizzle lime-ginger vinaigrette and garnish with crunchy pumpkin seeds.'],
    isFavorite: true
  },
  {
    id: 'rec-02',
    title: 'Pan-Seared Salmon & Asparagus',
    category: 'Dinner',
    calories: 490,
    protein: 42,
    carbs: 12,
    fat: 26,
    prepTimeMinutes: 20,
    difficulty: 'Medium',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    tags: ['Keto Friendly', 'Omega-3', 'Dinner'],
    ingredients: ['200g Atlantic salmon', '1 bunch fresh asparagus', '1 tbsp extra virgin olive oil', '1 clove garlic, minced', 'Fresh dill & lemon slices'],
    instructions: ['Heat olive oil in cast iron skillet over medium-high heat.', 'Place salmon skin-side down, sear for 4 mins until crispy.', 'Add asparagus spears and minced garlic, sauté 3 mins until bright green and tender.'],
    isFavorite: true
  },
  {
    id: 'rec-03',
    title: 'Berry Antioxidant Smoothie Bowl',
    category: 'Breakfast',
    calories: 310,
    protein: 22,
    carbs: 44,
    fat: 6,
    prepTimeMinutes: 8,
    difficulty: 'Easy',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&auto=format&fit=crop&q=80',
    tags: ['Breakfast', 'Superfood', 'Quick'],
    ingredients: ['1 cup frozen organic berries', '1 scoop plant vanilla protein powder', '1/2 cup unsweetened almond milk', 'Chia seeds & sliced kiwi for topping'],
    instructions: ['Blend berries, protein powder, and almond milk into thick smoothie texture.', 'Pour into chilled bowl and arrange kiwi, chia seeds, and fresh berries on top.'],
    isFavorite: false
  },
  {
    id: 'rec-04',
    title: 'Mediterranean Herb Chicken Skewers',
    category: 'Lunch',
    calories: 460,
    protein: 48,
    carbs: 14,
    fat: 18,
    prepTimeMinutes: 25,
    difficulty: 'Medium',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    tags: ['High Protein', 'Meal Prep', 'Lunch'],
    ingredients: ['300g diced chicken breast', '1 red bell pepper', '1 red onion', '2 tbsp Greek olive oil', 'Oregano, paprika & lemon zest'],
    instructions: ['Thread seasoned chicken, bell pepper, and onions onto skewers.', 'Grill or bake at 200°C for 18 mins until charred and juicy.'],
    isFavorite: true
  },
  {
    id: 'rec-05',
    title: 'Crispy Tofu & Edamame Poke',
    category: 'Weight Loss',
    calories: 380,
    protein: 26,
    carbs: 36,
    fat: 14,
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['Vegan', 'Plant Powered', 'Low Calorie'],
    ingredients: ['150g firm organic tofu (cubed & air-fried)', '1/2 cup shelled edamame', '1/2 cup shredded carrots & red cabbage', '1/2 cup brown rice or cauliflower rice', 'Sesame-tamari dressing'],
    instructions: ['Air fry tofu cubes at 190°C for 12 mins until crunchy golden.', 'Assemble over cauliflower rice base, top with edamame and sesame dressing.'],
    isFavorite: false
  },
  {
    id: 'rec-06',
    title: 'Matcha Protein Chia Pudding',
    category: 'Snacks',
    calories: 220,
    protein: 16,
    carbs: 18,
    fat: 8,
    prepTimeMinutes: 5,
    difficulty: 'Easy',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80',
    tags: ['Clean Energy', 'Snack', 'No Bake'],
    ingredients: ['3 tbsp chia seeds', '1 tsp ceremonial Japanese matcha', '1 cup oat milk', '1 tbsp maple syrup', 'Toasted coconut flakes'],
    instructions: ['Whisk matcha powder into oat milk with maple syrup.', 'Stir in chia seeds, let set in fridge for 2 hours or overnight.'],
    isFavorite: true
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-01',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    authorBadge: 'HIIT Champion 🔥',
    timeAgo: '2 hours ago',
    content: 'Just smashed the 30-min Circuit Training workout with FitMind AI! Pushed my heart rate to the peak zone and hit 340 kcal burn. Who else is staying consistent this week?',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    tag: '#ConsistencyIsKey',
    likesCount: 38,
    isLiked: true,
    commentsCount: 6,
    comments: [
      {
        id: 'c-01',
        authorName: 'Alex Rivera',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Awesome work Sarah! Doing that exact session this evening 💪',
        timeAgo: '1h ago'
      },
      {
        id: 'c-02',
        authorName: 'Tayyaba',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Great form! The jump squats at round 4 always test mental grit!',
        timeAgo: '45m ago'
      }
    ]
  },
  {
    id: 'post-02',
    authorName: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorBadge: 'Macro Master 🥗',
    timeAgo: '4 hours ago',
    content: 'Meal prep Sunday done right! Prepared the Salmon Quinoa & Herb bowls recommended by the AI Diet Planner for the next 3 days. Clean macros = clear brain.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    tag: '#MealPrep #CleanNutrition',
    likesCount: 52,
    isLiked: false,
    commentsCount: 4
  },
  {
    id: 'post-03',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    authorBadge: 'Mindfulness Guru 🧘',
    timeAgo: '7 hours ago',
    content: 'Hit a 21-day streak on morning 4-4-4 box breathing & hydration. My resting heart rate dropped from 78 to 68 bpm over the past month. Small habits compound so fast!',
    tag: '#MindfulLiving #Breathwork',
    likesCount: 89,
    isLiked: true,
    commentsCount: 11
  }
];

export const INITIAL_ARTICLES: BlogArticle[] = [
  {
    id: 'art-01',
    title: 'The Neuroscience of Habit Formation: How AI Coaches Keep You Consistent',
    category: 'Science',
    readTimeMinutes: 5,
    author: 'Dr. Marcus Vance',
    authorRole: 'Cognitive Neuroscientist & Wellness Advisor',
    date: 'August 14, 2026',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Discover the exact neural pathways involved in building autonomic fitness habits and how AI personalized micro-nudges eliminate willpower fatigue.',
    isFeatured: true,
    content: [
      'Willpower is a finite cognitive resource. When you rely solely on spontaneous motivation to exercise or eat healthy, decision fatigue inevitably sets in by the afternoon.',
      'By utilizing intelligent telemetry tracking, FitMind AI anticipates energy dips and provides automated friction reduction—scheduling your optimal training window when dopamine receptor sensitivity is highest.',
      'Research shows that users who receive contextual, non-judgmental guidance maintain a 3.4x higher adherence rate to dietary and workout routines over a 90-day period.'
    ]
  },
  {
    id: 'art-02',
    title: 'Optimizing Deep Sleep Cycles for Accelerated Muscle Recovery',
    category: 'Fitness',
    readTimeMinutes: 4,
    author: 'Elena Rostova',
    authorRole: 'Recovery Specialist',
    date: 'August 10, 2026',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?w=800&auto=format&fit=crop&q=80',
    excerpt: '95% of human growth hormone (HGH) release occurs during Stage 3 NREM deep sleep. Here is how to structure your evening routine for maximum cellular rejuvenation.',
    isFeatured: false,
    content: [
      'Sleep is not merely rest; it is an active anabolic state where damaged myofibrils are reconstructed into denser, stronger muscle fibers.',
      'Consuming magnesium glycinate and maintaining a bedroom temperature of 18°C (65°F) stimulates melatonin production while minimizing nocturnal awakenings.'
    ]
  },
  {
    id: 'art-03',
    title: 'High-Protein Mediterranean Diet: The Gold Standard for Longevity & Fat Loss',
    category: 'Nutrition',
    readTimeMinutes: 6,
    author: 'Chef Liam Vance',
    authorRole: 'Sports Nutritionist',
    date: 'August 06, 2026',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Combining polyunsaturated fatty acids from wild seafood and extra virgin olive oil with lean proteins optimizes satiety peptides like GLP-1 and PYY naturally.',
    isFeatured: false,
    content: [
      'The modern fitness landscape often pushes extreme dietary dogmas. However, clinical meta-analyses consistently rank the high-protein Mediterranean archetype as the most sustainable dietary pattern.',
      'By prioritizing colorful polyphenol-rich vegetables alongside high biological value proteins, you combat systemic inflammation while maintaining steady blood glucose levels throughout intense training blocks.'
    ]
  },
  {
    id: 'art-04',
    title: 'Box Breathing & Vagus Nerve Stimulation: Fast Relief from Acute Stress',
    category: 'Mental Health',
    readTimeMinutes: 4,
    author: 'Maya Lin',
    authorRole: 'Mindfulness Instructor',
    date: 'August 02, 2026',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    excerpt: 'A four-second inhalation, four-second retention, and four-second exhalation physically downregulates sympathetic nervous tone in under two minutes.',
    isFeatured: false,
    content: [
      'Whenever mental overwhelm spikes, your heart rate accelerates and blood vessels constrict. The fastest biological off-ramp is controlled diaphragmatic respiration.',
      'Our interactive 4-4-4 breathing circle engages the baroreflex mechanism, directly stimulating the vagus nerve to release acetylcholine and lower systolic blood pressure.'
    ]
  }
];

export const INITIAL_MEDITATIONS: MeditationTrack[] = [
  {
    id: 'med-01',
    title: 'Zen Rainfall in Kyoto',
    category: 'Rain',
    durationMinutes: 10,
    ambientSound: 'rain',
    icon: 'CloudRain',
    description: 'Gentle raindrops on bamboo leaves with soft distant thunder for deep grounding and anxiety relief.'
  },
  {
    id: 'med-02',
    title: 'Alpine Forest Stream',
    category: 'Stream',
    durationMinutes: 15,
    ambientSound: 'stream',
    icon: 'Waves',
    description: 'Crisp crystal water cascading over smooth river stones to wash away mental clutter and fatigue.'
  },
  {
    id: 'med-03',
    title: 'Deep Theta Wave Resonance',
    category: 'Focus',
    durationMinutes: 20,
    ambientSound: 'waves',
    icon: 'Sparkles',
    description: '6Hz binaural beats blended with harmonic ambient drones to foster peak focus and flow states.'
  },
  {
    id: 'med-04',
    title: 'Sunset Coastal Waves',
    category: 'Breathe',
    durationMinutes: 12,
    ambientSound: 'waves',
    icon: 'Wind',
    description: 'Rhythmic oceanic tide cadenced precisely to support 4-4-4 deep diaphragmatic breathing.'
  }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j-01',
    date: 'Today, 08:30 AM',
    title: 'Morning Clarity & Strength Intention',
    mood: 'Amazing',
    gratitudeItems: [
      'Woke up energized after 8 hours of restorative sleep',
      'The morning sun streaming into the kitchen',
      'Strength in my body to complete circuit training'
    ],
    content: 'Feeling focused and determined today. My goal is to nourish my body with clean whole foods, hit 10k steps before evening, and take 10 minutes to decompress without screens.'
  },
  {
    id: 'j-02',
    date: 'Yesterday, 09:15 PM',
    title: 'Evening Reflection & Body Gratitude',
    mood: 'Good',
    gratitudeItems: [
      'Crushed my hydration target of 2L water',
      'Positive collaboration with my wellness coach',
      'Nutritious salmon and herb quinoa dinner'
    ],
    content: 'Noticeable drop in afternoon cravings by keeping protein high at lunch. Feeling calm and ready for restorative sleep.'
  }
];

export const MEDITATION_TRACKS: MeditationTrack[] = [
  {
    id: 'med-01',
    title: 'Zen Rainfall in Kyoto',
    category: 'Rain',
    duration: '10 mins',
    durationMinutes: 10,
    ambientSound: 'rain',
    icon: 'CloudRain',
    description: 'Gentle raindrops on bamboo leaves with soft distant thunder for deep grounding and anxiety relief.'
  },
  {
    id: 'med-02',
    title: 'Alpine Forest Stream',
    category: 'Stream',
    duration: '15 mins',
    durationMinutes: 15,
    ambientSound: 'stream',
    icon: 'Waves',
    description: 'Crisp crystal water cascading over smooth river stones to wash away mental clutter and fatigue.'
  },
  {
    id: 'med-03',
    title: 'Deep Theta Wave Resonance (432Hz)',
    category: 'Focus',
    duration: '20 mins',
    durationMinutes: 20,
    ambientSound: 'waves',
    icon: 'Sparkles',
    description: '6Hz binaural beats blended with harmonic ambient drones to foster peak focus and flow states.'
  },
  {
    id: 'med-04',
    title: 'Sunset Coastal Waves',
    category: 'Breathe',
    duration: '12 mins',
    durationMinutes: 12,
    ambientSound: 'waves',
    icon: 'Wind',
    description: 'Rhythmic oceanic tide cadenced precisely to support 4-4-4 deep diaphragmatic breathing.'
  }
];

export const ACHIEVEMENTS_LIST = [
  {
    id: 'ach-01',
    title: '7-Day Streak',
    description: 'Logged 7 consecutive days of fitness activity',
    icon: '🔥',
    unlocked: true
  },
  {
    id: 'ach-02',
    title: 'Hydration Hero',
    description: 'Met daily water target 5 times in one week',
    icon: '💧',
    unlocked: true
  },
  {
    id: 'ach-03',
    title: 'HIIT Conqueror',
    description: 'Completed 10 high-intensity interval sessions',
    icon: '⚡',
    unlocked: true
  },
  {
    id: 'ach-04',
    title: 'Clean Nutrition Master',
    description: 'Hit exact protein and macro split targets',
    icon: '🥗',
    unlocked: false
  },
  {
    id: 'ach-05',
    title: 'Zen Mindset',
    description: 'Logged 15 mindful breathing & gratitude sessions',
    icon: '🧘',
    unlocked: false
  },
  {
    id: 'ach-06',
    title: 'Century Cycler',
    description: 'Burned 10,000 cumulative active calories',
    icon: '🏆',
    unlocked: false
  }
];

export const MOTIVATIONAL_QUOTES = [
  { quote: 'Discipline today, strength tomorrow.', author: 'FitMind AI Principle' },
  { quote: 'Your body can stand almost anything. It’s your mind that you have to convince.', author: 'Wellness Axiom' },
  { quote: 'Small daily improvements over time lead to stunning results.', author: 'Robin Sharma' },
  { quote: 'Take care of your body. It’s the only place you have to live.', author: 'Jim Rohn' },
  { quote: 'Energy flows where attention goes.', author: 'Mindfulness Wisdom' }
];

export const SEARCH_SUGGESTIONS = [
  { label: 'HIIT Fat Burn Workout', tab: 'timer-exercises', category: 'Workout' },
  { label: 'Salmon with Quinoa Recipe', tab: 'recipes', category: 'Recipe' },
  { label: 'Oats with Fruits (Breakfast)', tab: 'diet-planner', category: 'Diet' },
  { label: 'Guided 4-4-4 Box Breathing', tab: 'mental-wellness', category: 'Wellness' },
  { label: 'Water Hydration Calculator', tab: 'water-tracker', category: 'Tracker' },
  { label: 'Deep Sleep Optimization Guide', tab: 'blog', category: 'Article' },
  { label: 'Circuit Training – Full Body', tab: 'workout-tracker', category: 'Workout' },
  { label: 'Avocado Citrus Quinoa Bowl', tab: 'recipes', category: 'Recipe' }
];
