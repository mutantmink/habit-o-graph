
import React from 'react';
import { Check, X, Flame } from 'lucide-react';
import { Habit, HabitData, calculateStreak } from '@/utils/habitUtils';
import { formatDateKey, getTodayKey } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface HabitListProps {
  habits: Habit[];
  habitData: HabitData;
  onToggleHabit: (habitId: string, level: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ 
  habits, 
  habitData, 
  onToggleHabit 
}) => {
  const todayKey = getTodayKey();
  
  const getHabitStatus = (habitId: string): number => {
    if (!habitData[habitId]) return 0;
    return habitData[habitId][todayKey] || 0;
  };
  
  const handleToggleHabit = (habitId: string) => {
    const currentStatus = getHabitStatus(habitId);
    const newStatus = currentStatus === 0 ? 2 : 0; // Toggle between 0 and 2
    onToggleHabit(habitId, newStatus);
    
    if (newStatus > 0) {
      toast.success(`Marked "${habits.find(h => h.id === habitId)?.name}" as complete`);
    }
  };
  
  // Calculate streak for each habit
  const getHabitStreak = (habitId: string): number => {
    if (!habitData[habitId]) return 0;
    return calculateStreak(habitData[habitId], habitId);
  };
  
  return (
    <div className="space-y-3 py-2 animate-fade-in">
      <h2 className="text-lg font-medium text-gray-800 mb-3">Today's Habits</h2>
      
      {habits.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50/50 rounded-lg border border-gray-100">
          No habits added yet. Add your first habit above!
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => {
            const isCompleted = getHabitStatus(habit.id) > 0;
            const streak = getHabitStreak(habit.id);
            
            return (
              <div 
                key={habit.id}
                className={cn(
                  "p-4 rounded-xl border border-gray-100 bg-white flex items-center justify-between group habit-item",
                  isCompleted && "bg-green-50/50 border-green-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={() => handleToggleHabit(habit.id)}
                    variant={isCompleted ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "h-8 w-8 transition-all duration-300",
                      isCompleted ? "bg-green-500 hover:bg-green-600" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </Button>
                  
                  <div>
                    <h3 className={cn(
                      "font-medium text-gray-800 transition-all duration-300",
                      isCompleted && "line-through opacity-70"
                    )}>
                      {habit.name}
                    </h3>
                    {habit.description && (
                      <p className={cn(
                        "text-sm text-gray-500 transition-all duration-300",
                        isCompleted && "line-through opacity-70"
                      )}>
                        {habit.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {streak > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-md text-amber-600 text-xs font-medium">
                    <Flame className="h-3 w-3" />
                    <span>{streak} day{streak !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HabitList;
