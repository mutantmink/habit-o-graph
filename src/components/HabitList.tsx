
import React from 'react';
import { Check, X, Flame, Zap } from 'lucide-react';
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
    <div className="space-y-4 py-2 fade-in">
      {habits.length === 0 ? (
        <div className="text-center py-10 px-6 text-gray-500 bg-gray-50/70 rounded-xl border border-gray-100 backdrop-blur-sm">
          <Zap className="h-10 w-10 mx-auto mb-3 text-blue-400 opacity-80" />
          <p className="text-gray-600 font-medium mb-1">No habits added yet</p>
          <p className="text-gray-500 text-sm">Add your first habit to get started!</p>
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
                  "p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group habit-item shadow-sm",
                  isCompleted 
                    ? "bg-green-50/70 border-green-100/80 backdrop-blur-sm" 
                    : "bg-white/80 border-white/40 backdrop-blur-sm hover:bg-white/90"
                )}
              >
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={() => handleToggleHabit(habit.id)}
                    variant={isCompleted ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-xl transition-all duration-300 shadow-sm",
                      isCompleted 
                        ? "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-none" 
                        : "text-blue-500 hover:text-blue-600 border-gray-200 hover:border-blue-200 bg-white hover:bg-blue-50/50"
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
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/80 backdrop-blur-sm border border-amber-100/60 rounded-full text-amber-700 text-xs font-medium shadow-sm">
                    <Flame className="h-3.5 w-3.5 text-amber-500" />
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
