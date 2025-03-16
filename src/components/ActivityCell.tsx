
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/dateUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ActivityCellProps {
  date: Date;
  level: number; // 0-4 (none, light, medium, high, very high)
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ActivityCell: React.FC<ActivityCellProps> = ({ 
  date, 
  level, 
  size = 'md',
  className 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cellSizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };
  
  const cellLevelClasses = {
    0: 'bg-habit-empty hover:bg-habit-empty/80',
    1: 'bg-habit-level1 hover:bg-habit-level1/90',
    2: 'bg-habit-level2 hover:bg-habit-level2/90',
    3: 'bg-habit-level3 hover:bg-habit-level3/90',
    4: 'bg-habit-level4 hover:bg-habit-level4/90',
  };

  const activityLevels = {
    0: 'No activity',
    1: 'Light activity',
    2: 'Moderate activity',
    3: 'High activity',
    4: 'Very high activity',
  };
  
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'rounded-sm contribution-cell',
              cellSizeClasses[size],
              cellLevelClasses[level as keyof typeof cellLevelClasses],
              className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-white/90 backdrop-blur-sm text-xs py-1.5 px-2.5 rounded-md shadow-md border border-gray-100 font-medium"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-800">{formatDate(date)}</span>
            <span className="text-gray-500 text-[10px]">{activityLevels[level as keyof typeof activityLevels]}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActivityCell;
