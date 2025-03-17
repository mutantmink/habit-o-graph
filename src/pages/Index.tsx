
import HabitDashboard from '@/components/HabitDashboard';
import { Calendar, Sparkles } from 'lucide-react';
import React from 'react';

const Index = () => {
  // Get current time of day for personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white flex flex-col relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-blue-200 opacity-30 rotate-12">
        <Sparkles size={120} />
      </div>
      <div className="absolute bottom-10 left-10 text-indigo-200 opacity-20 -rotate-12">
        <Calendar size={100} />
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Personal greeting header */}
      <div className="w-full max-w-5xl mx-auto px-4 pt-10 pb-4 text-left">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
          {getGreeting()}, <span className="text-blue-600 font-semibold">friend</span> ✨
        </h2>
        <p className="text-gray-500 mt-1">Let's track your progress and build great habits today!</p>
      </div>
      
      <HabitDashboard />
    </div>
  );
};

export default Index;
