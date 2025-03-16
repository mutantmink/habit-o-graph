
import React, { useMemo, useState } from 'react';
import { 
  getContributionDays, 
  getMonthLabels, 
  formatDateKey,
  getDaysInYear
} from '@/utils/dateUtils';
import { getActivityData, HabitData } from '@/utils/habitUtils';
import ActivityCell from './ActivityCell';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from 'lucide-react';

interface ContributionGraphProps {
  habitData: HabitData;
  className?: string;
  days?: number;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ 
  habitData, 
  className
}) => {
  // Current year and available years for selection
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: 3 }, 
    (_, i) => currentYear - i
  );
  
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  // Get days for the selected year
  const contributionDays = useMemo(() => 
    getDaysInYear(selectedYear), 
    [selectedYear]
  );
  
  // Get month labels
  const monthLabels = useMemo(() => 
    getMonthLabels(contributionDays), 
    [contributionDays]
  );
  
  // Calculate activity data
  const activityData = useMemo(() => 
    getActivityData(habitData, contributionDays), 
    [habitData, contributionDays]
  );
  
  // Group days by month for a more elegant grid layout
  const weeks = useMemo(() => {
    const totalWeeks = Math.ceil(contributionDays.length / 7);
    const result: Date[][] = [];
    
    for (let i = 0; i < totalWeeks; i++) {
      const week: Date[] = [];
      for (let j = 0; j < 7; j++) {
        const dayIndex = i * 7 + j;
        if (dayIndex < contributionDays.length) {
          week.push(contributionDays[dayIndex]);
        } else {
          week.push(new Date(0)); // placeholder
        }
      }
      result.push(week);
    }
    
    return result;
  }, [contributionDays]);
  
  // Prepare detailed habit information for each day
  const habitDetailsByDate = useMemo(() => {
    const result: {[key: string]: {habitName: string, level: number}[]} = {};
    
    Object.entries(habitData).forEach(([habitId, dates]) => {
      Object.entries(dates).forEach(([dateKey, level]) => {
        if (level > 0) {
          if (!result[dateKey]) {
            result[dateKey] = [];
          }
          
          // Find the habit name from the habitId
          const habitName = `Habit ${habitId}`; // This should be replaced with actual habit names
          
          result[dateKey].push({
            habitName,
            level
          });
        }
      });
    });
    
    return result;
  }, [habitData]);
  
  return (
    <div className={`fade-in ${className}`}>
      {/* Year selector */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-baseline gap-4">
          <h3 className="text-sm font-medium text-gray-500">Year</h3>
          <Select 
            value={selectedYear.toString()} 
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-[100px] h-8 text-sm bg-white/70 border-purple-100">
              <SelectValue placeholder={selectedYear.toString()} />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Month labels */}
      <div className="flex ml-1 mb-1.5">
        {monthLabels.map((label, i) => (
          <div 
            key={`month-${label.month}-${i}`}
            className="text-xs text-gray-500 font-medium"
            style={{ 
              position: 'relative', 
              left: `${label.index * 15}px`
            }}
          >
            {label.month}
          </div>
        ))}
      </div>
      
      {/* Contribution grid */}
      <div className="flex flex-wrap gap-1.5">
        {weeks.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="flex flex-col gap-1.5">
            {week.map((day, dayIndex) => {
              // Skip rendering for placeholder dates
              if (day.getTime() === 0) {
                return <div key={`empty-${weekIndex}-${dayIndex}`} className="w-3.5 h-3.5" />;
              }
              
              const dateKey = formatDateKey(day);
              const level = activityData[dateKey] || 0;
              const habitDetails = habitDetailsByDate[dateKey] || [];
              
              return (
                <ActivityCell
                  key={dateKey}
                  date={day}
                  level={level}
                  habitDetails={habitDetails}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex items-center justify-end">
        <span className="text-xs text-gray-500 mr-2 font-medium">Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <ActivityCell 
            key={`legend-${level}`} 
            date={new Date()} 
            level={level}
            className="mr-1.5"
          />
        ))}
        <span className="text-xs text-gray-500 ml-1 font-medium">More</span>
      </div>
    </div>
  );
};

export default ContributionGraph;
