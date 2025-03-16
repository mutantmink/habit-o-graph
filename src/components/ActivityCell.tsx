
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
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };
  
  const cellLevelClasses = {
    0: 'bg-gray-100 hover:bg-gray-200',
    1: 'bg-green-200 hover:bg-green-300',
    2: 'bg-green-300 hover:bg-green-400',
    3: 'bg-green-500 hover:bg-green-600',
    4: 'bg-green-700 hover:bg-green-800',
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
              'rounded-sm contribution-cell shadow-sm',
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
          className="bg-white/90 backdrop-blur-md text-xs py-2 px-3 rounded-lg shadow-md border border-white/40 font-medium"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-800 font-semibold">{formatDate(date)}</span>
            <span className="text-gray-500 text-[10px]">{activityLevels[level as keyof typeof activityLevels]}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActivityCell;
