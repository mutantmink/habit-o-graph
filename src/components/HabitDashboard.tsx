
import React, { useState, useEffect } from 'react';
import { defaultHabits, Habit, HabitData, generateSampleData } from '@/utils/habitUtils';
import { formatDateKey, getTodayKey, getDateRangeString, getContributionDays } from '@/utils/dateUtils';
import ContributionGraph from './ContributionGraph';
import HabitList from './HabitList';
import HabitForm from './HabitForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart2, TrendingUp } from 'lucide-react';

const HabitDashboard: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitData, setHabitData] = useState<HabitData>({});
  const isMobile = useIsMobile();
  
  // Initialize with sample data
  useEffect(() => {
    setHabits(defaultHabits);
    setHabitData(generateSampleData());
  }, []);
  
  // Handle toggling a habit for today
  const handleToggleHabit = (habitId: string, level: number) => {
    const todayKey = getTodayKey();
    
    setHabitData(prevData => ({
      ...prevData,
      [habitId]: {
        ...prevData[habitId],
        [todayKey]: level
      }
    }));
  };
  
  // Handle adding a new habit
  const handleAddHabit = (habit: Habit) => {
    setHabits(prevHabits => [...prevHabits, habit]);
    setHabitData(prevData => ({
      ...prevData,
      [habit.id]: {}
    }));
  };
  
  // Get date range string for the contribution graph
  const contributionDays = getContributionDays();
  const dateRangeString = getDateRangeString(contributionDays);
  
  // Calculate total contributions
  const totalContributions = Object.values(habitData).reduce((total, habitEntries) => {
    return total + Object.values(habitEntries).filter(level => level > 0).length;
  }, 0);

  // Calculate streak days (consecutive days with at least one habit)
  const calculateCurrentStreak = () => {
    const today = new Date();
    let currentDate = new Date(today);
    let streak = 0;
    
    while (true) {
      const dateKey = formatDateKey(currentDate);
      const hasActivity = Object.values(habitData).some(habit => habit[dateKey] && habit[dateKey] > 0);
      
      if (!hasActivity) break;
      
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const currentStreak = calculateCurrentStreak();
  
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Habit Dashboard</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Track your daily habits with a simple, visual interface. Build consistency and see your progress over time.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 slide-up" style={{ animationDelay: '0.1s' }}>
        <Card className="bg-white/90 backdrop-blur-sm border-purple-100 shadow-md">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Habits</p>
            <p className="text-3xl font-bold text-purple-600">{habits.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-sm border-purple-100 shadow-md">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Contributions</p>
            <p className="text-3xl font-bold text-purple-600">{totalContributions}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-sm border-purple-100 shadow-md">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-purple-600">{currentStreak} days</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-sm border-purple-100 shadow-md">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Year View</p>
            <p className="text-3xl font-bold text-purple-600">{new Date().getFullYear()}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Habit tracking section */}
        <div className="lg:col-span-1 order-2 lg:order-1 grid gap-6">
          {/* Add habit form */}
          <div className="slide-up" style={{ animationDelay: '0.2s' }}>
            <HabitForm onAddHabit={handleAddHabit} />
          </div>
          
          {/* Today's habits */}
          <Card className="overflow-hidden slide-up bg-white/90 backdrop-blur-sm border-purple-100 shadow-md" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-0 space-y-0">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Today's Habits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <HabitList 
                habits={habits} 
                habitData={habitData} 
                onToggleHabit={handleToggleHabit} 
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Contribution graph section */}
        <Card className="lg:col-span-2 order-1 lg:order-2 slide-up bg-white/90 backdrop-blur-sm border-purple-100 shadow-md" style={{ animationDelay: '0.15s' }}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-purple-500" />
                <CardTitle>Activity Overview</CardTitle>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                <span className="text-xs text-purple-700 font-medium">{dateRangeString}</span>
              </div>
            </div>
            <CardDescription className="text-gray-500">
              {totalContributions} contributions • {currentStreak} day{currentStreak !== 1 ? 's' : ''} streak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionGraph 
              habitData={habitData}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HabitDashboard;
