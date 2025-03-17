import React, { useState, useEffect } from 'react';
import { defaultHabits, Habit, HabitData, generateSampleData } from '@/utils/habitUtils';
import { formatDateKey, getTodayKey, getDateRangeString, getContributionDays } from '@/utils/dateUtils';
import ContributionGraph from './ContributionGraph';
import HabitList from './HabitList';
import HabitForm from './HabitForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart2, TrendingUp, Smile, Coffee, Heart, Star, Flame } from 'lucide-react';

const HabitDashboard: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitData, setHabitData] = useState<HabitData>({});
  const [selectedHabitId, setSelectedHabitId] = useState<string | undefined>();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setHabits(defaultHabits);
    setHabitData(generateSampleData());
  }, []);
  
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
  
  const handleSelectHabit = (habitId: string) => {
    setSelectedHabitId(selectedHabitId === habitId ? undefined : habitId);
  };
  
  const handleClearSelectedHabit = () => {
    setSelectedHabitId(undefined);
  };
  
  const handleAddHabit = (habit: Habit) => {
    setHabits(prevHabits => [...prevHabits, habit]);
    setHabitData(prevData => ({
      ...prevData,
      [habit.id]: {}
    }));
  };
  
  const contributionDays = getContributionDays();
  const dateRangeString = getDateRangeString(contributionDays);
  
  const totalContributions = Object.values(habitData).reduce((total, habitEntries) => {
    return total + Object.values(habitEntries).filter(level => level > 0).length;
  }, 0);

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
  
  const getMotivationalQuote = () => {
    const quotes = [
      "Every day is a new beginning!",
      "Small steps, big changes ✨",
      "You're doing great - keep it up!",
      "Consistency is your superpower",
      "Progress over perfection 💪"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 fade-in">      
      <div className="mb-6 text-center">
        <p className="text-sm font-medium text-blue-600 bg-blue-50 inline-block py-2 px-4 rounded-full shadow-sm border border-blue-100">
          {getMotivationalQuote()}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 slide-up" style={{ animationDelay: '0.1s' }}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Smile className="h-8 w-8 text-blue-400 mb-2" />
            <p className="text-sm font-medium text-blue-900 mb-1">My Habits</p>
            <p className="text-3xl font-bold text-blue-600">{habits.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Star className="h-8 w-8 text-emerald-400 mb-2" />
            <p className="text-sm font-medium text-emerald-900 mb-1">Completed</p>
            <p className="text-3xl font-bold text-emerald-600">{totalContributions}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-orange-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Flame className="h-8 w-8 text-amber-400 mb-2" />
            <p className="text-sm font-medium text-amber-900 mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-amber-600">{currentStreak} days</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-pink-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Heart className="h-8 w-8 text-pink-400 mb-2" />
            <p className="text-sm font-medium text-pink-900 mb-1">This Year</p>
            <p className="text-3xl font-bold text-pink-600">{new Date().getFullYear()}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 order-2 lg:order-1 grid gap-6">
          <div className="slide-up" style={{ animationDelay: '0.2s' }}>
            <HabitForm onAddHabit={handleAddHabit} />
          </div>
          
          <Card className="overflow-hidden slide-up bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm border-blue-100 shadow-md rounded-2xl" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-0 space-y-0">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Coffee className="h-5 w-5 text-blue-500" />
                Today's Habits
              </CardTitle>
              <CardDescription className="text-blue-600/70">
                Click on a habit to see its activity
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <HabitList 
                habits={habits} 
                habitData={habitData} 
                onToggleHabit={handleToggleHabit}
                onSelectHabit={handleSelectHabit}
                selectedHabitId={selectedHabitId}
              />
            </CardContent>
          </Card>
        </div>
        
        <Card className="lg:col-span-2 order-1 lg:order-2 slide-up bg-gradient-to-br from-white to-indigo-50 backdrop-blur-sm border-indigo-100 shadow-md rounded-2xl" style={{ animationDelay: '0.15s' }}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-indigo-800">My Progress</CardTitle>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 border border-indigo-100">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                <span className="text-xs text-indigo-700 font-medium">{dateRangeString}</span>
              </div>
            </div>
            <CardDescription className="text-indigo-600/70">
              {selectedHabitId ? 
                `Showing activity for ${habits.find(h => h.id === selectedHabitId)?.name}` : 
                `${totalContributions} contributions • ${currentStreak} day${currentStreak !== 1 ? 's' : ''} streak`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionGraph 
              habitData={habitData}
              selectedHabitId={selectedHabitId}
              habits={habits}
              onClearSelectedHabit={handleClearSelectedHabit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HabitDashboard;
