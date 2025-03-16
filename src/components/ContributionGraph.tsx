
import React, { useMemo } from 'react';
import { getContributionDays, getMonthLabels, getDayLabels, formatDateKey } from '@/utils/dateUtils';
import { getActivityData, HabitData } from '@/utils/habitUtils';
import ActivityCell from './ActivityCell';

interface ContributionGraphProps {
  habitData: HabitData;
  className?: string;
  days?: number;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ 
  habitData, 
  className, 
  days = 365 
}) => {
  // Get days for the graph
  const contributionDays = useMemo(() => getContributionDays(days), [days]);
  
  // Get month labels
  const monthLabels = useMemo(() => getMonthLabels(contributionDays), [contributionDays]);
  
  // Get day labels (Mon, Tue, etc.)
  const dayLabels = useMemo(() => getDayLabels(), []);
  
  // Calculate activity data
  const activityData = useMemo(() => 
    getActivityData(habitData, contributionDays), 
    [habitData, contributionDays]
  );
  
  // Group days by week for the grid layout
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    let week: Date[] = [];
    
    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDay = contributionDays[0].getDay();
    
    // Fill in empty cells for the first week
    for (let i = 0; i < firstDay; i++) {
      week.push(new Date(0)); // placeholder for empty cells
    }
    
    // Add all days
    contributionDays.forEach(day => {
      week.push(day);
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
    });
    
    // Add the last week if it's not full
    if (week.length > 0) {
      result.push(week);
    }
    
    return result;
  }, [contributionDays]);
  
  return (
    <div className={`fade-in ${className}`}>
      {/* Month labels */}
      <div className="flex ml-7 mb-1">
        {monthLabels.map((label, i) => (
          <div 
            key={`month-${label.month}-${i}`}
            className="text-xs text-gray-600 font-medium"
            style={{ 
              position: 'relative', 
              left: `${label.index * 15}px`
            }}
          >
            {label.month}
          </div>
        ))}
      </div>
      
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col mr-3 mt-2">
          {dayLabels.map((day, i) => (
            <div 
              key={`day-${day}`} 
              className="text-xs text-gray-500 font-medium h-3.5 flex items-center justify-end"
              style={{ marginBottom: i < 6 ? '10px' : 0 }}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Contribution grid */}
        <div className="flex flex-wrap gap-[2px] sm:gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="flex flex-col gap-[2px] sm:gap-[3px]">
              {week.map((day, dayIndex) => {
                // Skip rendering for placeholder dates
                if (day.getTime() === 0) {
                  return <div key={`empty-${weekIndex}-${dayIndex}`} className="w-3.5 h-3.5" />;
                }
                
                const dateKey = formatDateKey(day);
                const level = activityData[dateKey] || 0;
                
                return (
                  <ActivityCell
                    key={dateKey}
                    date={day}
                    level={level}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-end">
        <span className="text-xs text-gray-500 mr-2 font-medium">Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <ActivityCell 
            key={`legend-${level}`} 
            date={new Date()} 
            level={level}
            className="mr-1"
          />
        ))}
        <span className="text-xs text-gray-500 ml-1 font-medium">More</span>
      </div>
    </div>
  );
};

export default ContributionGraph;
