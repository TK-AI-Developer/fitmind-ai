import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WellnessProvider, useWellness } from './context/WellnessContext';
import HeroLandingPage from './components/HeroLandingPage';
import AppTransitionLoader from './components/AppTransitionLoader';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import RightAICoachPanel from './components/RightAICoachPanel';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import DietPlanner from './components/DietPlanner';
import WorkoutPlanner from './components/WorkoutPlanner';
import ExerciseTimer from './components/ExerciseTimer';
import MentalWellness from './components/MentalWellness';
import ProgressPage from './components/ProgressPage';
import WaterTrackerPage from './components/WaterTrackerPage';
import SleepTrackerPage from './components/SleepTrackerPage';
import RecipesPage from './components/RecipesPage';
import CommunityPage from './components/CommunityPage';
import BlogPage from './components/BlogPage';
import Settings from './components/Settings';
import UpgradeModal from './components/UpgradeModal';
import AuthModal from './components/AuthModal';

function MainAppShell() {
  const { activeTab } = useWellness();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#F7F8FC] text-gray-900 flex flex-col font-sans selection:bg-purple-600/20 selection:text-purple-900 antialiased overflow-x-hidden"
    >
      {/* App Container */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Desktop Sidebar (Left) with Slide-in Entrance */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="hidden lg:block h-full shrink-0"
        >
          <Sidebar />
        </motion.div>

        {/* Mobile Sidebar Overlay Drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative z-10 h-full"
              >
                <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Center Main Dashboard & Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-[#F7F8FC]">
          
          {/* Top Navbar with Fade-Down Entrance */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <TopNavbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />
          </motion.div>

          {/* Primary View Scrollable Canvas with Staggered Fade */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'ai-coach' && <AICoach />}
                {activeTab === 'diet-planner' && <DietPlanner />}
                {activeTab === 'workout-tracker' && <WorkoutPlanner />}
                {activeTab === 'timer-exercises' && <ExerciseTimer />}
                {activeTab === 'progress' && <ProgressPage />}
                {activeTab === 'mental-wellness' && <MentalWellness />}
                {activeTab === 'water-tracker' && <WaterTrackerPage />}
                {activeTab === 'sleep-tracker' && <SleepTrackerPage />}
                {activeTab === 'community' && <CommunityPage />}
                {activeTab === 'recipes' && <RecipesPage />}
                {activeTab === 'blog' && <BlogPage />}
                {activeTab === 'settings' && <Settings />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Right AI Coach Assistant Panel with Slide-in from Right */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
          className="hidden xl:block h-full shrink-0"
        >
          <RightAICoachPanel />
        </motion.div>

      </div>

      {/* Global Modals */}
      <UpgradeModal />
      <AuthModal />
    </motion.div>
  );
}

function AppContent() {
  const { hasStartedApp, isTransitioning } = useWellness();

  return (
    <div className="relative min-h-screen bg-[#0C081A]">
      <AnimatePresence mode="wait">
        {/* State 1: App Transition Loader */}
        {isTransitioning && (
          <AppTransitionLoader key="transition-loader" />
        )}

        {/* State 2: Full Dashboard Application */}
        {hasStartedApp && !isTransitioning && (
          <MainAppShell key="main-app" />
        )}

        {/* State 3: Hero Landing Page (Initial Screen) */}
        {!hasStartedApp && !isTransitioning && (
          <motion.div
            key="hero-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
          >
            <HeroLandingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <WellnessProvider>
      <AppContent />
    </WellnessProvider>
  );
}
