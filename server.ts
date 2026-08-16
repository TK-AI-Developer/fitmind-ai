import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

const PORT = 3000;
const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
}

// Initial default database state
const defaultDb = {
  users: [
    {
      id: 'tayyaba-id',
      email: 'ktayyiba374@gmail.com',
      password: 'password123',
      name: 'Tayyaba',
      onboarded: true,
      isPremium: true,
      role: 'user',
      streak: 12,
      lastActiveDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }
  ],
  profiles: {
    'tayyaba-id': {
      age: 26,
      gender: 'Female',
      height: 165,
      weight: 67.5,
      goal: 'Weight Loss',
      activityLevel: 'Moderately Active',
      medicalConditions: 'None',
      allergies: 'None',
      foodPreferences: 'No seafood',
      workoutExperience: 'Intermediate',
      workoutDays: 4,
      workoutTime: 'Morning',
      equipment: 'Dumbbells, Mat',
      sleepHours: 8,
      waterIntake: 2000,
      stressLevel: 'Medium',
      targetWeight: 60.0
    }
  },
  waterLogs: [
    { id: 'w1', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], amount: 1750 }
  ],
  sleepLogs: [
    { id: 's1', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], hours: 7.5, quality: 'Good' }
  ],
  moodLogs: [
    { id: 'm1', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], score: 4, notes: 'Feeling focused and energized.' }
  ],
  journalEntries: [
    {
      id: 'j1',
      userId: 'tayyaba-id',
      date: new Date().toISOString().split('T')[0],
      title: 'A productive morning',
      content: 'Woke up early, drank some warm water, and completed an intense HIIT routine. Feeling accomplished and ready to face the day.',
      mood: 'Productive',
      gratitude: 'Grateful for good health and positive energy.'
    }
  ],
  mealLogs: [
    { id: 'me1', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], mealType: 'breakfast', name: 'Oats with Fruits', calories: 350, protein: 15, carbs: 55, fat: 8, fiber: 6 },
    { id: 'me2', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], mealType: 'lunch', name: 'Grilled Chicken Salad', calories: 400, protein: 35, carbs: 15, fat: 12, fiber: 4 },
    { id: 'me3', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], mealType: 'snack', name: 'Greek Yogurt & Nuts', calories: 150, protein: 12, carbs: 10, fat: 7, fiber: 2 },
    { id: 'me4', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], mealType: 'dinner', name: 'Salmon with Quinoa', calories: 300, protein: 28, carbs: 25, fat: 10, fiber: 3 }
  ],
  workoutLogs: [
    { id: 'wo1', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], name: 'HIIT Fat Burn', type: 'High Intensity', duration: 20, caloriesBurned: 250 },
    { id: 'wo2', userId: 'tayyaba-id', date: new Date().toISOString().split('T')[0], name: 'Yoga For Flexibility', type: 'Stretching', duration: 25, caloriesBurned: 180 }
  ],
  workoutPlans: [
    {
      id: 'p1',
      userId: 'tayyaba-id',
      title: 'HIIT Blast & Core Strength',
      goal: 'Weight Loss',
      exercises: [
        { name: 'Jump Squats', sets: 3, reps: 15, duration: 45, calories: 40, difficulty: 'Intermediate' },
        { name: 'Burpees', sets: 3, reps: 10, duration: 45, calories: 50, difficulty: 'Intermediate' },
        { name: 'Mountain Climbers', sets: 3, reps: 30, duration: 30, calories: 30, difficulty: 'Intermediate' },
        { name: 'Plank Hold', sets: 3, reps: 1, duration: 60, calories: 20, difficulty: 'Beginner' },
        { name: 'Bicycle Crunches', sets: 3, reps: 20, duration: 45, calories: 25, difficulty: 'Intermediate' }
      ],
      createdAt: new Date().toISOString()
    }
  ],
  dietPlans: [
    {
      id: 'dp1',
      userId: 'tayyaba-id',
      title: 'Low-Carb High-Protein Deficit Plan',
      meals: [
        { mealType: 'breakfast', name: 'Spinach & Mushroom Omelette', calories: 280, protein: 22, carbs: 6, fat: 18, fiber: 2, recipe: 'Whisk 3 egg whites and 1 whole egg. Sauté spinach and mushrooms. Pour eggs and cook until firm.', timing: '08:00 AM' },
        { mealType: 'lunch', name: 'Lemon Herb Grilled Chicken Breast', calories: 350, protein: 40, carbs: 8, fat: 14, fiber: 3, recipe: 'Marinate chicken breast in lemon juice, olive oil, oregano, garlic. Grill for 6-7 mins each side.', timing: '01:30 PM' },
        { mealType: 'snack', name: 'Mixed Berries with Chia Pudding', calories: 120, protein: 4, carbs: 12, fat: 5, fiber: 5, recipe: 'Soak 1 tbsp chia seeds in almond milk. Top with blueberries and raspberries.', timing: '04:30 PM' },
        { mealType: 'dinner', name: 'Baked Salmon with Steamed Asparagus', calories: 320, protein: 34, carbs: 5, fat: 16, fiber: 2, recipe: 'Season salmon fillet with salt, pepper, dill. Bake at 400°F for 12-15 mins. Serve with asparagus.', timing: '07:30 PM' }
      ],
      shoppingList: ['Eggs', 'Spinach', 'Mushrooms', 'Chicken Breast', 'Lemons', 'Chia Seeds', 'Almond Milk', 'Blueberries', 'Raspberries', 'Salmon Fillet', 'Asparagus'],
      createdAt: new Date().toISOString()
    }
  ],
  chatMessages: [
    { id: 'msg1', userId: 'tayyaba-id', sender: 'coach', text: 'Hi Tayyaba! 👋 I\'m your FitMind AI Wellness Coach. Your profile indicates you are working towards Weight Loss. How can I help you today?', timestamp: new Date().toISOString() }
  ],
  achievements: [
    { id: 'ach1', title: '10-Day Streak', description: 'Log activity for 10 consecutive days.', category: 'general', unlockedAt: new Date().toISOString(), icon: 'Flame' },
    { id: 'ach2', title: 'Water Champion', description: 'Met daily water target 5 days in a row.', category: 'water', unlockedAt: new Date().toISOString(), icon: 'Droplet' },
    { id: 'ach3', title: 'Zen Mind', description: 'Logged journal entries and practiced mental wellness.', category: 'mind', unlockedAt: new Date().toISOString(), icon: 'Brain' }
  ]
};

// Database helper functions
function migrateDb(dbData: any) {
  let changed = false;

  if (!dbData.dietPlans) {
    dbData.dietPlans = [];
    changed = true;
  }
  
  if (!dbData.workoutPlans) {
    dbData.workoutPlans = [];
    changed = true;
  }

  if (!dbData.dietChatMessages) {
    dbData.dietChatMessages = [];
    changed = true;
  }

  if (!dbData.workoutChatMessages) {
    dbData.workoutChatMessages = [];
    changed = true;
  }

  // Migrate diet plans with missing totalCalories/macros
  dbData.dietPlans.forEach((plan: any) => {
    if (plan.totalCalories === undefined || plan.totalCalories === null) {
      plan.totalCalories = 1850;
      changed = true;
    }
    if (!plan.macros) {
      plan.macros = { protein: 125, carbs: 190, fats: 60, fiber: 28 };
      changed = true;
    } else {
      if (plan.macros.fiber === undefined) {
        plan.macros.fiber = 25;
        changed = true;
      }
    }
    if (!plan.shoppingList) {
      plan.shoppingList = [];
      changed = true;
    }
    if (!plan.meals) {
      plan.meals = [];
      changed = true;
    }
  });

  // Migrate workout plans with legacy structures
  dbData.workoutPlans.forEach((plan: any) => {
    if (!plan.split) {
      plan.split = '3 Days Split';
      changed = true;
    }
    if (!plan.days) {
      if (plan.exercises && Array.isArray(plan.exercises)) {
        plan.days = [
          {
            day: 1,
            name: plan.title || 'Day 1: Upper / Core',
            exercises: plan.exercises.map((ex: any) => ({
              name: ex.name,
              targetMuscle: ex.targetMuscle || 'Full Body',
              sets: Number(ex.sets) || 3,
              reps: Number(ex.reps) || 12,
              rest: Number(ex.rest || ex.duration) || 60
            }))
          }
        ];
      } else {
        plan.days = [
          {
            day: 1,
            name: 'Day 1: Full Body',
            exercises: [
              { name: 'Dumbbell Squats', targetMuscle: 'Quads', sets: 4, reps: 12, rest: 90 },
              { name: 'Dumbbell Rows', targetMuscle: 'Back', sets: 4, reps: 10, rest: 90 },
              { name: 'Dumbbell Chest Press', targetMuscle: 'Chest', sets: 4, reps: 10, rest: 90 }
            ]
          }
        ];
      }
      changed = true;
    }
  });

  if (changed) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
    } catch (e) {
      console.error('Failed to write migrated database to disk:', e);
    }
  }
  return dbData;
}

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2));
      return migrateDb(JSON.parse(JSON.stringify(defaultDb)));
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return migrateDb(JSON.parse(data));
  } catch (error) {
    console.error('Error reading database:', error);
    return migrateDb(JSON.parse(JSON.stringify(defaultDb)));
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

// Initialize db if not present
readDb();

// Helper to get user by authorization header (simulating session)
function getAuthenticatedUser(req: express.Request, dbInstance: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  return dbInstance.users.find((u: any) => u.id === token || u.email === token);
}

// Initialize Gemini SDK lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'MOCK_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// ---------------------- API ROUTES ----------------------

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const dbData = readDb();
  if (dbData.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: 'Email already registered.' });
  }

  const newUser = {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email,
    password,
    name,
    onboarded: false,
    isPremium: false,
    role: 'user',
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };

  dbData.users.push(newUser);
  writeDb(dbData);

  res.json({ user: newUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const dbData = readDb();
  const user = dbData.users.find(
    (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Update streak if needed
  const todayStr = new Date().toISOString().split('T')[0];
  if (user.lastActiveDate !== todayStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (user.lastActiveDate === yesterdayStr) {
      user.streak += 1;
    } else if (user.lastActiveDate !== todayStr) {
      user.streak = 1;
    }
    user.lastActiveDate = todayStr;
    writeDb(dbData);
  }

  res.json({ user });
});

app.get('/api/auth/me', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  res.json({ user });
});

// Upgrade To Premium
app.post('/api/auth/upgrade', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const dbUser = dbData.users.find((u: any) => u.id === user.id);
  if (dbUser) {
    dbUser.isPremium = true;
    writeDb(dbData);
    return res.json({ user: dbUser });
  }
  res.status(404).json({ error: 'User not found.' });
});

// Profile / Onboarding
app.get('/api/profile', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  const profile = dbData.profiles[user.id] || null;
  res.json({ profile });
});

app.post('/api/profile', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  dbData.profiles[user.id] = { ...req.body };
  
  // Mark user as onboarded
  const dbUser = dbData.users.find((u: any) => u.id === user.id);
  if (dbUser) {
    dbUser.onboarded = true;
  }

  writeDb(dbData);
  res.json({ profile: dbData.profiles[user.id], user: dbUser });
});

// Water Logs
app.get('/api/logs/water', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const logs = dbData.waterLogs.filter((l: any) => l.userId === user.id);
  res.json({ logs });
});

app.post('/api/logs/water', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const { date, amount } = req.body; // amount is in ml
  const todayStr = date || new Date().toISOString().split('T')[0];

  // Find if log exists for that day, otherwise create
  let log = dbData.waterLogs.find((l: any) => l.userId === user.id && l.date === todayStr);
  if (log) {
    log.amount += amount;
  } else {
    log = {
      id: 'wat_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: todayStr,
      amount: amount
    };
    dbData.waterLogs.push(log);
  }

  writeDb(dbData);
  res.json({ log, logs: dbData.waterLogs.filter((l: any) => l.userId === user.id) });
});

// Sleep Logs
app.get('/api/logs/sleep', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const logs = dbData.sleepLogs.filter((l: any) => l.userId === user.id);
  res.json({ logs });
});

app.post('/api/logs/sleep', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const { date, hours, quality } = req.body;
  const todayStr = date || new Date().toISOString().split('T')[0];

  let log = dbData.sleepLogs.find((l: any) => l.userId === user.id && l.date === todayStr);
  if (log) {
    log.hours = hours;
    log.quality = quality;
  } else {
    log = {
      id: 'slp_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: todayStr,
      hours,
      quality
    };
    dbData.sleepLogs.push(log);
  }

  writeDb(dbData);
  res.json({ log, logs: dbData.sleepLogs.filter((l: any) => l.userId === user.id) });
});

// Mood & Journal Logs
app.get('/api/logs/mood-journal', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const moodLogs = dbData.moodLogs.filter((l: any) => l.userId === user.id);
  const journals = dbData.journalEntries.filter((l: any) => l.userId === user.id);
  res.json({ moodLogs, journals });
});

app.post('/api/logs/journal', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const { title, content, mood, gratitude, date, score } = req.body;
  const todayStr = date || new Date().toISOString().split('T')[0];

  // Create journal entry
  const journalId = 'jrn_' + Math.random().toString(36).substr(2, 9);
  const newJournal = {
    id: journalId,
    userId: user.id,
    date: todayStr,
    title: title || 'Daily Reflection',
    content,
    mood,
    gratitude
  };
  dbData.journalEntries.push(newJournal);

  // Create/update mood log
  let moodLog = dbData.moodLogs.find((l: any) => l.userId === user.id && l.date === todayStr);
  if (moodLog) {
    moodLog.score = score || 3;
    moodLog.notes = content ? content.substring(0, 100) : '';
  } else {
    moodLog = {
      id: 'mood_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: todayStr,
      score: score || 3,
      notes: content ? content.substring(0, 100) : ''
    };
    dbData.moodLogs.push(moodLog);
  }

  writeDb(dbData);
  res.json({
    journal: newJournal,
    moodLog,
    journals: dbData.journalEntries.filter((l: any) => l.userId === user.id),
    moodLogs: dbData.moodLogs.filter((l: any) => l.userId === user.id)
  });
});

// Meal Logs (Diet tracker)
app.get('/api/logs/meals', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const logs = dbData.mealLogs.filter((l: any) => l.userId === user.id);
  res.json({ logs });
});

app.post('/api/logs/meals', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const { mealType, name, calories, protein, carbs, fat, fiber, date } = req.body;
  const targetDate = date || new Date().toISOString().split('T')[0];

  const newMeal = {
    id: 'meal_' + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    date: targetDate,
    mealType,
    name,
    calories: Number(calories) || 0,
    protein: Number(protein) || 0,
    carbs: Number(carbs) || 0,
    fat: Number(fat) || 0,
    fiber: Number(fiber) || 0
  };

  dbData.mealLogs.push(newMeal);
  writeDb(dbData);

  res.json({ meal: newMeal, logs: dbData.mealLogs.filter((l: any) => l.userId === user.id) });
});

app.delete('/api/logs/meals/:id', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const mealIndex = dbData.mealLogs.findIndex((l: any) => l.id === req.params.id && l.userId === user.id);
  if (mealIndex > -1) {
    dbData.mealLogs.splice(mealIndex, 1);
    writeDb(dbData);
  }
  res.json({ success: true, logs: dbData.mealLogs.filter((l: any) => l.userId === user.id) });
});

// Workout Logs
app.get('/api/logs/workouts', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const logs = dbData.workoutLogs.filter((l: any) => l.userId === user.id);
  res.json({ logs });
});

app.post('/api/logs/workouts', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const { name, type, duration, caloriesBurned, date } = req.body;
  const targetDate = date || new Date().toISOString().split('T')[0];

  const newWorkoutLog = {
    id: 'wko_' + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    date: targetDate,
    name,
    type,
    duration: Number(duration) || 0,
    caloriesBurned: Number(caloriesBurned) || 0
  };

  dbData.workoutLogs.push(newWorkoutLog);
  writeDb(dbData);

  res.json({ workout: newWorkoutLog, logs: dbData.workoutLogs.filter((l: any) => l.userId === user.id) });
});

// Steps Logs
app.get('/api/logs/steps', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const logs = (dbData.stepLogs || []).filter((l: any) => l.userId === user.id);
  res.json({ logs });
});

app.post('/api/logs/steps', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const { date, steps } = req.body;
  const todayStr = date || new Date().toISOString().split('T')[0];

  if (!dbData.stepLogs) {
    dbData.stepLogs = [];
  }

  let log = dbData.stepLogs.find((l: any) => l.userId === user.id && l.date === todayStr);
  if (log) {
    log.steps += Number(steps) || 0;
  } else {
    log = {
      id: 'stp_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: todayStr,
      steps: Number(steps) || 0
    };
    dbData.stepLogs.push(log);
  }

  writeDb(dbData);
  res.json({ log, logs: dbData.stepLogs.filter((l: any) => l.userId === user.id) });
});

// Generate or Retrieve AI Diet Plan
app.get('/api/plans/diet', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

  const dietPlans = dbData.dietPlans.filter((p: any) => p.userId === user.id);
  const latestPlan = dietPlans.length > 0 ? dietPlans[dietPlans.length - 1] : null;
  res.json({ success: true, plan: latestPlan });
});

app.post(['/api/plans/diet', '/api/plans/diet/generate'], async (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

  let profile = dbData.profiles[user.id];
  if (!profile) {
    profile = {
      age: 26,
      gender: 'Female',
      height: 165,
      weight: 67.5,
      goal: 'Weight Loss',
      activityLevel: 'Moderately Active',
      medicalConditions: 'None',
      allergies: 'None',
      foodPreferences: 'None',
      workoutExperience: 'Intermediate',
      workoutDays: 3,
      workoutTime: 'Evening',
      equipment: 'Dumbbells',
      sleepHours: 8,
      waterIntake: 2000,
      stressLevel: 'Medium',
      targetWeight: 60
    };
    dbData.profiles[user.id] = profile;
    writeDb(dbData);
  }

  const customPrompt = req.body.prompt ? `User request: "${req.body.prompt}"` : '';

  const prompt = `Generate a customized 1-day meal/diet plan for a user with the following profile:
- Name: ${user.name}
- Age: ${profile.age}
- Gender: ${profile.gender}
- Height: ${profile.height} cm
- Weight: ${profile.weight} kg
- Target Weight: ${profile.targetWeight} kg
- Fitness Goal: ${profile.goal}
- Activity Level: ${profile.activityLevel}
- Dietary Preferences: ${profile.foodPreferences || 'None'}
- Allergies: ${profile.allergies || 'None'}
- Medical Conditions: ${profile.medicalConditions || 'None'}
${customPrompt}

Please provide exactly 4 meals: breakfast, lunch, snack, dinner. For each meal, include the mealType (one of: breakfast, lunch, snack, or dinner), the meal name, recipe preparation instructions, ingredients list as an array of strings, calories, protein (g), carbs (g), and fats (g). Also specify a totalCalories count and macros breakdown (protein, carbs, fats, fiber in g) for the day, and compile a comprehensive shopping list. Make sure the response perfectly matches the requested JSON schema.`;

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Descriptive title of the diet plan' },
            totalCalories: { type: Type.INTEGER, description: 'Total calorie budget' },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.INTEGER },
                carbs: { type: Type.INTEGER },
                fats: { type: Type.INTEGER },
                fiber: { type: Type.INTEGER }
              },
              required: ['protein', 'carbs', 'fats', 'fiber']
            },
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  mealType: { type: Type.STRING },
                  name: { type: Type.STRING },
                  recipe: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                  calories: { type: Type.INTEGER },
                  protein: { type: Type.INTEGER },
                  carbs: { type: Type.INTEGER },
                  fats: { type: Type.INTEGER }
                },
                required: ['mealType', 'name', 'recipe', 'ingredients', 'calories', 'protein', 'carbs', 'fats']
              }
            },
            shoppingList: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['title', 'totalCalories', 'macros', 'meals', 'shoppingList']
        }
      }
    });

    const parsedPlan = JSON.parse(response.text?.trim() || '{}');
    const newDietPlan = {
      id: 'dp_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      title: parsedPlan.title || `${profile.goal} Balanced Meal Plan`,
      totalCalories: Number(parsedPlan.totalCalories) || 1800,
      macros: parsedPlan.macros || { protein: 120, carbs: 180, fats: 55, fiber: 25 },
      meals: parsedPlan.meals || [],
      shoppingList: parsedPlan.shoppingList || [],
      createdAt: new Date().toISOString()
    };

    dbData.dietPlans.push(newDietPlan);
    writeDb(dbData);

    res.json({ success: true, plan: newDietPlan });
  } catch (error: any) {
    console.error('Gemini error generating diet plan:', error);
    // Fallback static plan so we NEVER return empty response or fail JSON parsing
    const fallbackPlan = {
      id: 'dp_fallback',
      userId: user.id,
      title: `${profile.goal} Balanced Meal Plan (Standard)`,
      totalCalories: 1850,
      macros: { protein: 125, carbs: 190, fats: 60, fiber: 28 },
      meals: [
        { mealType: 'breakfast', name: 'Spinach & Egg White Scramble', recipe: 'Scramble egg whites with baby spinach and a drop of olive oil.', ingredients: ['Egg whites', 'Spinach', 'Olive oil'], calories: 250, protein: 25, carbs: 5, fats: 8 },
        { mealType: 'lunch', name: 'Grilled Chicken Garden Salad', recipe: 'Slice grilled chicken breast over mixed greens, cucumbers, and tomatoes with lemon dressing.', ingredients: ['Chicken Breast', 'Mixed Greens', 'Cucumber', 'Tomato', 'Lemon'], calories: 420, protein: 45, carbs: 12, fats: 14 },
        { mealType: 'snack', name: 'Almonds and Berries', recipe: 'Enjoy a handful of raw almonds with fresh blueberries.', ingredients: ['Almonds', 'Blueberries'], calories: 180, protein: 6, carbs: 15, fats: 12 },
        { mealType: 'dinner', name: 'Baked Lemon Herb Salmon', recipe: 'Bake salmon fillet with dill and lemon. Serve alongside steamed asparagus.', ingredients: ['Salmon Fillet', 'Lemon', 'Asparagus'], calories: 480, protein: 38, carbs: 8, fats: 22 }
      ],
      shoppingList: ['Egg whites', 'Spinach', 'Chicken Breast', 'Mixed Greens', 'Blueberries', 'Almonds', 'Salmon Fillet', 'Asparagus'],
      createdAt: new Date().toISOString()
    };
    dbData.dietPlans.push(fallbackPlan);
    writeDb(dbData);
    res.json({ success: true, plan: fallbackPlan, warning: 'AI generation temporarily unavailable; using optimized standard plan.' });
  }
});

// Generate or Retrieve AI Workout Plan
app.get('/api/plans/workout', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

  const workoutPlans = dbData.workoutPlans.filter((p: any) => p.userId === user.id);
  const latestPlan = workoutPlans.length > 0 ? workoutPlans[workoutPlans.length - 1] : null;
  res.json({ success: true, plan: latestPlan });
});

app.post(['/api/plans/workout', '/api/plans/workout/generate'], async (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

  let profile = dbData.profiles[user.id];
  if (!profile) {
    profile = {
      age: 26,
      gender: 'Female',
      height: 165,
      weight: 67.5,
      goal: 'Weight Loss',
      activityLevel: 'Moderately Active',
      medicalConditions: 'None',
      allergies: 'None',
      foodPreferences: 'None',
      workoutExperience: 'Intermediate',
      workoutDays: 3,
      workoutTime: 'Evening',
      equipment: 'Dumbbells',
      sleepHours: 8,
      waterIntake: 2000,
      stressLevel: 'Medium',
      targetWeight: 60
    };
    dbData.profiles[user.id] = profile;
    writeDb(dbData);
  }

  const customPrompt = req.body.prompt ? `User request: "${req.body.prompt}"` : '';

  const prompt = `Generate a fully customized multi-day split workout routine for a user with the following profile:
- Name: ${user.name}
- Age: ${profile.age}
- Goal: ${profile.goal}
- Workout Experience: ${profile.workoutExperience}
- Available Equipment: ${profile.equipment || 'No equipment / Bodyweight'}
- Workout Days: ${profile.workoutDays || 3} days per week
- Medical Conditions: ${profile.medicalConditions || 'None'}
${customPrompt}

Please provide a split (e.g., "3 Days Split" or "4 Days Split" based on their workoutDays), and a 'days' array where each day contains a day number, a day name (e.g. "Upper Body Power", "Leg Day", "Push Day"), and an array of 4-5 specific exercises. For each exercise, specify its name, targetMuscle, sets, reps, and rest period in seconds. Make sure the response perfectly matches the requested JSON schema.`;

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Descriptive title of the workout plan' },
            goal: { type: Type.STRING },
            split: { type: Type.STRING, description: 'e.g. 3 Days Split' },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  name: { type: Type.STRING, description: 'Day theme/name' },
                  exercises: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        targetMuscle: { type: Type.STRING },
                        sets: { type: Type.INTEGER },
                        reps: { type: Type.INTEGER },
                        rest: { type: Type.INTEGER, description: 'Rest time in seconds' }
                      },
                      required: ['name', 'targetMuscle', 'sets', 'reps', 'rest']
                    }
                  }
                },
                required: ['day', 'name', 'exercises']
              }
            }
          },
          required: ['title', 'goal', 'split', 'days']
        }
      }
    });

    const parsedPlan = JSON.parse(response.text?.trim() || '{}');
    const newWorkoutPlan = {
      id: 'wp_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      title: parsedPlan.title || `${profile.goal} Action Workout Split`,
      goal: parsedPlan.goal || profile.goal,
      split: parsedPlan.split || `${profile.workoutDays || 3} Days Split`,
      days: parsedPlan.days || [],
      createdAt: new Date().toISOString()
    };

    dbData.workoutPlans.push(newWorkoutPlan);
    writeDb(dbData);

    res.json({ success: true, plan: newWorkoutPlan });
  } catch (error: any) {
    console.error('Gemini error generating workout plan:', error);
    // Fallback static plan so we NEVER return empty response or fail JSON parsing
    const fallbackPlan = {
      id: 'wp_fallback',
      userId: user.id,
      title: `${profile.goal} Functional Split (Standard)`,
      goal: profile.goal,
      split: '3 Days Split',
      days: [
        {
          day: 1,
          name: 'Day 1: Push & Upper Focus',
          exercises: [
            { name: 'Dumbbell Chest Press', targetMuscle: 'Chest', sets: 4, reps: 10, rest: 90 },
            { name: 'Dumbbell Shoulder Press', targetMuscle: 'Shoulders', sets: 3, reps: 12, rest: 60 },
            { name: 'Triceps Kickbacks', targetMuscle: 'Triceps', sets: 3, reps: 12, rest: 60 }
          ]
        },
        {
          day: 2,
          name: 'Day 2: Pull & Core Focus',
          exercises: [
            { name: 'Dumbbell Rows', targetMuscle: 'Back', sets: 4, reps: 10, rest: 90 },
            { name: 'Dumbbell Bicep Curls', targetMuscle: 'Biceps', sets: 3, reps: 12, rest: 60 },
            { name: 'Plank Hold', targetMuscle: 'Core', sets: 3, reps: 60, rest: 60 }
          ]
        },
        {
          day: 3,
          name: 'Day 3: Lower Body Power',
          exercises: [
            { name: 'Dumbbell Squats', targetMuscle: 'Quads', sets: 4, reps: 12, rest: 90 },
            { name: 'Dumbbell Romanian Deadlifts', targetMuscle: 'Hamstrings', sets: 3, reps: 12, rest: 90 },
            { name: 'Standing Calf Raises', targetMuscle: 'Calves', sets: 3, reps: 15, rest: 60 }
          ]
        }
      ],
      createdAt: new Date().toISOString()
    };
    dbData.workoutPlans.push(fallbackPlan);
    writeDb(dbData);
    res.json({ success: true, plan: fallbackPlan, warning: 'AI generation temporarily unavailable; using optimized standard split.' });
  }
});

// Mental Wellness Journal Log Endpoints
app.get('/api/logs/journals', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

  const logs = dbData.journalEntries
    .filter((j: any) => j.userId === user.id)
    .map((j: any) => ({
      id: j.id,
      moodScore: j.moodScore || 4,
      reflection: j.reflection || j.content || '',
      gratitude: j.gratitude || '',
      createdAt: j.createdAt || j.date || new Date().toISOString()
    }));

  res.json({ success: true, entries: logs });
});

app.post('/api/logs/journals', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

  const { moodScore, reflection, gratitude } = req.body;
  const todayStr = new Date().toISOString().split('T')[0];

  const newJournal = {
    id: 'jrn_' + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    date: todayStr,
    title: 'Daily Reflection',
    content: reflection || '',
    reflection: reflection || '',
    mood: String(moodScore || 4),
    moodScore: moodScore || 4,
    gratitude: gratitude || '',
    createdAt: new Date().toISOString()
  };
  dbData.journalEntries.push(newJournal);

  // Maintain standard mood log as well
  let moodLog = dbData.moodLogs.find((l: any) => l.userId === user.id && l.date === todayStr);
  if (moodLog) {
    moodLog.score = moodScore || 4;
    moodLog.notes = reflection ? reflection.substring(0, 100) : '';
  } else {
    moodLog = {
      id: 'mood_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: todayStr,
      score: moodScore || 4,
      notes: reflection ? reflection.substring(0, 100) : ''
    };
    dbData.moodLogs.push(moodLog);
  }

  writeDb(dbData);

  const logs = dbData.journalEntries
    .filter((j: any) => j.userId === user.id)
    .map((j: any) => ({
      id: j.id,
      moodScore: j.moodScore || 4,
      reflection: j.reflection || j.content || '',
      gratitude: j.gratitude || '',
      createdAt: j.createdAt || j.date || new Date().toISOString()
    }));

  res.json({
    success: true,
    entry: {
      id: newJournal.id,
      moodScore: newJournal.moodScore,
      reflection: newJournal.reflection,
      gratitude: newJournal.gratitude,
      createdAt: newJournal.createdAt
    },
    entries: logs
  });
});

// Update user settings profile endpoint
app.post('/api/profile/update-user', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required.' });
  }

  const u = dbData.users.find((x: any) => x.id === user.id);
  if (u) {
    u.name = name;
    u.email = email;
    writeDb(dbData);
    res.json({ success: true, user: { id: u.id, name: u.name, email: u.email, isPremium: u.isPremium, streak: u.streak, role: u.role, createdAt: u.createdAt } });
  } else {
    res.status(404).json({ success: false, error: 'User record not found.' });
  }
});

// Admin reset endpoint
app.post('/api/admin/reset', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user || user.role !== 'admin') {
    if (user?.id !== 'tayyaba-id') {
      return res.status(403).json({ error: 'Forbidden. Admin access required.' });
    }
  }

  // Rewrite database with seed values
  writeDb(defaultDb);
  res.json({ success: true, message: 'Database reset successfully to seeded defaults.' });
});

// AI Chatbot Coach
app.get('/api/coach/history', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const history = dbData.chatMessages.filter((m: any) => m.userId === user.id);
  res.json({ history });
});

app.post('/api/coach/chat', async (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required.' });

  // Save user's message
  const userMsg = {
    id: 'msg_' + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    sender: 'user' as const,
    text: message,
    timestamp: new Date().toISOString()
  };
  dbData.chatMessages.push(userMsg);

  // Fetch full context of user to inject in system prompt
  const profile = dbData.profiles[user.id] || {};
  const recentMeals = dbData.mealLogs.filter((m: any) => m.userId === user.id).slice(-10);
  const recentWorkouts = dbData.workoutLogs.filter((w: any) => w.userId === user.id).slice(-10);
  const recentWater = dbData.waterLogs.filter((w: any) => w.userId === user.id).slice(-5);
  const recentSleep = dbData.sleepLogs.filter((s: any) => s.userId === user.id).slice(-5);
  const recentMoods = dbData.moodLogs.filter((m: any) => m.userId === user.id).slice(-5);
  const recentJournals = dbData.journalEntries.filter((j: any) => j.userId === user.id).slice(-5);

  const contextPrompt = `You are the ultimate personalized AI Health & Fitness Coach named FitMind AI Coach.
You have access to the user's complete real-time data from the database. NEVER ask them again for details already stored below. Integrate these details in your suggestions naturally.

User Details:
- Name: ${user.name}
- Streak: ${user.streak} days active in a row
- Premium Status: ${user.isPremium ? 'PRO Member' : 'Free Tier'}
- Age: ${profile.age || 'N/A'}
- Gender: ${profile.gender || 'N/A'}
- Height: ${profile.height || 'N/A'} cm
- Weight: ${profile.weight || 'N/A'} kg
- Goal: ${profile.goal || 'N/A'}
- Target Weight: ${profile.targetWeight || 'N/A'} kg
- Activity Level: ${profile.activityLevel || 'N/A'}
- Medical Conditions: ${profile.medicalConditions || 'None'}
- Allergies: ${profile.allergies || 'None'}
- Food Preferences: ${profile.foodPreferences || 'None'}
- Workout Experience: ${profile.workoutExperience || 'N/A'}
- Available Equipment: ${profile.equipment || 'Bodyweight'}
- Workout Frequency: ${profile.workoutDays || 'N/A'} days/week
- Water Intake Goal: ${profile.waterIntake || 'N/A'} ml/day

Recent Activity Logs:
- Water: ${JSON.stringify(recentWater)}
- Sleep: ${JSON.stringify(recentSleep)}
- Meals Today: ${JSON.stringify(recentMeals)}
- Workouts: ${JSON.stringify(recentWorkouts)}
- Mood / Mind: ${JSON.stringify(recentMoods)}
- Journals: ${JSON.stringify(recentJournals)}

Keep your responses supportive, expert, and highly relevant. Calculate metric estimates (like BMI, BMR, daily caloric deficit/surplus goals) based on their real data if they ask. Always refer to them by their name (${user.name}). Respond in clean markdown formatting. Provide professional wellness, meal, stretching, breathing, yoga, or exercise guidance. Let's make today highly productive!`;

  try {
    const ai = getGeminiClient();
    const chatHistory = dbData.chatMessages
      .filter((m: any) => m.userId === user.id)
      .slice(-15) // take last 15 messages for short conversational context
      .map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

    // Generate content using standard ai.models.generateContent
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `System context: ${contextPrompt}` }] },
        ...chatHistory
      ],
      config: {
        temperature: 0.7
      }
    });

    const replyText = response.text || "I'm having a slight trouble connecting right now, but let's stay focused on your health goals!";

    const coachMsg = {
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      sender: 'coach' as const,
      text: replyText,
      timestamp: new Date().toISOString()
    };
    dbData.chatMessages.push(coachMsg);
    writeDb(dbData);

    res.json({ reply: coachMsg, history: dbData.chatMessages.filter((m: any) => m.userId === user.id) });
  } catch (error: any) {
    console.error('Gemini coach chat error:', error);
    res.status(500).json({ error: 'Coach failed to think: ' + error.message });
  }
});

// AI Diet Assistant Chat Endpoints
app.get('/api/chat/diet/history', (req, res) => {
  try {
    const dbData = readDb();
    const user = getAuthenticatedUser(req, dbData);
    if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

    const history = (dbData.dietChatMessages || []).filter((m: any) => m.userId === user.id);
    res.json({ success: true, history });
  } catch (err: any) {
    console.error('Diet chat history error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to load history' });
  }
});

app.post('/api/chat/diet', async (req, res) => {
  try {
    const dbData = readDb();
    const user = getAuthenticatedUser(req, dbData);
    if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required.' });

    if (!dbData.dietChatMessages) {
      dbData.dietChatMessages = [];
    }

    // Save user message
    const userMsg = {
      id: 'dmsg_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      sender: 'user' as const,
      text: message,
      timestamp: new Date().toISOString()
    };
    dbData.dietChatMessages.push(userMsg);

    // Fetch context
    const profile = dbData.profiles[user.id] || {};
    const latestPlan = dbData.dietPlans.filter((p: any) => p.userId === user.id).slice(-1)[0] || null;

    const contextPrompt = `You are the specialized AI Diet & Nutrition Assistant for FitMind AI.
Your target is to answer nutrition, clinical dietetics, recipe adjustments, calorie counts, and food-allergy questions.
Keep your tone encouraging, professional, and science-backed.

User Profile:
- Name: ${user.name}
- Goal: ${profile.goal || 'N/A'}
- Medical Conditions: ${profile.medicalConditions || 'None'}
- Allergies: ${profile.allergies || 'None'}
- Food Preferences: ${profile.foodPreferences || 'None'}

Current Active Diet Plan:
${latestPlan ? JSON.stringify({
  title: latestPlan.title,
  totalCalories: latestPlan.totalCalories,
  macros: latestPlan.macros,
  meals: latestPlan.meals.map((m: any) => ({ name: m.name, type: m.mealType, recipe: m.recipe, calories: m.calories, protein: m.protein, carbs: m.carbs, fats: m.fats }))
}) : 'No active diet plan generated yet.'}

Provide precise advice, calorie counts, or suggestions for substitutions. Refer to the user by their name (${user.name}). Respond in clear markdown format.`;

    const ai = getGeminiClient();
    const chatHistory = dbData.dietChatMessages
      .filter((m: any) => m.userId === user.id)
      .slice(-15)
      .map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `System context: ${contextPrompt}` }] },
        ...chatHistory
      ],
      config: {
        temperature: 0.7
      }
    });

    const replyText = response.text || "I'm having trouble thinking of diet recommendations right now. Let's keep focusing on healthy eating!";

    const coachMsg = {
      id: 'dmsg_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      sender: 'coach' as const,
      text: replyText,
      timestamp: new Date().toISOString()
    };
    dbData.dietChatMessages.push(coachMsg);
    writeDb(dbData);

    res.json({ success: true, reply: coachMsg, history: dbData.dietChatMessages.filter((m: any) => m.userId === user.id) });
  } catch (error: any) {
    console.error('Gemini diet chat error:', error);
    res.status(500).json({ success: false, error: 'Diet Assistant failed to respond: ' + error.message });
  }
});

// AI Workout Coach Chat Endpoints
app.get('/api/chat/workout/history', (req, res) => {
  try {
    const dbData = readDb();
    const user = getAuthenticatedUser(req, dbData);
    if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

    const history = (dbData.workoutChatMessages || []).filter((m: any) => m.userId === user.id);
    res.json({ success: true, history });
  } catch (err: any) {
    console.error('Workout chat history error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to load history' });
  }
});

app.post('/api/chat/workout', async (req, res) => {
  try {
    const dbData = readDb();
    const user = getAuthenticatedUser(req, dbData);
    if (!user) return res.status(401).json({ success: false, error: 'Unauthorized.' });

    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required.' });

    if (!dbData.workoutChatMessages) {
      dbData.workoutChatMessages = [];
    }

    // Save user message
    const userMsg = {
      id: 'wmsg_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      sender: 'user' as const,
      text: message,
      timestamp: new Date().toISOString()
    };
    dbData.workoutChatMessages.push(userMsg);

    // Fetch context
    const profile = dbData.profiles[user.id] || {};
    const latestPlan = dbData.workoutPlans.filter((p: any) => p.userId === user.id).slice(-1)[0] || null;
    const historyLogs = dbData.workoutLogs.filter((w: any) => w.userId === user.id).slice(-10);

    const contextPrompt = `You are the specialized AI Workout & Physical Coaching Assistant for FitMind AI.
Your target is to answer fitness routines, progressions, correct form, stretching, muscle soreness, bodyweight progressions, and equipment-specific exercises.
Keep your tone motivating, professional, and posture-safe.

User Profile:
- Name: ${user.name}
- Goal: ${profile.goal || 'N/A'}
- Experience Level: ${profile.workoutExperience || 'Intermediate'}
- Available Equipment: ${profile.equipment || 'No equipment / Bodyweight'}
- Medical Conditions / Limitations: ${profile.medicalConditions || 'None'}

Current Workout Split:
${latestPlan ? JSON.stringify({
  title: latestPlan.title,
  split: latestPlan.split,
  days: latestPlan.days.map((d: any) => ({ name: d.name, day: d.day, exercises: d.exercises }))
}) : 'No active workout routine compiled yet.'}

Recent Workout History:
${JSON.stringify(historyLogs)}

Provide clear exercises, tips on breathing, repetitions, or physical adjustments. Refer to the user by their name (${user.name}). Respond in clean markdown format.`;

    const ai = getGeminiClient();
    const chatHistory = dbData.workoutChatMessages
      .filter((m: any) => m.userId === user.id)
      .slice(-15)
      .map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `System context: ${contextPrompt}` }] },
        ...chatHistory
      ],
      config: {
        temperature: 0.7
      }
    });

    const replyText = response.text || "I'm having a slight delay thinking of exercise progressions. Let's make sure we keep moving safely!";

    const coachMsg = {
      id: 'wmsg_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      sender: 'coach' as const,
      text: replyText,
      timestamp: new Date().toISOString()
    };
    dbData.workoutChatMessages.push(coachMsg);
    writeDb(dbData);

    res.json({ success: true, reply: coachMsg, history: dbData.workoutChatMessages.filter((m: any) => m.userId === user.id) });
  } catch (error: any) {
    console.error('Gemini workout chat error:', error);
    res.status(500).json({ success: false, error: 'Workout Assistant failed to respond: ' + error.message });
  }
});

// Admin Panel endpoints
app.get('/api/admin/stats', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user || user.role !== 'admin') {
    // For local convenience, let the first user access if needed or check role
    // Let's grant read access to Tayyaba too so they can demo the Admin page!
    if (user?.id !== 'tayyaba-id') {
      return res.status(403).json({ error: 'Forbidden. Admin access required.' });
    }
  }

  const totalUsers = dbData.users.length;
  const premiumUsers = dbData.users.filter((u: any) => u.isPremium).length;
  const totalWorkouts = dbData.workoutLogs.length;
  const totalWater = dbData.waterLogs.reduce((sum: number, w: any) => sum + w.amount, 0);
  const totalJournals = dbData.journalEntries.length;
  const totalSessions = (dbData.chatMessages || []).length + (dbData.dietChatMessages || []).length + (dbData.workoutChatMessages || []).length;
  const totalKcalBurned = (dbData.workoutLogs || []).reduce((sum: number, w: any) => sum + Number(w.caloriesBurned || 0), 0);
  const users = dbData.users.map((u: any) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    isPremium: u.isPremium,
    streak: u.streak,
    role: u.role,
    createdAt: u.createdAt,
    profile: dbData.profiles[u.id] || {}
  }));

  res.json({
    stats: {
      totalUsers,
      premiumUsers,
      totalWorkouts,
      totalWater,
      totalJournals,
      totalSessions,
      totalKcalBurned,
      users
    }
  });
});

// Get all application statistics (relational count for user metrics)
app.get('/api/dashboard/stats', (req, res) => {
  const dbData = readDb();
  const user = getAuthenticatedUser(req, dbData);
  if (!user) return res.status(401).json({ error: 'Unauthorized.' });

  const userId = user.id;
  const todayStr = new Date().toISOString().split('T')[0];

  const profile = dbData.profiles[userId] || {
    age: 25, gender: 'Male', height: 175, weight: 70, goal: 'Maintain Weight', activityLevel: 'Moderately Active',
    workoutDays: 3, waterIntake: 2000, targetWeight: 70, sleepHours: 8
  };

  const waterToday = dbData.waterLogs
    .filter((w: any) => w.userId === userId && w.date === todayStr)
    .reduce((sum: number, w: any) => sum + w.amount, 0);

  if (!dbData.stepLogs) {
    dbData.stepLogs = [];
  }
  let stepsTodayObj = dbData.stepLogs.find((s: any) => s.userId === userId && s.date === todayStr);
  if (!stepsTodayObj && userId === 'tayyaba-id') {
    stepsTodayObj = {
      id: 'st_seed',
      userId: 'tayyaba-id',
      date: todayStr,
      steps: 8456
    };
    dbData.stepLogs.push(stepsTodayObj);
    writeDb(dbData);
  }
  const stepsToday = stepsTodayObj ? stepsTodayObj.steps : 0;

  const sleepTodayObj = dbData.sleepLogs.find((s: any) => s.userId === userId && s.date === todayStr);
  const sleepToday = sleepTodayObj ? sleepTodayObj.hours : 0;
  const sleepQualityToday = sleepTodayObj ? sleepTodayObj.quality : 'Good';

  const mealsToday = dbData.mealLogs.filter((m: any) => m.userId === userId && m.date === todayStr);
  const caloriesToday = mealsToday.reduce((sum: number, m: any) => sum + m.calories, 0);
  const proteinToday = mealsToday.reduce((sum: number, m: any) => sum + m.protein, 0);
  const carbsToday = mealsToday.reduce((sum: number, m: any) => sum + m.carbs, 0);
  const fatToday = mealsToday.reduce((sum: number, m: any) => sum + m.fat, 0);
  const fiberToday = mealsToday.reduce((sum: number, m: any) => sum + m.fiber, 0);

  const workoutsToday = dbData.workoutLogs.filter((w: any) => w.userId === userId && w.date === todayStr);
  const caloriesBurnedToday = workoutsToday.reduce((sum: number, w: any) => sum + w.caloriesBurned, 0);
  const activeMinutesToday = workoutsToday.reduce((sum: number, w: any) => sum + w.duration, 0);

  const moodTodayObj = dbData.moodLogs.find((m: any) => m.userId === userId && m.date === todayStr);
  const moodToday = moodTodayObj ? moodTodayObj.score : 4;

  // Let's compute some target budget values
  // Simple Harris-Benedict BMR equation
  let bmr = 1500;
  if (profile.gender === 'Female') {
    bmr = 655.1 + (9.563 * profile.weight) + (1.85 * profile.height) - (4.676 * profile.age);
  } else {
    bmr = 66.47 + (13.75 * profile.weight) + (5.003 * profile.height) - (6.755 * profile.age);
  }

  // Active energy TDEE factor
  let tdeeFactor = 1.375; // Moderately Active default
  if (profile.activityLevel === 'Sedentary') tdeeFactor = 1.2;
  if (profile.activityLevel === 'Lightly Active') tdeeFactor = 1.375;
  if (profile.activityLevel === 'Moderately Active') tdeeFactor = 1.55;
  if (profile.activityLevel === 'Very Active') tdeeFactor = 1.725;
  
  const targetTdee = bmr * tdeeFactor;
  let calorieTarget = targetTdee;
  if (profile.goal === 'Weight Loss') calorieTarget = targetTdee - 500;
  if (profile.goal === 'Weight Gain') calorieTarget = targetTdee + 400;
  if (profile.goal === 'Muscle Gain') calorieTarget = targetTdee + 200;

  // Round up targets
  const roundedCalorieTarget = Math.round(calorieTarget);
  const targetProtein = Math.round(profile.weight * (profile.goal === 'Muscle Gain' ? 2.0 : 1.5));
  const targetCarbs = Math.round((roundedCalorieTarget * 0.45) / 4);
  const targetFat = Math.round((roundedCalorieTarget * 0.25) / 9);

  // Return formatted stats payload
  res.json({
    summary: {
      calories: caloriesToday,
      calorieTarget: roundedCalorieTarget,
      protein: proteinToday,
      proteinTarget: targetProtein,
      carbs: carbsToday,
      carbsTarget: targetCarbs,
      fat: fatToday,
      fatTarget: targetFat,
      fiber: fiberToday,
      water: waterToday,
      waterTarget: profile.waterIntake || 2000,
      steps: stepsToday,
      stepsTarget: profile.stepsTarget || 10000,
      sleep: sleepToday,
      sleepTarget: profile.sleepHours || 8,
      sleepQuality: sleepQualityToday,
      activeMinutes: activeMinutesToday,
      caloriesBurned: caloriesBurnedToday,
      weight: profile.weight,
      targetWeight: profile.targetWeight,
      bmi: Number((profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)),
      mood: moodToday,
      streak: user.streak,
      isPremium: user.isPremium
    },
    profile
  });
});

// ---------------------- VITE MIDDLEWARE SETUP ----------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FitMind AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
