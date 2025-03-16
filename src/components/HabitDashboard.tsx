
import React, { useState, useEffect } from 'react';
import { defaultHabits, Habit, HabitData, generateSampleData } from '@/utils/habitUtils';
import { formatDateKey, getTodayKey, getDateRangeString, getContributionDays } from '@/utils/dateUtils';
import ContributionGraph from './ContributionGraph';
import HabitList from './HabitList';
import HabitForm from './HabitForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Habit Dashboard</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Track your daily habits with a simple, visual interface. Build consistency and see your progress over time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Habit tracking section */}
        <div className="lg:col-span-1 order-2 lg:order-1 grid gap-6">
          {/* Add habit form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <HabitForm onAddHabit={handleAddHabit} />
          </div>
          
          {/* Today's habits */}
          <Card className="overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
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
        <Card className="lg:col-span-2 order-1 lg:order-2 animate-slide-up">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              {dateRangeString} · {totalContributions} contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionGraph 
              habitData={habitData} 
              days={isMobile ? 180 : 365}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HabitDashboard;
