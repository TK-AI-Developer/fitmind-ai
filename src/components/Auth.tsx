import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Shield, ArrowRight, ArrowLeft, Heart, Dumbbell, Activity, Compass, Info, Check } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (user: any) => void;
  onProfileSuccess: (user: any, profile: any) => void;
}

export default function Auth({ onAuthSuccess, onProfileSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Onboarding Wizard State
  const [onboardingUser, setOnboardingUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState('Female');
  const [height, setHeight] = useState<number>(165);
  const [weight, setWeight] = useState<number>(65);
  const [targetWeight, setTargetWeight] = useState<number>(60);
  const [goal, setGoal] = useState<'Weight Loss' | 'Weight Gain' | 'Muscle Gain' | 'Maintain Weight'>('Weight Loss');
  const [activityLevel, setActivityLevel] = useState<'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active'>('Moderately Active');
  const [medicalConditions, setMedicalConditions] = useState('None');
  const [allergies, setAllergies] = useState('None');
  const [foodPreferences, setFoodPreferences] = useState('Balanced');
  const [workoutExperience, setWorkoutExperience] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [workoutDays, setWorkoutDays] = useState<number>(4);
  const [workoutTime, setWorkoutTime] = useState('Morning');
  const [equipment, setEquipment] = useState('Dumbbells, Yoga Mat');
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [waterIntake, setWaterIntake] = useState<number>(2000);
  const [stressLevel, setStressLevel] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isLogin) {
        onAuthSuccess(data.user);
      } else {
        // Successful registration, start onboarding
        setOnboardingUser(data.user);
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingSubmit = async () => {
    if (!onboardingUser) return;
    setLoading(true);
    setError('');

    const profileData = {
      age,
      gender,
      height,
      weight,
      goal,
      activityLevel,
      medicalConditions,
      allergies,
      foodPreferences,
      workoutExperience,
      workoutDays,
      workoutTime,
      equipment,
      sleepHours,
      waterIntake,
      stressLevel,
      targetWeight,
    };

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${onboardingUser.id}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      onProfileSuccess(data.user, data.profile);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Onboarding Steps Render
  const renderOnboardingStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-500/15 rounded-lg text-purple-400">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold font-display text-white">Basic Body Diagnostics</h3>
            </div>
            <p className="text-sm text-gray-400">Let's record your vital dimensions to construct accurate metric targets.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                  min="1"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Target Weight (kg)</label>
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-5 rounded-lg flex items-center space-x-2 text-sm font-semibold transition"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-500/15 rounded-lg text-blue-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold font-display text-white">Fitness & Core Goals</h3>
            </div>
            <p className="text-sm text-gray-400">Tell us what you want to achieve so we can target your calorie budgets and training volumes.</p>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Core Health Goal</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Weight Loss', 'Weight Gain', 'Muscle Gain', 'Maintain Weight'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`p-3 rounded-lg text-sm border text-left transition ${
                      goal === g
                        ? 'border-purple-500 bg-purple-500/10 text-purple-200'
                        : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-gray-400'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Lifestyle Activity Level</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'] as const).map((act) => (
                  <button
                    key={act}
                    onClick={() => setActivityLevel(act)}
                    className={`p-3 rounded-lg text-sm border text-left transition ${
                      activityLevel === act
                        ? 'border-purple-500 bg-purple-500/10 text-purple-200'
                        : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-gray-400'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-5 rounded-lg flex items-center space-x-2 text-sm font-semibold transition"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-emerald-500/15 rounded-lg text-emerald-400">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold font-display text-white">Workout Experience</h3>
            </div>
            <p className="text-sm text-gray-400">Configure your optimal training load, available tools, and timing.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Experience Level</label>
                <select
                  value={workoutExperience}
                  onChange={(e: any) => setWorkoutExperience(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Training Frequency</label>
                <select
                  value={workoutDays}
                  onChange={(e) => setWorkoutDays(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                >
                  <option value={2}>2 Days / Week</option>
                  <option value={3}>3 Days / Week</option>
                  <option value={4}>4 Days / Week</option>
                  <option value={5}>5 Days / Week</option>
                  <option value={6}>6 Days / Week</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Preferred Time</label>
                <select
                  value={workoutTime}
                  onChange={(e) => setWorkoutTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Water Goal (ml)</label>
                <input
                  type="number"
                  value={waterIntake}
                  onChange={(e) => setWaterIntake(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                  step="250"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Equipment Available</label>
              <input
                type="text"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                placeholder="e.g. Dumbbells, Kettlebells, Yoga Mat, None"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-5 rounded-lg flex items-center space-x-2 text-sm font-semibold transition"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-orange-500/15 rounded-lg text-orange-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold font-display text-white">Dietary & Health Profile</h3>
            </div>
            <p className="text-sm text-gray-400">Fine-tune your safety thresholds, allergies, and nutrition preferences.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Allergies</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Nuts, Dairy, None"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Diet Style</label>
                <input
                  type="text"
                  value={foodPreferences}
                  onChange={(e) => setFoodPreferences(e.target.value)}
                  placeholder="e.g. Vegetarian, Keto, Balanced"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Medical Conditions</label>
              <input
                type="text"
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
                placeholder="e.g. Hypertension, Asthma, None"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Sleep Target (Hours)</label>
                <input
                  type="number"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Stress Threshold</label>
                <select
                  value={stressLevel}
                  onChange={(e: any) => setStressLevel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleOnboardingSubmit}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-6 rounded-lg flex items-center space-x-2 text-sm font-semibold transition disabled:opacity-50"
              >
                {loading ? (
                  <span>Initializing...</span>
                ) : (
                  <>
                    <span>Finish Setup</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (onboardingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-slate-950/60 backdrop-blur-xl border border-slate-850 p-8 rounded-2xl shadow-2xl text-center space-y-6">
          <div className="inline-flex p-3 bg-purple-500/10 rounded-2xl text-purple-400 mb-2 border border-purple-500/20">
            <Shield className="w-8 h-8" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold font-display text-white tracking-tight">Onboarding Diagnostic</h2>
            <p className="text-gray-400 text-sm mt-1">Configure your personalized FitMind profile (Step {step} of 4)</p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center space-x-2 my-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === i ? 'w-8 bg-purple-500' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {renderOnboardingStep()}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-950/60 backdrop-blur-xl border border-slate-850 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center">
          <div className="inline-flex p-3 bg-purple-500/10 rounded-2xl text-purple-400 mb-3 border border-purple-500/20">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {isLogin ? 'Access your personalized FitMind platform' : 'Start your health journey powered by AI'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-800 bg-slate-900 text-purple-600 focus:ring-0" defaultChecked />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-purple-400 hover:text-purple-300 transition font-medium">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center space-x-2 transition shadow-lg shadow-purple-900/20 active:translate-y-[1px] disabled:opacity-50"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative flex py-2 items-center text-xs text-gray-600">
          <div className="flex-grow border-t border-slate-900"></div>
          <span className="mx-4 text-gray-500 uppercase tracking-widest font-mono">or continue with</span>
          <div className="flex-grow border-t border-slate-900"></div>
        </div>

        <button
          onClick={() => {
            // Demo direct fast login as Tayyaba
            setEmail('ktayyiba374@gmail.com');
            setPassword('password123');
            setIsLogin(true);
          }}
          className="w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-gray-200 py-2.5 rounded-lg flex items-center justify-center space-x-2.5 text-sm font-semibold transition"
        >
          <span>Demo Account: Tayyaba</span>
        </button>

        <p className="text-center text-xs text-gray-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-purple-400 hover:text-purple-300 font-semibold underline transition ml-1"
          >
            {isLogin ? 'Sign up free' : 'Sign in instead'}
          </button>
        </p>
      </div>
    </div>
  );
}
