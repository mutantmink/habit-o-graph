
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/dateUtils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface ActivityCellProps {
  date: Date;
  level: number; // 0-4 (none, light, medium, high, very high)
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  habitDetails?: {
    habitName: string;
    level: number;
  }[];
}

const ActivityCell: React.FC<ActivityCellProps> = ({ 
  date, 
  level, 
  size = 'md',
  className,
  habitDetails = []
}) => {
  const cellSizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };
  
  // Updated color palette for a more vibrant, punchy look
  const cellLevelClasses = {
    0: 'bg-gray-100 hover:bg-gray-200',
    1: 'bg-purple-200 hover:bg-purple-300',
    2: 'bg-purple-300 hover:bg-purple-400',
    3: 'bg-purple-500 hover:bg-purple-600',
    4: 'bg-purple-700 hover:bg-purple-800',
  };

  const activityLevels = {
    0: 'No activity',
    1: 'Light activity',
    2: 'Moderate activity',
    3: 'High activity',
    4: 'Very high activity',
  };
  
  // Use hover card for more detailed information
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            'rounded-md shadow-sm transition-all duration-300 ease-in-out',
            cellSizeClasses[size],
            cellLevelClasses[level as keyof typeof cellLevelClasses],
            'hover:scale-150 hover:z-10',
            className
          )}
        />
      </HoverCardTrigger>
      <HoverCardContent 
        side="top" 
        className="p-0 w-56 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-purple-100"
      >
        <div className="p-3">
          <div className="mb-2">
            <p className="text-gray-800 font-semibold">{formatDate(date)}</p>
            <p className="text-gray-500 text-xs">{activityLevels[level as keyof typeof activityLevels]}</p>
          </div>
          
          {habitDetails.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-1.5">Completed habits:</p>
              <ul className="space-y-1">
                {habitDetails.map((habit, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-xs">
                    <span className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      habit.level === 1 ? 'bg-purple-300' :
                      habit.level === 2 ? 'bg-purple-400' :
                      habit.level === 3 ? 'bg-purple-500' : 'bg-purple-700'
                    )}></span>
                    <span className="text-gray-700">{habit.habitName}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ActivityCell;
